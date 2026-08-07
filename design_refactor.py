import os
import re

directories = ["src/pages", "src/components", "src/layouts", "src\\pages", "src\\components", "src\\layouts"]

def process_file(path):
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    new_content = content

    # 1. Spacing: Improve section paddings
    # Match py-16 or py-20 that don't already have a larger desktop padding
    new_content = re.sub(r'\bpy-16\b(?! sm:py| md:py| lg:py| xl:py)', r'py-16 lg:py-24', new_content)
    new_content = re.sub(r'\bpy-12\b(?! sm:py| md:py| lg:py| xl:py)', r'py-16 lg:py-20', new_content)
    new_content = re.sub(r'\bpy-20\b(?! sm:py| md:py| lg:py| xl:py)', r'py-20 lg:py-28', new_content)
    
    # Also target pt-16 / pb-16 etc.
    new_content = re.sub(r'\bpt-16\b(?! sm:pt| md:pt| lg:pt| xl:pt)', r'pt-16 lg:pt-24', new_content)
    new_content = re.sub(r'\bpb-16\b(?! sm:pb| md:pb| lg:pb| xl:pb)', r'pb-16 lg:pb-24', new_content)

    # 2. Typography: Add leading-relaxed to paragraphs if not present
    new_content = re.sub(r'(<p[^>]*className="[^"]*)(")', 
                         lambda m: m.group(1) + (' leading-relaxed' if 'leading-' not in m.group(1) else '') + m.group(2), 
                         new_content)

    # Enhance titles (add tracking-tight for modern look on big text)
    new_content = re.sub(r'\b(text-[3456]xl)\b(?!.*tracking-)', r'\1 tracking-tight', new_content)
    
    # Body text: text-gray-500 -> text-gray-600 for better contrast (if not already)
    new_content = re.sub(r'\btext-gray-500\b', r'text-gray-600', new_content)

    # 3. Images: Enhance rounded corners and shadows
    new_content = re.sub(r'\brounded-lg\b', r'rounded-2xl', new_content)
    new_content = re.sub(r'\brounded-md\b', r'rounded-xl', new_content)
    
    # Replace shadow-md with shadow-lg or shadow-xl
    new_content = re.sub(r'\bshadow-md\b', r'shadow-xl', new_content)
    new_content = re.sub(r'\bshadow-sm\b', r'shadow-md', new_content)
    
    # Ensure images have object-cover if they don't
    new_content = re.sub(r'(<img[^>]*className="[^"]*)(")',
                         lambda m: m.group(1) + (' object-cover' if 'object-' not in m.group(1) else '') + m.group(2),
                         new_content)

    # 4. Interactive elements (Cards/Buttons hover)
    new_content = re.sub(r'\bhover:shadow-xl\b(?!.*transition)', r'hover:shadow-xl transition-all duration-300', new_content)
    new_content = re.sub(r'\bhover:-translate-y-1\b(?!.*transition)', r'hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl', new_content)

    if content != new_content:
        with open(path, "w", encoding="utf-8") as f:
            f.write(new_content)
        return True
    return False

updated_count = 0
for root, _, files in os.walk("."):
    if not any(d in root for d in directories):
        continue
    for file in files:
        if not file.endswith((".tsx", ".jsx", ".ts", ".js")): continue
        path = os.path.join(root, file)
        if process_file(path):
            updated_count += 1
            print(f"Updated {path}")

print(f"Finished updating {updated_count} files.")

