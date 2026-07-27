import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('C:\\Users\\rothb\\aidcom\\ml_page.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Find all product cards and extract info
cards = re.findall(r'<div[^>]*class="[^"]*poly-card[^"]*"[^>]*>.*?</div>\s*</li>', content, re.DOTALL)
print(f'Total product cards found: {len(cards)}')

for idx, card in enumerate(cards):
    # Get the link
    link_match = re.search(r'<a[^>]*href="([^"]+)"', card)
    link = link_match.group(1) if link_match else 'N/A'
    
    # Get image
    img_match = re.search(r'<img[^>]*src="([^"]+)"', card)
    img = img_match.group(1) if img_match else 'N/A'
    
    # Get the full text of the card
    text = re.sub(r'<[^>]+>', ' ', card)
    text = re.sub(r'\s+', ' ', text).strip()
    
    # First 200 chars for name/context
    print(f'\nCard {idx+1}:')
    print(f'  Link: {link}')
    print(f'  Image: {img}')
    print(f'  Text preview: {text[:200]}')
