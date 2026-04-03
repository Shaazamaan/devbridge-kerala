/**
 * ╔══════════════════════════════════════════════════╗
 * ║    DEVBRIDGE KERALA | MASTER ENGINE v3.0        ║
 * ║    Interaction, Gate, & Conversion Logic         ║
 * ╚══════════════════════════════════════════════════╝
 */

document.addEventListener('DOMContentLoaded', () => {
    initScenarioGate();
    initScrollAnimations();
    initWhatsAppContext();
});

/**
 * Mandatory Scenario Gate §v3.0
 * Prevents access to demo content until disclaimer is accepted.
 */
function initScenarioGate() {
    const gateHTML = `
        <div id="scenario-gate">
            <div class="gate-box">
                <span class="badge" style="color:#fbbf24; border-color:#fbbf24; background:transparent;">Elite Performance Demo</span>
                <h2>Scenario: <span id="gate-business-type">Professional Demo</span></h2>
                <p>This is a <strong>High-Conversion Demo Experience</strong> created by DevBridge Kerala. This is NOT a live client project. Your actual site will be custom-built for your niche. Experience the ₹1,00,000+ perceived-value architecture for ₹1,000.</p>
                <button class="btn btn-primary" style="background:#fbbf24; color:#000;" onclick="unlockDemo()">Continue to Demo Experience &rarr;</button>
            </div>
        </div>
    `;

    // Inject if not manually present
    if (!document.getElementById('scenario-gate')) {
        document.body.insertAdjacentHTML('afterbegin', gateHTML);
    }

    // Lock Scroll
    document.body.style.overflow = 'hidden';

    // Update business type in gate if meta found
    const bizType = document.querySelector('meta[name="business-type"]')?.content || "Pro Demo";
    const gateTitle = document.getElementById('gate-business-type');
    if (gateTitle) gateTitle.innerText = bizType;
}

window.unlockDemo = () => {
    const gate = document.getElementById('scenario-gate');
    if (gate) {
        gate.style.opacity = '0';
        setTimeout(() => {
            gate.style.display = 'none';
            document.body.style.overflow = 'auto';
            document.dispatchEvent(new CustomEvent('demoUnlocked'));
        }, 800);
    }
}

/**
 * Scroll Animations §v3.0 (Palakkadan 3X)
 * High-performance Intersection Observer for elite transitions.
 */
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('[data-aos]').forEach(el => observer.observe(el));
}

/**
 * WhatsApp Context Hydration §v3.0
 * Auto-injects business type into WhatsApp CTAs.
 */
function initWhatsAppContext() {
    const bizType = document.querySelector('meta[name="business-type"]')?.content || "Portfolio";
    const waLinks = document.querySelectorAll('a[href*="wa.me"]');
    
    waLinks.forEach(link => {
        if (!link.href.includes('text=')) {
            link.href += `?text=Hi, I saw the ${bizType} demo. I want a similar high-converting site for ₹1000.`;
        }
    });
}
