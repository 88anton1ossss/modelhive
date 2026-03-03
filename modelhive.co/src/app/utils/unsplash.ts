// Placeholder for Unsplash integration
export const unsplash_tool = {
  search: (query: string) => {
    return `https://images.unsplash.com/photo-1234567890?w=400&h=500&fit=crop&q=${encodeURIComponent(query)}`;
  }
};
