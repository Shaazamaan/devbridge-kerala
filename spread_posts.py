import json
from datetime import datetime, timedelta
import os

def spread_posts():
    live_path = 'posts.json'
    today = datetime.now()
    # End date is April 1st
    end_date = datetime(2026, 4, 1)
    
    # Calculate days left (including today)
    delta = end_date - today
    days_left = delta.days + 1
    if days_left <= 0: days_left = 1
    
    with open(live_path, 'r', encoding='utf-8-sig') as f:
        live = json.load(f)
        
    # Get the 60 posts we added (IDs 141 to 200)
    target_posts = [p for p in live['posts'] if 141 <= p['id'] <= 200]
    
    posts_per_day = len(target_posts) // days_left
    remainder = len(target_posts) % days_left
    
    current_idx = 0
    for i in range(days_left):
        current_date = (today + timedelta(days=i)).strftime('%Y-%m-%d')
        count = posts_per_day + (1 if i < remainder else 0)
        
        for _ in range(count):
            if current_idx < len(target_posts):
                target_posts[current_idx]['date'] = current_date
                current_idx += 1
                
    with open(live_path, 'w', encoding='utf-8') as f:
        json.dump(live, f, indent=4)
        
    print(f"Spread {len(target_posts)} entries over {days_left} days (until April 1st).")

if __name__ == "__main__":
    spread_posts()
