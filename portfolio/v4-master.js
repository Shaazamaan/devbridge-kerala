/* 
  ╔══════════════════════════════════════════════════╗
  ║    DEVBRIDGE KERALA | AUTONOMOUS ENGINE v4.0     ║
  ║    Standard      : BEHAVIORAL CONVERSION 101     ║
  ║    Architecture  : TACTICAL LIFE SIMULATION      ║
  ╚══════════════════════════════════════════════════╝
*/

const v4_ActivityDatabase = [
    { city: "Kochi", type: "Home Baker", action: "requested a quote" },
    { city: "Palakkad", type: "Local Shop", action: "exploring a similar demo" },
    { city: "Kozhikode", type: "Tuition Center", action: "inquired about packages" },
    { city: "Trivandrum", type: "Wedding Photographer", action: "viewing live right now" },
    { city: "Thrissur", type: "Small Business", action: "consulting for 24h delivery" },
    { city: "Kollam", type: "Supermarket", action: "setup a custom mart demo" },
    { city: "Malappuram", type: "Overseas Consultant", action: "viewing conversion stats" },
    { city: "Kannur", type: "Interior Designer", action: "requested portfolio vault" },
    { city: "Alappuzha", type: "Resort Owner", action: "checking booking logic" },
    { city: "Kottayam", type: "Architect", action: "inquired about v4.0 architecture" },
    { city: "Idukki", type: "Farm Stay", action: "viewing from Kerala" },
    { city: "Wayanad", type: "Cafe Owner", action: "exploring food scenarios" },
    { city: "Pathanamthitta", type: "Auditor", action: "requested a tax demo" },
    { city: "Kasargod", type: "Shop Owner", action: "setup a 24h launch" }
];

class AutonomousEngine {
    constructor() {
        this.initReveal();
        this.initActivitySimulator();
        this.initExitCapture();
        this.initWhatsAppHydration();
        this.initScrollProgress();
    }

    // Layer 5: Reveal Engine
    initReveal() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Stagger child elements
                    const children = entry.target.querySelectorAll('[data-stagger]');
                    children.forEach((child, index) => {
                        setTimeout(() => child.classList.add('visible'), index * 100);
                    });
                }
            });
        }, { threshold: 0.15 });

        document.querySelectorAll('[data-v4-reveal]').forEach(el => observer.observe(el));
    }

    // Layer 1: Activity Simulator (Tactical Social Proof)
    initActivitySimulator() {
        // First toast after 7 seconds
        setTimeout(() => this.showToast(), 7000);
        // Repeated every 25-45 seconds
        setInterval(() => this.showToast(), Math.random() * (45000 - 25000) + 25000);
    }

    showToast() {
        const activity = v4_ActivityDatabase[Math.floor(Math.random() * v4_ActivityDatabase.length)];
        const toast = document.createElement('div');
        toast.id = 'activity-toast';
        toast.className = 'visible'; // Ensure visibility via class
        toast.innerHTML = `
            <div class="activity-avatar">${activity.city[0]}</div>
            <div class="activity-info">
                <strong>Someone from ${activity.city}</strong><br>
                ${activity.action} for a ${activity.type}.
            </div>
        `;
        document.body.appendChild(toast);
        
        // Remove toast after 6 seconds
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(-200%)';
            setTimeout(() => toast.remove(), 1000);
        }, 6000);
    }

    // Layer 4: Exit Capture Engine
    initExitCapture() {
        let captureTriggered = false;

        // Bottom of page reveal
        window.addEventListener('scroll', () => {
            const scrollPercent = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight;
            if (scrollPercent > 0.95 && !captureTriggered) {
                this.triggerCapture();
                captureTriggered = true;
            }
        });

        // Mouse out of window (Top exit)
        document.addEventListener('mouseleave', (e) => {
            if (e.clientY < 0 && !captureTriggered) {
                this.triggerCapture();
                captureTriggered = true;
            }
        });
    }

    triggerCapture() {
        const modal = document.createElement('div');
        modal.id = 'exit-capture';
        modal.innerHTML = `
            <div class="exit-box" data-v4-reveal>
                <span class="badge-elite" style="color:var(--warning); border-color:var(--warning);">Decision Accelerator</span>
                <h2>Still Thinking?</h2>
                <p>Don't let your business stay invisible for another day. I can deliver your high-converting website within 24 hours. No advance needed—pay ONLY when satisfied.</p>
                <div style="display:flex; justify-content:center; gap:20px; flex-wrap:wrap;">
                    <a href="https://wa.me/918137826016" class="btn-v4" style="background:var(--success); color:white;">Build My Site Today</a>
                    <button class="btn-v4" id="close-exit" style="background:rgba(255,255,255,0.1); color:white;">I'll Browse More</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        modal.style.display = 'flex';
        modal.querySelector('#close-exit').onclick = () => modal.remove();
        setTimeout(() => modal.querySelector('.exit-box').classList.add('visible'), 10);
    }

    // Layer 8: WhatsApp Hydration (Scenario Specific)
    initWhatsAppHydration() {
        const businessMeta = document.querySelector('meta[name="business-type"]');
        const bType = businessMeta ? businessMeta.getAttribute('content') : 'Business';
        
        const isHub = bType === 'Portfolio Hub';
        
        const waLinks = document.querySelectorAll('a[href*="wa.me"]');
        waLinks.forEach(link => {
            const baseUrl = "https://wa.me/918137826016";
            let message = "";
            if(isHub) {
                message = encodeURIComponent(`Hi, I'm exploring the DevBridge Kerala Portfolio Hub. I want to build a high-converting website for ₹1000. Can we talk?`);
            } else {
                message = encodeURIComponent(`Hi, I saw the ${bType} website demo on DevBridge Kerala. I want something similar for my business. Can we talk?`);
            }
            link.href = `${baseUrl}?text=${message}`;
        });
    }

    initScrollProgress() {
        const bar = document.createElement('div');
        bar.style.cssText = "position:fixed; top:0; left:0; height:4px; background:var(--accent); z-index:2000000; transition:width 0.1s linear;";
        document.body.appendChild(bar);
        
        window.addEventListener('scroll', () => {
            const h = document.documentElement, 
                  b = document.body,
                  st = 'scrollTop',
                  sh = 'scrollHeight';
            const percent = (h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight) * 100;
            bar.style.width = percent + "%";
        });
    }
}

// Global Unlock Logic v4.0
function unlockPortfolioV4() {
    const gate = document.getElementById('scenario-gate-v4');
    gate.style.opacity = '0';
    gate.style.transition = 'opacity 0.8s ease';
    setTimeout(() => {
        gate.style.display = 'none';
        document.body.style.overflow = 'auto';
        // Initialize Engine AFTER unlock to prevent pre-load noise
        window.DevBridge = new AutonomousEngine();
    }, 800);
}

// Initial State
document.body.style.overflow = 'hidden';
// Auto-Init if gate doesn't exist (legacy fallback)
if (!document.getElementById('scenario-gate-v4')) {
    window.onload = () => {
        window.DevBridge = new AutonomousEngine();
        document.body.style.overflow = 'auto';
    };
}
