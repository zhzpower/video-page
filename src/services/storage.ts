const HIGHLIGHT_KEY = 'video-page-highlights';

export const getHighlightedNames = (): string[] => {
  if (typeof window === 'undefined') return [];
  
  try {
    const saved = localStorage.getItem(HIGHLIGHT_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Error getting highlighted names:', error);
    return [];
  }
};

export const toggleHighlightName = (name: string): string[] => {
  const highlights = getHighlightedNames();
  
  const index = highlights.indexOf(name);
  if (index >= 0) {
    highlights.splice(index, 1);
  } else {
    highlights.push(name);
  }
  
  try {
    localStorage.setItem(HIGHLIGHT_KEY, JSON.stringify(highlights));
  } catch (error) {
    console.error('Error saving highlighted names:', error);
  }
  
  return highlights;
}; 
