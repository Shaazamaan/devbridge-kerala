function doGet(e) {
  // 1. If the Portal Dashboard requests data, check auth and return live analytics
  if (e.parameter.fetchAnalytics === 'true') {
    return handleAnalytics(e);
  }
  // 2. Otherwise, treat it as a regular tracking click
  return handleRequest(e);
}

function doPost(e) {
  // 3. Intake Form Submissions (JSON format from intake.html)
  try {
    const postData = JSON.parse(e.postData.contents);
    if (postData.businessName) {
      return handleIntake(postData);
    }
  } catch(err) {
    // If it's not JSON, fallback to standard request logging
    return handleRequest(e);
  }
}

// ---- 1. EXISTING LOGGING SYSTEM ----
function handleRequest(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheets()[0]; 
  var clientName = e.parameter.client || 'Unknown Client';
  var action = e.parameter.action || 'Unknown Action';
  var timestamp = new Date();
  
  sheet.appendRow([timestamp, clientName, action]);
  
  return ContentService.createTextOutput(JSON.stringify({"status": "logged"})).setMimeType(ContentService.MimeType.JSON);
}

// ---- 2. AUTOMATED CLIENT INTAKE REGISTRATION ----
function handleIntake(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let clientsSheet = ss.getSheetByName("Clients");
  
  // Auto-create Clients tab if it doesnt exist
  if (!clientsSheet) {
    clientsSheet = ss.insertSheet("Clients");
    clientsSheet.appendRow(["Client ID", "Passkey", "Is Paid (TRUE/FALSE)", "Account Created"]);
    clientsSheet.appendRow(["DVK_MASTER", "ceo", true, new Date().toISOString()]);
  }
  
  // Clean the business name to create a Client ID (Removing spaces/special chars)
  const clientId = data.businessName.toString().toUpperCase().replace(/[^A-Z0-9]/g, "_").slice(0, 15);
  // Generate a random 4-digit Passkey
  const passkey = Math.floor(1000 + Math.random() * 9000).toString();
  
  // Check if client already exists (to avoid duplicates)
  const existingIds = clientsSheet.getRange("A:A").getValues().flat();
  if (existingIds.includes(clientId)) {
    return ContentService.createTextOutput(JSON.stringify({
      success: true, 
      status: "re-registered", 
      clientId: clientId, 
      error: "Client ID already exists. Credentials preserved." 
    })).setMimeType(ContentService.MimeType.JSON);
  }

  // Register the new client row
  clientsSheet.appendRow([clientId, passkey, false, new Date().toISOString()]);

  // Log the "Start Gate" intake event to Sheet1 too
  ss.getSheets()[0].appendRow([new Date(), clientId, "Intake Submitted (Start Gate)"]);

  return ContentService.createTextOutput(JSON.stringify({
    success: true,
    clientId: clientId,
    passkey: passkey,
    status: "registered"
  })).setMimeType(ContentService.MimeType.JSON);
}

// ---- 3. ENTERPRISE DASHBOARD ANALYTICS API ----
function handleAnalytics(e) {
  try {
    const targetClient = e.parameter.clientId;
    const targetPass = e.parameter.clientPass;
    
    if (!targetClient || !targetPass) {
        throw new Error("Missing credentials");
    }

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let clientsSheet = ss.getSheetByName("Clients");
    
    if (!clientsSheet) {
        // Init if missing
        clientsSheet = ss.insertSheet("Clients");
        clientsSheet.appendRow(["Client ID", "Passkey", "Is Paid (TRUE/FALSE)", "Account Created"]);
        clientsSheet.appendRow(["DVK_MASTER", "ceo", true, new Date().toISOString()]);
        return ContentService.createTextOutput(JSON.stringify({success: false, error: "Database Initializing..."})).setMimeType(ContentService.MimeType.JSON);
    }
    
    const clientData = clientsSheet.getDataRange().getValues();
    let authSuccess = false;
    let is_paid = false;
    let created_at = null;
    let clientNameRaw = "Unknown Client";

    for (let c = 1; c < clientData.length; c++) {
        if (clientData[c][0].toString().trim() === targetClient.trim() && 
            clientData[c][1].toString().trim() === targetPass.trim()) {
            
            authSuccess = true;
            is_paid = clientData[c][2] === true || clientData[c][2].toString().toLowerCase() === "true";
            created_at = clientData[c][3] || new Date().toISOString();
            clientNameRaw = clientData[c][0];
            break;
        }
    }

    if (!authSuccess) {
        return ContentService.createTextOutput(JSON.stringify({success: false, error: "Invalid Credentials."})).setMimeType(ContentService.MimeType.JSON);
    }

    const trackingSheet = ss.getSheets()[0]; 
    const data = trackingSheet.getDataRange().getValues();
    
    let visitors = 0; let wa_clicks = 0; let calls = 0;
    let recent_activity = [];

    for (let i = 1; i < data.length; i++) {
        if (data[i][1] === targetClient) {
            const evType = (data[i][2] || "").toString().toLowerCase();
            const timeRaw = data[i][0];

            if (evType.includes("visit") || evType.includes("view")) visitors++;
            if (evType.includes("what") || evType.includes("wa")) wa_clicks++;
            if (evType.includes("call") || evType.includes("phone")) calls++;

            recent_activity.push({
                timeRaw: timeRaw,
                msg: evType.includes("visit") ? "Organic site visit recorded." : 
                     (evType.includes("what") ? "High Intent: WhatsApp Triggered." : "System Action logged."),
                col: evType.includes("what") ? "text-emerald-400" : "text-blue-400"
            });
        }
    }

    recent_activity.sort((a, b) => new Date(b.timeRaw) - new Date(a.timeRaw));
    const final_activity = recent_activity.slice(0, 4).map(act => {
        const diffMs = new Date() - new Date(act.timeRaw);
        const mins = Math.floor(diffMs / 60000); const hrs = Math.floor(mins / 60);
        let timeLabel = "Just now";
        if (mins > 0 && mins < 60) timeLabel = mins + " mins ago";
        else if (hrs >= 1 && hrs < 24) timeLabel = hrs + " hrs ago";
        else if (hrs >= 24) timeLabel = Math.floor(hrs/24) + " days ago";
        return { time: timeLabel, msg: act.msg, col: act.col };
    });

    const payload = {
        success: true,
        is_paid: is_paid,
        created_at: created_at,
        name: clientNameRaw,
        data: {
             visitors: visitors, wa_clicks: wa_clicks, calls: calls,
             conv_rate: visitors > 0 ? ((wa_clicks + calls) / visitors * 100).toFixed(1) : "0.0",
             chart_labels: ['Wk 1', 'Wk 2', 'Wk 3', 'Wk 4', 'Wk 5', 'Wk 6', 'Wk 7', 'Wk 8'],
             chart_visits: [ Math.floor(visitors*0.1), Math.floor(visitors*0.25), Math.floor(visitors*0.6), visitors ],
             chart_intent: [ 0, Math.floor(wa_clicks*0.2), Math.floor(wa_clicks*0.7), wa_clicks ],
             devices: [60, 40, 0],
             activity: final_activity.length > 0 ? final_activity : [{time: 'System', msg: 'Awaiting first lead trigger...', col: 'text-slate-500'}]
        }
    };
    return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({success: false, error: error.toString()})).setMimeType(ContentService.MimeType.JSON);
  }
}
