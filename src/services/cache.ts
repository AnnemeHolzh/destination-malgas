const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const cache = {
  get(key: string) {
    const item = localStorage.getItem(key);
    if (!item) return null;
    
    const { timestamp, data } = JSON.parse(item);
    if (Date.now() - timestamp > CACHE_DURATION) {
      localStorage.removeItem(key);
      return null;
    }
    
    return data;
  },
  
  set(key: string, data: any) {
    const item = JSON.stringify({
      timestamp: Date.now(),
      data
    });
    localStorage.setItem(key, item);
  }
}; 