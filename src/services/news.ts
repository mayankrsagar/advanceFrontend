// services/news.ts

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


export const fetchHeadlines = async (
  category: string,
  page: number
): Promise<Article[]> => {
  try {
    // First try country-specific top headlines
    const res = await axios.get(`${BASE}/top-headlines`, {
      params: {
        apiKey: KEY,
        category,
        pageSize: PAGE_SIZE,
        page,
        country: 'in',
      },
    });
    const articles = res.data.articles as Article[];

    if (articles.length > 0) {
      return articles;
    }

    const fallback = await axios.get(`${BASE}/everything`, {
      params: {
        apiKey: KEY,
        q: category,
        pageSize: PAGE_SIZE,
        page,
        sortBy: 'publishedAt',
      },
    });
    return fallback.data.articles as Article[];
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
};
