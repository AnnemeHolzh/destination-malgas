export function parseDescription(description: string) {
    // Updated regex to capture different heading levels
    const sections = description.split(/(#+)(.*?)\1/);
    const result = [];
    
    for (let i = 0; i < sections.length; i++) {
      const content = sections[i].trim();
      if (!content) continue;
      
      // Check for heading levels based on delimiter length
      if (i % 3 === 1) { // Captured the ##+ group
        const headingLevel = sections[i].length; // Number of # determines level
        const headingContent = sections[i+1].trim();
        
        result.push({
          type: `h${headingLevel}`,
          content: headingContent
        });
        i++; // Skip next element since we processed it
      } else {
        result.push({
          type: 'paragraph',
          content: content
        });
      }
    }
    
    return result;
}