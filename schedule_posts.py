import json
from datetime import datetime, timedelta
import os

def schedule_posts():
    bank_path = 'posts_bank.json'
    live_path = 'posts.json'
    
    with open(bank_path, 'r', encoding='utf-8') as f:
        bank = json.load(f)
    with open(live_path, 'r', encoding='utf-8') as f:
        live = json.load(f)
        
    candidate_pool = [p for p in bank['candidate'] if not p.get('published', False)]
    company_pool = [p for p in bank['company'] if not p.get('published', False)]
    
    # We will schedule for the next 30 days
    # 1 candidate + 1 company post per day
    num_days = min(30, len(candidate_pool), len(company_pool))
    
    next_id = max([p['id'] for p in live['posts']]) + 1 if live['posts'] else 1
    today = datetime.now()
    
    new_posts = []
    
    for i in range(num_days):
        date_str = (today + timedelta(days=i)).strftime('%Y-%m-%d')
        
        # Candidate Post
        c_post = candidate_pool[i]
        c_post['published'] = True
        new_posts.append({
            "id": next_id,
            "published": True,
            "concept_hash": c_post['concept_hash'],
            "title": c_post['title'],
            "date": date_str,
            "tags": c_post['tags'],
            "seo_keywords": c_post['seo_keywords'],
            "body": c_post['body']
        })
        next_id += 1
        
        # Company Post
        co_post = company_pool[i]
        co_post['published'] = True
        new_posts.append({
            "id": next_id,
            "published": True,
            "concept_hash": co_post['concept_hash'],
            "title": co_post['title'],
            "date": date_str,
            "tags": co_post['tags'],
            "seo_keywords": co_post['seo_keywords'],
            "body": co_post['body']
        })
        next_id += 1
        
    live['posts'].extend(new_posts)
    
    with open(bank_path, 'w', encoding='utf-8') as f:
        json.dump(bank, f, indent=4)
        
    with open(live_path, 'w', encoding='utf-8') as f:
        json.dump(live, f, indent=4)
        
    print(f"Scheduled {num_days * 2} posts over {num_days} days.")

if __name__ == "__main__":
    schedule_posts()
