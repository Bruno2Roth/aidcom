import re

with open('C:\\Users\\rothb\\aidcom\\ml_page.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Search for MLA- IDs (MercadoLibre product IDs)
mla_ids = set(re.findall(r'MLA-[0-9]+', content))
print('MLA IDs found:')
for mid in sorted(mla_ids):
    print(mid)

# Search for product URLs
urls = set(re.findall(r'https?://www\.mercadolibre\.com\.ar/[A-Za-z0-9_-]+/MLA-[0-9]+[^"\'\\s<>]*', content))
print('\nProduct URLs found:')
for u in sorted(urls):
    print(u)

# Search for image URLs
imgs = set(re.findall(r'https?://http2\.mlstatic\.com/D_[A-Z0-9_-]+', content))
print('\nImage URLs found:')
for i in sorted(imgs):
    print(i)

# Search for structured data around each product
print('\n--- Product Cards HTML snippets ---')
# Find product card sections
cards = re.findall(r'<div[^>]*class="[^"]*poly-card[^"]*"[^>]*>.*?</div>\s*</li>', content, re.DOTALL)
print(f'Found {len(cards)} product card(s)')
for idx, card in enumerate(cards[:20]):
    # Extract product name
    name_match = re.search(r'<h2[^>]*class="[^"]*poly-box[^"]*"[^>]*>(.*?)</h2>', card, re.DOTALL)
    name = name_match.group(1).strip() if name_match else 'N/A'
    name = re.sub(r'<[^>]+>', '', name)
    
    # Extract price
    price_match = re.search(r'<span[^>]*class="[^"]*andes-money-amount[^"]*"[^>]*>(.*?)</span>', card, re.DOTALL)
    price = price_match.group(1).strip() if price_match else 'N/A'
    price = re.sub(r'<[^>]+>', '', price)
    
    # Extract link
    link_match = re.search(r'<a[^>]*href="([^"]+)"', card)
    link = link_match.group(1) if link_match else 'N/A'
    
    # Extract image
    img_match = re.search(r'<img[^>]*src="([^"]+)"', card)
    img = img_match.group(1) if img_match else 'N/A'
    
    print(f'\nProduct {idx+1}:')
    print(f'  Name: {name.strip()}')
    print(f'  Price: {price.strip()}')
    print(f'  Link: {link}')
    print(f'  Image: {img}')

# Also search for JSON data
print('\n--- JSON data blocks ---')
json_patterns = re.findall(r'<script[^>]*type="application/ld\+json"[^>]*>(.*?)</script>', content, re.DOTALL)
print(f'Found {len(json_patterns)} JSON-LD blocks')
for j in json_patterns:
    print(j[:1000])
