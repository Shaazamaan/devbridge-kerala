const UNIVERSAL_VOICE_ENGINE = {
    locales: {
        'ml': 'ml-IN',
        'en': 'en-IN',
        'hi': 'hi-IN'
    },
    prompts: {
        'en': {
            welcome: "Welcome to DevBridge. Which language do you prefer? Malayalam, English, or Hindi?",
            confirmLanguage: "Ok, I will continue in English. Let's start. What is your business name?",
            businessName: "What is your business name?",
            tagline: "Do you have a tagline? If yes, please say it.",
            city: "In which city is your business located?",
            category: "What is your business category? For example, construction or retail.",
            service1: "What is your first service?",
            service2: "What is your second service?",
            service3: "What is your third service?",
            style: "Which style would you like? Elegant, Modern, or Natural?",
            goal: "What is your primary goal? WhatsApp message or Phone call?",
            whatsapp: "Please say your WhatsApp number.",
            phone: "Please say your Phone number.",
            email: "What is your email address?",
            confirmValue: "I heard {value}. Is this correct?",
            retry: "I'm sorry, I didn't catch that. Could you please repeat?",
            success: "Great! All details are captured. I'm now scrolling you to the final review."
        },
        'ml': {
            welcome: "ദേവ്ബ്രിഡ്ജിലേക്ക് സ്വാഗതം. നിങ്ങൾക്ക് ഏത് ഭാഷയാണ് വേണ്ടത്? മലയാളം, ഇംഗ്ലീഷ്, അതോ ഹിന്ദിയോ?",
            confirmLanguage: "ശരി, ഞാൻ മലയാളത്തിൽ തുടരാം. നമുക്ക് തുടങ്ങാം. നിങ്ങളുടെ ബിസിനസ്സിന്റെ പേര് എന്താണ്?",
            businessName: "നിങ്ങളുടെ ബിസിനസ്സിന്റെ പേര് എന്താണ്?",
            tagline: "ബിസിനസ്സിന് ഒരു ടാഗ്ലൈൻ ഉണ്ടോ? ഉണ്ടെങ്കിൽ അത് പറയുക.",
            city: "നിങ്ങളുടെ ബിസിനസ്സ് ഏത് നഗരത്തിലാണ് സ്ഥിതി ചെയ്യുന്നത്?",
            category: "നിങ്ങളുടെ ബിസിനസ്സ് ഏത് വിഭാഗത്തിൽ പെടുന്നു?",
            service1: "നിങ്ങൾ നൽകുന്ന ആദ്യത്തെ സേവനം എന്താണ്?",
            service2: "രണ്ടാമത്തെ സേവനം എന്താണ്?",
            service3: "മൂന്നാമത്തെ സേവനം എന്താണ്?",
            style: "വെബ്സൈറ്റിന് ഏത് സ്റ്റൈൽ ആണ് വേണ്ടത്? എലഗന്റ്, മോഡേൺ, അല്ലെങ്കിൽ നാച്ചുറൽ?",
            goal: "നിങ്ങളുടെ ലക്ഷ്യം എന്താണ്? വാട്സ്ആപ്പ് ആണോ അതോ ഫോൺ കോൾ ആണോ?",
            whatsapp: "നിങ്ങളുടെ വാട്സ്ആപ്പ് നമ്പർ പറയുക.",
            phone: "നിങ്ങളുടെ ഫോൺ നമ്പർ പറയുക.",
            email: "നിങ്ങളുടെ ഇമെയിൽ അഡ്രസ്സ് എന്താണ്?",
            confirmValue: "ഞാൻ കേട്ടത് {value}. ഇത് ശരിയാണോ?",
            retry: "ക്ഷമിക്കണം, എനിക്ക് അത് മനസ്സിലായില്ല. ഒന്നുകൂടി പറയാമോ?",
            success: "നന്ദി! എല്ലാ വിവരങ്ങളും റെക്കോർഡ് ചെയ്തു."
        }
    },
    formatters: {
        email: (str) => {
            return str.toLowerCase()
                .replace(/\s+at\s+/g, '@')
                .replace(/\s+dot\s+/g, '.')
                .replace(/\s+underscore\s+/g, '_')
                .replace(/\s+/g, '');
        },
        number: (str) => {
            return str.replace(/[^0-9]/g, '');
        }
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = UNIVERSAL_VOICE_ENGINE;
} else {
    window.UNIVERSAL_VOICE_ENGINE = UNIVERSAL_VOICE_ENGINE;
}
