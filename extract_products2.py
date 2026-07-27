import re

with open('C:\\Users\\rothb\\aidcom\\ml_page.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract product names from h2 tags with poly-box class
names = re.findall(r'<h2[^>]*class="[^"]*poly-box[^"]*"[^>]*>\s*(.*?)\s*</h2>', content, re.DOTALL)
print('Product Names:')
for i, n in enumerate(names):
    clean = re.sub(r'<[^>]+>', '', n).strip()
    print(f'{i+1}. {clean}')

# Extract prices - search for andes-money-amount
prices = re.findall(r'<span[^>]*class="[^"]*andes-money-amount[^"]*"[^>]*>.*?<span[^>]*class="[^"]*andes-money-amount__fraction[^"]*"[^>]*>(.*?)</span>', content, re.DOTALL)
print('\nPrices (fractions):')
for i, p in enumerate(prices):
    print(f'{i+1}. ${p.strip()}')

# Try with different pattern
price_blocks = re.findall(r'andes-money-amount[^>]*>.*?<span[^>]*class="[^"]*andes-money-amount__fraction[^"]*"[^>]*>(\d+(?:\.\d+)?)</span>', content, re.DOTALL)
print('\nPrices (alternative):')
for i, p in enumerate(price_blocks):
    print(f'{i+1}. ${p}')

# Extract also from regular price class
price_labels = re.findall(r'<span[^>]*class="[^"]*andes-money-amount__fraction[^"]*"[^>]*>([^<]+)</span>', content)
print('\nAll price fractions:')
for i, p in enumerate(price_labels):
    print(f'{i+1}. {p}')

# Try to find product images with full URLs
full_imgs = re.findall(r'https?://http2\.mlstatic\.com/D_[A-Z0-9_-]+\.webp', content)
print('\nAll product images (.webp):')
for i, img in enumerate(full_imgs):
    print(f'{i+1}. {img}')

full_imgs_jpg = re.findall(r'https?://http2\.mlstatic\.com/D_[A-Z0-9_-]+\.jpg', content)
print('\nAll product images (.jpg):')
for i, img in enumerate(full_imgs_jpg):
    print(f'{i+1}. {img}')
