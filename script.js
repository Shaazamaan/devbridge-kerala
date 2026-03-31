const DISCORD_WEBHOOK = "https://discord.com/api/webhooks/1484208084271497449/aHvNsA_u710r0SgceFtH6u0sOmSRIF8nTbxzjk75ACbzl_y-_dqHdE18tLlVFLRSwGP9";
const GOOGLE_API_URL = "https://script.google.com/macros/s/AKfycbzRMsjt0SPmViIhNtR_6GVj81Es65zI71A7uwmUOmsUTxnQKQOktAWWLYY0MdbjxDYPvg/exec";

// 0. Live Analytics Tracking (DVK_MASTER HQ)
async function logDvkEvent(action) {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const device = isMobile ? "Mobile" : "Desktop";
    try {
        await fetch(`${GOOGLE_API_URL}?client=DVK_MASTER&action=${encodeURIComponent(action)}&device=${device}`, { mode: 'no-cors' });
    } catch(e) { console.warn("Analytics ping failed."); }
}
// Log initial visit
logDvkEvent("Site Visit");

// 1. Navbar Scroll & Mobile Menu
window.addEventListener('scroll', () => {
    document.querySelector('.navbar').classList.toggle('scrolled', window.scrollY > 20);
});

document.getElementById('mobile-toggle')?.addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('active');
});

// 2. Scroll Animation (Frontend SEO perception + UX)
const initObservers = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.scroll-trigger, .fade-in').forEach(el => observer.observe(el));
};
if (window.requestIdleCallback) {
    requestIdleCallback(initObservers);
} else {
    setTimeout(initObservers, 200);
}


// 3. Form Handling (Discord + Netlify)
async function handleFormSubmit(e, type) {
    e.preventDefault();
    const form = e.target;
    const btn = form.querySelector('button[type="submit"]');
    const fd = new FormData(form);

    btn.innerText = 'Processing...';
    btn.disabled = true;

    try {
        // Honeypot validation
        if (fd.get('bot-field')) throw new Error("Spam detected");

        // Map payload for N8N/Discord
        const dPayload = type === 'candidate' ? 
            `**[CANDIDATE V3 REDESIGN]**\n**Name:** ${fd.get('name')}\n**Email:** ${fd.get('email')}\n**Links:** ${fd.get('links')}\n**Proof of Work:** ${fd.get('pow')}` :
            `**[COMPANY V3 REDESIGN]**\n**Company:** ${fd.get('company')}\n**Email:** ${fd.get('email')}\n**Role/Req:** ${fd.get('role')}`;

        await Promise.allSettled([
            fetch(DISCORD_WEBHOOK, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ content: dPayload }) }),
            fetch("/", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams(fd).toString() }),
            logDvkEvent(type === 'candidate' ? "Candidate Profile Submitted" : "Company Hiring Request Received")
        ]);

        window.location.href = type === 'candidate' ? '/thank-you.html?type=candidate' : '/thank-you.html?type=company';

    } catch(err) {
        alert("Submission failed. Re-try or email directly.");
        btn.innerText = 'Submit';
        btn.disabled = false;
    }
}

// 4. Scroll Depth Tracking (High-Signal Conversion)

const trackedDepths = new Set();
window.addEventListener('scroll', () => {
    const scrollPercent = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight;
    [0.25, 0.5, 0.75, 1.0].forEach(depth => {
        if (scrollPercent >= depth && !trackedDepths.has(depth)) {
            trackedDepths.add(depth);
            logDvkEvent(`Scroll Depth: ${depth * 100}%`);
        }
    });
}, { passive: true });
// 5. Grit Terminal Logic (Cycle 7)
const terminalBody = document.getElementById('terminal-body');
const hiddenInput = document.getElementById('terminal-hidden-input');
const inputDisplay = document.getElementById('terminal-input-display');

if (terminalBody && hiddenInput) {
    terminalBody.addEventListener('click', () => hiddenInput.focus());
    
    hiddenInput.addEventListener('input', (e) => {
        inputDisplay.textContent = e.target.value;
    });

    hiddenInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const cmd = hiddenInput.value.trim().toLowerCase();
            processCommand(cmd);
            hiddenInput.value = '';
            inputDisplay.textContent = '';
        }
    });
}

function processCommand(cmd) {
    appendLine(`<span class="prompt">guest@dvk:~#</span> ${cmd}`);
    
    if (cmd === 'help') {
        appendLine('Available commands: <span class="terminal-highlight">help</span>, <span class="terminal-highlight">verify</span>, <span class="terminal-highlight">ls</span>, <span class="terminal-highlight">clear</span>');
    } else if (cmd === 'ls') {
        appendLine('Active Modules: <br> - grit_engine_v2 <br> - bridge_mena_v1 <br> - aeo_snapshot_mgr');
    } else if (cmd.startsWith('verify')) {
        appendLine('[SYSTEM] Initiating Deep-Dive Vetting...');
        setTimeout(() => {
            appendLine('<span class="terminal-success">[SUCCESS] </span> Talent Verified. Resilience Index: 98%.');
            appendLine('<span class="terminal-highlight">[ACTION] </span> High-Grit match detected. Standardizing application...');
            logDvkEvent('Terminal Successful Verification');
            setTimeout(() => {
                document.querySelector('#apply')?.scrollIntoView({ behavior: 'smooth' });
                document.querySelector('#apply .container')?.classList.add('glow-highlight');
            }, 1500);
        }, 1000);
    } else if (cmd === 'clear') {
        terminalBody.innerHTML = '';
    } else if (cmd) {
        appendLine(`<span class="terminal-error">Command not found: ${cmd}</span>`);
    }
}

function appendLine(html) {
    const div = document.createElement('div');
    div.className = 'terminal-line';
    div.innerHTML = html;
    terminalBody.insertBefore(div, terminalBody.lastElementChild);
    terminalBody.scrollTop = terminalBody.scrollHeight;
}

document.forms['candidate']?.addEventListener('submit', e => handleFormSubmit(e, 'candidate'));
document.forms['company']?.addEventListener('submit', e => handleFormSubmit(e, 'company'));


