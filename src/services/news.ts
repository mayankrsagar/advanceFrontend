export interface Article {
  source: { id: string | null; name: string };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
}

/**
 * Fetch headlines via our serverless proxy.
 */
export const fetchHeadlines = async (category: string, page: number) => {
  const res = await fetch(`/api/news?category=${encodeURIComponent(category)}&page=${page}`);
  if (!res.ok) {
    console.error('News fetch failed:', await res.text());
    return [];
  }
  return res.json();
};

