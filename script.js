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
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });
document.querySelectorAll('.scroll-trigger').forEach(el => observer.observe(el));

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
            `**[CANDIDATE V2]**\n**Name:** ${fd.get('name')}\n**Email:** ${fd.get('email')}\n**Phone:** ${fd.get('phone')}\n**Role:** ${fd.get('role')}\n**Proof of Work:** ${fd.get('project_explanation')}` :
            `**[COMPANY V2]**\n**Company:** ${fd.get('company_name')}\n**Email:** ${fd.get('contact_email')}\n**Phone:** ${fd.get('phone')}\n**Req:** ${fd.get('requirements')}`;

        await Promise.allSettled([
            fetch(DISCORD_WEBHOOK, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ content: dPayload }) }),
            fetch("/", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams(fd).toString() }),
            logDvkEvent(type === 'candidate' ? "Candidate Profile Submitted" : "Company Hiring Request Received")
        ]);

        window.location.href = type === 'candidate' ? '/thank-you.html?type=candidate' : '/thank-you.html?type=company';

    } catch(err) {
        alert("Submission failed. Re-try or email directly.");
    } finally {
        btn.innerText = 'Submit';
        btn.disabled = false;
    }
}

document.forms['candidate']?.addEventListener('submit', e => handleFormSubmit(e, 'candidate'));
document.forms['company']?.addEventListener('submit', e => handleFormSubmit(e, 'company'));


