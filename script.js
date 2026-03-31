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

    btn.innerText = 'Sending...';
    btn.disabled = true;

    try {
        if (fd.get('bot-field')) throw new Error("Spam detected");

        let dPayload;
        if (type === 'help-request') {
            const helpType = fd.get('help_type') || 'Not specified';
            dPayload = `📩 **New Help Request**\n**Name:** ${fd.get('name')}\n**Contact:** ${fd.get('contact')}\n**Type:** ${helpType}\n**Situation:**\n${fd.get('situation')}`;
        } else if (type === 'candidate') {
            dPayload = `🧑‍💻 **Candidate Application**\n**Name:** ${fd.get('name')}\n**Email:** ${fd.get('email')}\n**Links:** ${fd.get('links')}\n**Situation:** ${fd.get('pow')}`;
        } else {
            dPayload = `🏢 **Company Request**\n**Company:** ${fd.get('company')}\n**Email:** ${fd.get('email')}\n**Role/Req:** ${fd.get('role')}`;
        }

        await Promise.allSettled([
            fetch(DISCORD_WEBHOOK, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ content: dPayload }) }),
            fetch("/", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams(fd).toString() }),
            logDvkEvent(`Form Submitted: ${type}`)
        ]);

        window.location.href = '/thank-you.html';

    } catch(err) {
        alert("Submission failed. Please try again or message me on WhatsApp.");
        btn.innerText = 'Send — I\'ll Read It Personally';
        btn.disabled = false;
    }
}

// 4. Scroll Depth Tracking
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

// 5. Form Listeners
document.forms['help-request']?.addEventListener('submit', e => handleFormSubmit(e, 'help-request'));
document.forms['candidate']?.addEventListener('submit', e => handleFormSubmit(e, 'candidate'));
document.forms['company']?.addEventListener('submit', e => handleFormSubmit(e, 'company'));
