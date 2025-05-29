import axios from 'axios';
// src/app/api/news/route.ts
import { NextResponse } from 'next/server';

const BASE = 'https://newsapi.org/v2';
const KEY  = process.env.NEWS_API_KEY;  
const PAGE_SIZE = 20;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category') || 'technology';
  const page     = searchParams.get('page')     || '1';

  try {
    // 1) Top headlines
    const top = await axios.get(`${BASE}/top-headlines`, {
      params: { apiKey: KEY, category, country: 'in', pageSize: PAGE_SIZE, page },
    });
    let articles = top.data.articles;

    // 2) Fallback to /everything
    if (articles.length === 0) {
      const everything = await axios.get(`${BASE}/everything`, {
        params: {
          apiKey: KEY,
          q: category,
          language: 'en',
          sortBy: 'publishedAt',
          pageSize: PAGE_SIZE,
          page,
        },
      });
      articles = everything.data.articles;
    }

    return NextResponse.json(articles);
  } catch (err: unknown) {
    if(err instanceof Error)
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 });
  }
}
