import json
import os

file_path = r'c:\Users\Shaaz\.gemini\antigravity\playground\nascent-hubble\devbridge-kerala\posts.json'

with open(file_path, 'r', encoding='utf-8-sig') as f:
    data = json.load(f)

# Check if case study already exists to avoid duplicates
if not any(p.get('id') == 888 for p in data['posts']):
    case_study = {
        'id': 888,
        'published': True,
        'title': "Case Study: Filtering 1,000+ Candidates for ₹500 (Venture Navigator)",
        'body': "How do you find elite talent on a micro-budget? We ran a 'Negative Marketing' campaign for Venture Navigator, explicitly highlighting a 1-month unpaid probation in the ad copy. By combining this with conditional knockout questions (laptop/WiFi verification), we filtered for grit before a single rupee was spent. The result: high-signal leads only.",
        'date': "2026-03-31",
        'tags': ["Company", "Strategy", "Hiring", "Grit"],
        'seo_keywords': "venture navigator case study, hiring on a budget, negative marketing Kerala, recruitment grit, startup hiring India"
    }
    # Insert after pillars or at top
    data['posts'].insert(1, case_study)

with open(file_path, 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=4)

print("Case Study successfully injected.")
