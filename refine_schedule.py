import json
from datetime import datetime, timedelta

def refine_schedule():
    live_path = 'posts.json'
    today_str = '2026-03-21'
    
    with open(live_path, 'r', encoding='utf-8-sig') as f:
        live = json.load(f)
        
    posts = live['posts']
    
    # Identify the 60 new posts (141-200)
    new_posts = [p for p in posts if 141 <= p['id'] <= 200]
    
    # 1. First 10 (5 Candidate, 5 Company) set to Today
    # Candidate IDs: 141, 143, 145, 147, 149
    # Company IDs: 142, 144, 146, 148, 150
    for i in range(141, 151):
        p = next((x for x in posts if x['id'] == i), None)
        if p: p['date'] = today_str
        
    # 2. Remaining 50 posts (151-200) spread over Mar 22 - Mar 31 (10 days)
    remaining_posts = [p for p in posts if 151 <= p['id'] <= 200]
    days_to_spread = 10 # Mar 22 to Mar 31
    posts_per_day = 5
    
    for i in range(days_to_spread):
        target_date = (datetime(2026, 3, 22) + timedelta(days=i)).strftime('%Y-%m-%d')
        daily_batch = remaining_posts[i*posts_per_day : (i+1)*posts_per_day]
        for p in daily_batch:
            p['date'] = target_date
            
    with open(live_path, 'w', encoding='utf-8') as f:
        json.dump(live, f, indent=4)
        
    print(f"Refined schedule: 10 posts for {today_str}, then 5 posts/day until March 31st.")

if __name__ == "__main__":
    refine_schedule()
