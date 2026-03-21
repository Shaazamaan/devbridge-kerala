import json
import os

def refill_bank(category, insights):
    bank_path = 'posts_bank.json'
    if not os.path.exists(bank_path):
        data = {"candidate": [], "company": []}
    else:
        with open(bank_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
    
    start_id = len(data[category]) + 1
    for i, insight in enumerate(insights):
        insight['concept_hash'] = f"{'c' if category == 'candidate' else 'co'}-{start_id + i}"
        insight['published'] = False
        data[category].append(insight)
    
    with open(bank_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=4)

# Batch 1: Candidate Insights (100 items)
candidate_insights = [
    # I will generate 100 items here
]

# Batch 1: Company Insights (100 items)
company_insights = [
    # I will generate 100 items here
]

# refill_bank('candidate', candidate_insights)
# refill_bank('company', company_insights)
