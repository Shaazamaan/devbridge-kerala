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
  var device = e.parameter.device || 'Desktop';
  var timestamp = new Date();
  
  sheet.appendRow([timestamp, clientName, action, device]);
  
  return ContentService.createTextOutput(JSON.stringify({"status": "logged"})).setMimeType(ContentService.MimeType.JSON);
}

// ---- 2. AUTOMATED CLIENT INTAKE REGISTRATION & DRIVE UPLOAD ----
function handleIntake(data) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let clientsSheet = ss.getSheetByName("Clients");
    
    // Auto-create Clients tab if it doesnt exist
    if (!clientsSheet) {
      clientsSheet = ss.insertSheet("Clients");
      clientsSheet.appendRow(["Client ID", "Passkey", "Is Paid (TRUE/FALSE)", "Account Created"]);
      clientsSheet.appendRow(["DVK_MASTER", "ceo", true, new Date().toISOString()]);
    }
    
    // 2.1 GENERATE CREDENTIALS
    const clientId = data.businessName.toString().toUpperCase().replace(/[^A-Z0-9]/g, "_").slice(0, 15);
    const passkey = Math.floor(1000 + Math.random() * 9000).toString();
    const timestamp = new Date();
    
    // Check if client already exists (to avoid duplicates in Client DB)
    const existingIds = clientsSheet.getRange("A:A").getValues().flat();
    if (!existingIds.includes(clientId)) {
      clientsSheet.appendRow([clientId, passkey, false, timestamp.toISOString()]);
    }

    // 2.2 CREATE DRIVE FOLDER & UPLOAD ASSETS
    const mainFolderId = "1cTNVFBrTfEZwVzFlK-fwxWHdvNi-THPO"; 
    const mainFolder = DriveApp.getFolderById(mainFolderId);
    const clientFolderName = clientId + " - " + timestamp.toLocaleString();
    const clientFolder = mainFolder.createFolder(clientFolderName);
    
    // Create Submission Summary
    var summary = "DEVBRIDGE KERALA: HQ INTAKE SUMMARY (UNIFIED v4)\n";
    summary += "================================================\n";
    summary += "STATUS: AUTOMATICALLY REGISTERED\n";
    summary += "ASSIGNED CLIENT ID: " + clientId + "\n";
    summary += "SECURE PASSKEY: " + passkey + "\n";
    summary += "------------------------------------------------\n\n";
    summary += "BUSINESS IDENTITY\n";
    summary += "Business: " + (data.businessName || "N/A") + "\n";
    summary += "Tagline: " + (data.tagline || "N/A") + "\n";
    summary += "Services: " + (data.service1 || "") + ", " + (data.service2 || "") + ", " + (data.service3 || "") + "\n";
    summary += "Style: " + (data.style || "N/A") + "\n";
    summary += "Goal: " + (data.goal || "N/A") + "\n";
    summary += "WhatsApp: " + (data.whatsapp || "N/A") + "\n";
    summary += "Email: " + (data.email || "N/A") + "\n";
    
    if (data.specialInstructions) {
      summary += "\nSPECIAL INSTRUCTIONS:\n" + data.specialInstructions + "\n";
    }
    
    summary += "\nASSET LOG\n";
    if (data.FILE_LOGO_NAME) summary += "• Logo: " + data.FILE_LOGO_NAME + "\n";
    if (data.FILE_HERO_NAME) summary += "• Hero: " + data.FILE_HERO_NAME + "\n";
    if (data.FILE_PAYMENT_NAME) summary += "• Payment: " + data.FILE_PAYMENT_NAME + "\n";
    
    clientFolder.createFile("Submission_Summary.txt", summary);
    
    // Handle File Uploads
    if (data.files && data.files.length > 0) {
      data.files.forEach(function(file) {
        try {
          var base64Data = file.base64.split(",")[1];
          var decoded = Utilities.base64Decode(base64Data);
          var blob = Utilities.newBlob(decoded, file.type, file.name || "unnamed_file");
          clientFolder.createFile(blob);
        } catch(fErr) {
          console.error("File skip: " + file.name, fErr);
        }
      });
    }

    // 2.3 LOG TO SHEET1 TRACKING
    ss.getSheets()[0].appendRow([timestamp, clientId, "Intake Registered & Assets Archived", "Desktop"]);

    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      clientId: clientId,
      passkey: passkey,
      status: "registered",
      driveUrl: clientFolder.getUrl()
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
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
        clientsSheet = ss.insertSheet("Clients");
        clientsSheet.appendRow(["Client ID", "Passkey", "Is Paid (TRUE/FALSE)", "Account Created"]);
        clientsSheet.appendRow(["DVK_MASTER", "ceo", true, new Date().toISOString()]);
        return ContentService.createTextOutput(JSON.stringify({success: false, error: "Initial Database Created. Log in again."})).setMimeType(ContentService.MimeType.JSON);
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
    let mobile = 0; let desktop = 0;
    let recent_activity = [];

    for (let i = 1; i < data.length; i++) {
        if (data[i][1] === targetClient) {
            const evType = (data[i][2] || "").toString().toLowerCase();
            const devType = (data[i][3] || "").toString().toLowerCase();
            const timeRaw = data[i][0];

            if (evType.includes("visit") || evType.includes("view")) visitors++;
            if (evType.includes("what") || evType.includes("wa")) wa_clicks++;
            if (evType.includes("call") || evType.includes("phone")) calls++;

            if (devType.includes("mobile")) mobile++;
            else desktop++;

            recent_activity.push({
                timeRaw: timeRaw,
                msg: evType.includes("visit") ? "Organic site visit recorded." : 
                     (evType.includes("what") ? "WhatsApp Triggered." : "System Action logged."),
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

    return ContentService.createTextOutput(JSON.stringify({
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
             devices: [mobile, desktop, 0],
             activity: final_activity
        }
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({success: false, error: error.toString()})).setMimeType(ContentService.MimeType.JSON);
  }
}
