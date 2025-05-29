import axios from 'axios';

const BASE = 'https://newsapi.org/v2';
const KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;
const PAGE_SIZE = 20;

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
 * Fetch headlines with pagination data. Returns articles and totalResults.
 */
export const fetchHeadlines = async (
  category: string,
  page: number
): Promise<{ articles: Article[]; totalResults: number }> => {
  try {
    // Primary: top-headlines endpoint
    const res = await axios.get(`${BASE}/top-headlines`, {
      params: {
        apiKey: KEY,
        category,
        country: 'in',
        pageSize: PAGE_SIZE,
        page,
      },
    });

    let articles: Article[] = res.data.articles;
    let totalResults: number = res.data.totalResults;

    // Fallback to /everything if no articles were returned
    if (articles.length === 0) {
      const fallback = await axios.get(`${BASE}/everything`, {
        params: {
          apiKey: KEY,
          q: category,
          language: 'en',
          sortBy: 'publishedAt',
          pageSize: PAGE_SIZE,
          page,
        },
      });
      articles = fallback.data.articles;
      totalResults = fallback.data.totalResults;
    }

    return { articles, totalResults };
  } catch (error) {
    console.error('Error fetching news:', error);
    return { articles: [], totalResults: 0 };
  }
};
