#!/bin/bash

# Function to extract title from filename
extract_title_from_filename() {
    local filename="$1"
    # Remove .md extension
    title="${filename%.md}"
    # Remove date patterns like -24, -22, etc.
    title=$(echo "$title" | sed 's/-[0-9][0-9]$//')
    # Replace underscores with spaces
    title=$(echo "$title" | sed 's/_/ /g')
    # Clean up multiple spaces
    title=$(echo "$title" | sed 's/  */ /g' | sed 's/^ *//' | sed 's/ *$//')
    echo "$title"
}

# Function to extract title from content (first heading)
extract_title_from_content() {
    local file="$1"
    local title=""
    
    # Look for first heading in the file
    while IFS= read -r line; do
        if [[ $line =~ ^#+[[:space:]]*(.*) ]]; then
            title="${BASH_REMATCH[1]}"
            title=$(echo "$title" | sed 's/^ *//' | sed 's/ *$//')
            break
        fi
    done < "$file"
    
    echo "$title"
}

# Function to generate tags based on file path and content
generate_tags() {
    local filepath="$1"
    local tags=""
    
    # Path-based tags
    if [[ $filepath == *"Literature"* ]]; then
        tags="$tags literature"
        
        if [[ $filepath == *"Literary Periods"* ]]; then
            tags="$tags literary-periods"
        fi
        
        if [[ $filepath == *"Literary Movements"* ]]; then
            tags="$tags literary-movements"
        fi
        
        if [[ $filepath == *"Glossary"* ]]; then
            tags="$tags glossary"
        fi
    fi
    
    if [[ $filepath == *"2nd Grade"* ]]; then
        tags="$tags 2nd-grade"
        
        if [[ $filepath == *"Previous Year Papers"* ]]; then
            tags="$tags previous-papers"
        fi
        
        if [[ $filepath == *"Analysis"* ]]; then
            tags="$tags analysis"
        fi
    fi
    
    if [[ $filepath == *"Ashok Tests"* ]]; then
        tags="$tags ashok-tests practice-tests"
    fi
    
    if [[ $filepath == *"School Related"* ]]; then
        tags="$tags school"
        
        if [[ $filepath == *"Hindi"* ]]; then
            tags="$tags hindi"
        fi
        
        if [[ $filepath == *"Stories"* ]]; then
            tags="$tags stories"
        fi
    fi
    
    if [[ $filepath == *"Syllabus"* ]]; then
        tags="$tags syllabus"
    fi
    
    if [[ $filepath == *"Miscellaneous"* ]]; then
        tags="$tags miscellaneous"
    fi
    
    if [[ $filepath == *"index"* ]]; then
        tags="$tags index"
    fi
    
    # Content-based tags (simple grep check)
    if grep -qi "question\|mcq\|test\|exam" "$filepath" 2>/dev/null; then
        tags="$tags questions"
    fi
    
    if grep -qi "victorian\|romantic\|modern\|renaissance" "$filepath" 2>/dev/null; then
        tags="$tags period-study"
    fi
    
    if grep -qi "movement\|aestheticism\|symbolism" "$filepath" 2>/dev/null; then
        tags="$tags movement-study"
    fi
    
    # Remove duplicates and sort
    echo "$tags" | tr ' ' '\n' | sort -u | tr '\n' ' '
}

# Function to check if file has frontmatter
has_frontmatter() {
    local file="$1"
    local first_line=$(head -n1 "$file" 2>/dev/null | tr -d '\r')
    [[ "$first_line" == "---" ]]
}

# Function to create frontmatter
create_frontmatter() {
    local title="$1"
    local tags="$2"
    
    echo "---"
    echo "title: $title"
    
    if [[ -n "$tags" ]]; then
        echo "tags:"
        for tag in $tags; do
            echo "  - $tag"
        done
    fi
    
    echo "---"
    echo ""
}

# Function to process a single file
process_file() {
    local file="$1"
    local filename=$(basename "$file")
    
    # Skip if already has frontmatter
    if has_frontmatter "$file"; then
        echo "Skipping $file - already has frontmatter"
        return 1
    fi
    
    # Extract title
    local content_title=$(extract_title_from_content "$file")
    local filename_title=$(extract_title_from_filename "$filename")
    local title="${content_title:-$filename_title}"
    
    # Generate tags
    local tags=$(generate_tags "$file")
    
    # Create temporary file with frontmatter
    local temp_file=$(mktemp)
    
    # Add frontmatter
    create_frontmatter "$title" "$tags" > "$temp_file"
    
    # Add original content
    cat "$file" >> "$temp_file"
    
    # Replace original file
    mv "$temp_file" "$file"
    
    echo "Added frontmatter to $file"
    return 0
}

# Main function
main() {
    local base_path="/storage/emulated/0/KD/iamkdraj.github.io/content"
    local processed=0
    local skipped=0
    
    echo "Processing markdown files in $base_path"
    
    # Find all markdown files and process them
    find "$base_path" -name "*.md" -type f | while read -r file; do
        if process_file "$file"; then
            ((processed++))
        else
            ((skipped++))
        fi
    done
    
    echo "Processing complete!"
    echo "Check the files to verify the frontmatter was added correctly."
}

# Run main function
main