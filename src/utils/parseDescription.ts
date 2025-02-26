export function parseDescription(description: string) {
    const sections = description.split(/#(.*?)#/);
    const result = [];
    
    for (let i = 0; i < sections.length; i++) {
      if (i % 2 === 1) {
        // Odd indices are headings
        result.push({
          type: 'heading',
          content: sections[i].trim()
        });
      } else if (sections[i].trim()) {
        // Even indices are paragraphs
        result.push({
          type: 'paragraph',
          content: sections[i].trim()
        });
      }
    }
    
    return result;
  }