import json
from datetime import datetime
import os

def mass_post_today():
    live_path = 'posts.json'
    today = datetime.now().strftime('%Y-%m-%d')
    
    with open(live_path, 'r', encoding='utf-8-sig') as f:
        live = json.load(f)
        
    updated_count = 0
    for post in live['posts']:
        # Force all new migration posts (ID > 140) to today's date
        if post['id'] > 140:
            post['date'] = today
            updated_count += 1
            
    with open(live_path, 'w', encoding='utf-8') as f:
        json.dump(live, f, indent=calc_indent(live_path))
        
    print(f"Updated {updated_count} posts to {today}.")

def calc_indent(path):
    # Detect indent from file if possible, else 4
    return 4

if __name__ == "__main__":
    mass_post_today()
