const UNIVERSAL_VOICE_ENGINE = {
    locales: {
        'en': 'en-IN',
        'ml': 'ml-IN',
        'hi': 'hi-IN'
    },
    fuzzyCommands: {
        en: {
            yes: ['yes', 'yeah', 'yup', 'correct', 'ok', 'okay', 'sure', 'fine'],
            no: ['no', 'nope', 'incorrect', 'wrong', 'dont', 'stop', 'back'],
            next: ['next', 'ready', 'skip', 'done', 'go']
        },
        ml: {
            yes: ['അതെ', 'ശരി', 'സമ്മതം', 'ഓക്കേ', 'അതെ അതെ', 'നോക്കാം'],
            no: ['അല്ല', 'വേണ്ട', 'ശരിയല്ല', 'ഇല്ല', 'തെറ്റാണ്'],
            next: ['ശരി', 'കഴിഞ്ഞു', 'അടുത്തത്', 'അടുത്ത', 'അടുത്തെ']
        }
    },
    resolveIntent: (text, type, lang) => {
        if (!text) return false;
        const normalized = text.toLowerCase().trim();
        const commands = UNIVERSAL_VOICE_ENGINE.fuzzyCommands[lang] ? UNIVERSAL_VOICE_ENGINE.fuzzyCommands[lang][type] || [] : [];
        return commands.some(cmd => normalized.includes(cmd));
    },
    prompts: {
        'en': {
            micPermission: "I am starting your voice assistant. To continue, please click the 'Allow' button on the microphone prompt at the top of your browser so I can hear you.",
            micDenied: "I'm sorry, I don't have permission to use your microphone. Please enable it in your browser settings to use voice mode.",
            welcome: "Thank you. I can hear you now. Welcome to DevBridge. Which language do you prefer? Malayalam, English, or Hindi?",
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
            assetCheck: "Do you have a {type} file? Please say Yes or No.",
            assetNarrate: "Ok, I have highlighted the {type} upload button. Please click it to select your file, or ask someone to help you. Say Next when you are ready.",
            assetDescribe: "No problem. Please describe what you want for your {type}, or say 'You choose' if you want us to pick the best one for you.",
            resumePrompt: "I found your previous progress. Would you like to resume where you left off?",
            invalidField: "I'm sorry, I heard an invalid format. Let's try that again.",
            fileTooLarge: "Your file is too large. For direct uploads, we recommend and keep it under 40 MB. Please use an embed link instead, or I can help you compress it.",
            confirmValue: "I heard {value}. Is this correct?",
            retry: "I'm sorry, I didn't catch that. Could you please repeat?",
            success: "Great! All details are captured. I'm now scrolling you to the final review."
        },
        'ml': {
            micPermission: "നിങ്ങളുടെ വോയ്‌സ് അസിസ്റ്റന്റ് തുടങ്ങുകയാണ്. തുടരുന്നതിനായി, നിങ്ങളുടെ ബ്രൗസറിന് മുകളിലുള്ള മൈക്രോഫോൺ പെർമിഷനിൽ 'Allow' ബട്ടൺ അമർത്തുക.",
            micDenied: "ക്ഷമിക്കണം, മൈക്രോഫോൺ ഉപയോഗിക്കാൻ എനിക്ക് അനുവാദമില്ല. വോയ്‌സ് മോഡ് ഉപയോഗിക്കുന്നതിന് നിങ്ങളുടെ ബ്രൗസർ സെറ്റിംഗ്‌സിൽ ഇത് അനുവദിക്കുക.",
            welcome: "നന്ദി. എനിക്ക് ഇപ്പോൾ നിങ്ങളെ കേൾക്കാം. ദേവ്ബ്രിഡ്ജിലേക്ക് സ്വാഗതം. നിങ്ങൾക്ക് ഏത് ഭാഷയാണ് വേണ്ടത്? മലയാളം, ഇംഗ്ലീഷ്, അതോ ഹിന്ദിയോ?",
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
            assetCheck: "നിങ്ങളുടെ കയ്യിൽ {type} ഫയൽ ഉണ്ടോ? ഉണ്ടെങ്കിൽ 'ഉണ്ട്' എന്നും ഇല്ലെങ്കിൽ 'ഇല്ല' എന്നും പറയുക.",
            assetNarrate: "ശരി, ഞാൻ {type} അപ്‌ലോഡ് ബട്ടൺ ഹൈലൈറ്റ് ചെയ്തിട്ടുണ്ട്. അത് ക്ലിക്ക് ചെയ്ത് ഫയൽ സെലക്ട് ചെയ്യുക. അല്ലെങ്കിൽ മറ്റാരെയെങ്കിലും സഹായിക്കാൻ ആവശ്യപ്പെടുക. കഴിഞ്ഞാൽ 'നെക്സ്റ്റ്' എന്ന് പറയുക.",
            assetDescribe: "സാരമില്ല. നിങ്ങളുടെ {type} എങ്ങനെയായിരിക്കണമെന്ന് വിശദീകരിക്കാമോ? അല്ലെങ്കിൽ നിങ്ങൾക്ക് വേണ്ടി ഞങ്ങൾ തിരഞ്ഞെടുക്കണമെങ്കിൽ 'നിങ്ങൾ തിരഞ്ഞെടുക്കൂ' എന്ന് പറയുക.",
            resumePrompt: "നിങ്ങൾ നേരത്തെ പൂരിപ്പിച്ച വിവരങ്ങൾ ഞാൻ കണ്ടെത്തി. അവിടെ നിന്ന് തന്നെ തുടരണോ?",
            invalidField: "ക്ഷമിക്കണം, നിങ്ങൾ പറഞ്ഞത് എനിക്ക് മനസ്സിലായില്ല. ഒന്നുകൂടി വ്യക്തമാക്കാമോ?",
            fileTooLarge: "നിങ്ങൾ തിരഞ്ഞെടുത്ത ഫയൽ വളരെ വലുതാണ്. 40 എം ബി യിൽ താഴെയുള്ള ഫയലുകൾ മാത്രമേ അപ്‌ലോഡ് ചെയ്യാൻ കഴിയൂ. ദയവായി ലിങ്ക് ഉപയോഗിക്കുയോ വേറെ ഫയൽ തിരഞ്ഞെടുക്കുകയോ ചെയ്യുക.",
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
