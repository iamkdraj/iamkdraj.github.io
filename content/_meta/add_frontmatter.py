#!/usr/bin/env python3
"""
Script to add frontmatter (title and tags) to all markdown files in the Obsidian vault.
"""

import os
import re
from pathlib import Path
from typing import List, Dict, Optional

def extract_title_from_filename(filename: str) -> str:
    """Extract and clean title from filename."""
    # Remove .md extension
    title = filename.replace('.md', '')
    
    # Remove date patterns (e.g., "2nd Grade TSS-24" -> "2nd Grade TSS")
    title = re.sub(r'-\d{2}$', '', title)
    
    # Clean up common patterns
    title = title.replace('_', ' ')
    title = re.sub(r'\s+', ' ', title).strip()
    
    return title

def extract_title_from_content(content: str) -> Optional[str]:
    """Extract title from the first heading in the content."""
    lines = content.split('\n')
    for line in lines:
        line = line.strip()
        if line.startswith('#'):
            # Remove markdown heading symbols and clean up
            title = re.sub(r'^#+\s*', '', line)
            title = title.strip()
            if title:
                return title
    return None

def generate_tags(file_path: str, content: str) -> List[str]:
    """Generate relevant tags based on file path and content."""
    tags = []
    
    # Path-based tags
    path_parts = file_path.split('/')
    
    if 'Literature' in path_parts:
        tags.append('literature')
        
        if 'Literary Periods' in path_parts:
            tags.append('literary-periods')
            
        if 'Literary Movements' in path_parts:
            tags.append('literary-movements')
            
        if 'Glossary' in path_parts:
            tags.append('glossary')
            
    if '2nd Grade' in path_parts or '2nd Grade' in file_path:
        tags.append('2nd-grade')
        
        if 'Previous Year Papers' in path_parts:
            tags.append('previous-papers')
            
        if 'Analysis' in path_parts:
            tags.append('analysis')
            
    if 'Ashok Tests' in path_parts:
        tags.append('ashok-tests')
        tags.append('practice-tests')
        
    if 'School Related' in path_parts:
        tags.append('school')
        
        if 'Hindi' in path_parts:
            tags.append('hindi')
            
        if 'Stories' in path_parts:
            tags.append('stories')
            
    if 'Syllabus' in path_parts:
        tags.append('syllabus')
        
    if 'Miscellaneous' in path_parts:
        tags.append('miscellaneous')
        
    # Content-based tags
    content_lower = content.lower()
    
    if any(word in content_lower for word in ['victorian', 'romantic', 'modern', 'renaissance']):
        tags.append('period-study')
        
    if any(word in content_lower for word in ['movement', 'aestheticism', 'symbolism']):
        tags.append('movement-study')
        
    if any(word in content_lower for word in ['question', 'mcq', 'test', 'exam']):
        tags.append('questions')
        
    if 'index' in file_path.lower():
        tags.append('index')
        
    # Remove duplicates and sort
    return sorted(list(set(tags)))

def has_frontmatter(content: str) -> bool:
    """Check if content already has frontmatter."""
    return content.strip().startswith('---')

def create_frontmatter(title: str, tags: List[str]) -> str:
    """Create frontmatter block."""
    frontmatter = "---\n"
    frontmatter += f"title: {title}\n"
    
    if tags:
        frontmatter += "tags:\n"
        for tag in tags:
            frontmatter += f"  - {tag}\n"
    
    frontmatter += "---\n\n"
    return frontmatter

def process_file(file_path: str) -> bool:
    """Process a single markdown file to add frontmatter."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Skip if already has frontmatter
        if has_frontmatter(content):
            print(f"Skipping {file_path} - already has frontmatter")
            return False
        
        # Extract title
        filename = os.path.basename(file_path)
        title = extract_title_from_content(content) or extract_title_from_filename(filename)
        
        # Generate tags
        tags = generate_tags(file_path, content)
        
        # Create frontmatter
        frontmatter = create_frontmatter(title, tags)
        
        # Add frontmatter to content
        new_content = frontmatter + content
        
        # Write back to file
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        print(f"Added frontmatter to {file_path}")
        return True
        
    except Exception as e:
        print(f"Error processing {file_path}: {e}")
        return False

def main():
    """Main function to process all markdown files."""
    base_path = "/storage/emulated/0/KD/iamkdraj.github.io/content"
    
    # Find all markdown files
    markdown_files = []
    for root, dirs, files in os.walk(base_path):
        for file in files:
            if file.endswith('.md'):
                markdown_files.append(os.path.join(root, file))
    
    print(f"Found {len(markdown_files)} markdown files")
    
    # Process each file
    processed_count = 0
    skipped_count = 0
    
    for file_path in sorted(markdown_files):
        if process_file(file_path):
            processed_count += 1
        else:
            skipped_count += 1
    
    print(f"\nProcessing complete!")
    print(f"Processed: {processed_count} files")
    print(f"Skipped: {skipped_count} files")

if __name__ == "__main__":
    main()