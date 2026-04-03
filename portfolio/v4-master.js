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
        this.initThemeSelection();
        this.initReveal();
        this.initActivitySimulator();
        this.initExitCapture();
        this.initWhatsAppHydration();
        this.initScrollProgress();
        this.initGlobalNav();
    }

    // Layer 0: Theme Hub Logic v4.2
    initThemeSelection() {
        const meta = document.querySelector('meta[name="business-type"]');
        if (!meta) return;
        const type = meta.getAttribute('content').toLowerCase();
        let theme = "t-signal"; // Default

        const themes = {
            "t-onyx": ["legal", "tax", "estate", "architect", "agent", "jobs", "consultant", "realty", "blueprint", "elite", "lawyer", "notary", "advocate", "finance", "audit"],
            "t-nature": ["organic", "yoga", "physio", "care", "abroad", "pet", "wellness", "natural", "bridal", "mua", "supplement", "holistic", "nursing", "home", "studio", "serene", "stay"],
            "t-cyber": ["repair", "tech", "security", "detailing", "cyber", "automation", "lighting", "mobile", "flash", "sungrid", "server", "chipset", "diagnostic"],
            "t-hearth": ["bakery", "restaurant", "mess", "saree", "heritage", "cake", "silk", "spice", "food", "kitchen", "traditional", "local"],
            "t-signal": ["cleaning", "plumber", "mover", "rental", "logistic", "fast", "scrap", "fortress", "drive", "trade", "wash", "pest", "tank", "truck"]
        };

        for (const [key, keywords] of Object.entries(themes)) {
            if (keywords.some(k => type.includes(k))) {
                theme = key;
                break;
            }
        }
        document.body.classList.add(theme);
    }

    // Layer 9: Global Nav Logic v4.2
    initGlobalNav() {
        const meta = document.querySelector('meta[name="business-type"]');
        if (meta && meta.getAttribute('content') === 'Portfolio Hub') return;

        const nav = document.createElement('a');
        nav.href = "index.html";
        nav.className = "floating-hub-link";
        nav.innerHTML = `<span>&larr;</span> Portfolio Hub`;
        document.body.appendChild(nav);
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
        // ... (existing showToast logic)
        const activity = v4_ActivityDatabase[Math.floor(Math.random() * v4_ActivityDatabase.length)];
        const toast = document.createElement('div');
        toast.id = 'activity-toast';
        toast.className = 'visible';
        toast.innerHTML = `
            <div class="activity-avatar">${activity.city[0]}</div>
            <div class="activity-info">
                <strong>Someone from ${activity.city}</strong><br>
                ${activity.action} for a ${activity.type}.
            </div>
        `;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(-200%)';
            setTimeout(() => toast.remove(), 1000);
        }, 6000);
    }

    // Layer 4: Exit Capture Engine
    initExitCapture() {
        let captureTriggered = false;
        window.addEventListener('scroll', () => {
            const scrollPercent = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight;
            if (scrollPercent > 0.95 && !captureTriggered) {
                this.triggerCapture();
                captureTriggered = true;
            }
        });

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
                <span class="badge-elite" style="color:var(--accent); border-color:var(--accent);">Decision Accelerator</span>
                <h2 style="color:white;">Still Thinking?</h2>
                <p style="color:rgba(255,255,255,0.7);">Don't let your business stay invisible for another day. I can deliver your high-converting website within 24 hours. No advance needed—pay ONLY when satisfied.</p>
                <div style="display:flex; justify-content:center; gap:20px; flex-wrap:wrap;">
                    <a href="https://wa.me/918137826016" class="btn-v4" style="background:var(--success); color:white;">Build My Site Today</a>
                    <button class="btn-v4" id="close-exit" style="background:rgba(255,255,255,0.1); color:white;">Browse Full Hub</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        modal.style.display = 'flex';
        modal.querySelector('#close-exit').onclick = () => {
            const currentPath = window.location.pathname;
            if(currentPath.includes('portfolio/')) window.location.href = "index.html";
            else modal.remove();
        };
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
            let message = encodeURIComponent(`Hi, I saw the ${bType} website demo on DevBridge Kerala. I want something similar for my business. Can we talk?`);
            if(isHub) message = encodeURIComponent(`Hi, I'm exploring the DevBridge Kerala Portfolio Hub. I want to build a high-converting website for ₹1000. Can we talk?`);
            link.href = `${baseUrl}?text=${message}`;
        });
    }

    initScrollProgress() {
        const bar = document.createElement('div');
        bar.style.cssText = "position:fixed; top:0; left:0; height:4px; background:var(--accent); z-index:2000000; transition:width 0.1s linear;";
        document.body.appendChild(bar);
        window.addEventListener('scroll', () => {
            const h = document.documentElement, b = document.body, st = 'scrollTop', sh = 'scrollHeight';
            const percent = (h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight) * 100;
            bar.style.width = percent + "%";
        });
    }
}

function unlockPortfolioV4() {
    const gate = document.getElementById('scenario-gate-v4');
    if(!gate) return;
    gate.style.opacity = '0';
    gate.style.transition = 'opacity 0.6s ease';
    setTimeout(() => {
        gate.style.display = 'none';
        document.body.style.overflow = 'auto';
        window.DevBridge = new AutonomousEngine();
    }, 600);
}

document.body.style.overflow = 'hidden';
if (!document.getElementById('scenario-gate-v4')) {
    window.onload = () => {
        window.DevBridge = new AutonomousEngine();
        document.body.style.overflow = 'auto';
    };
}
