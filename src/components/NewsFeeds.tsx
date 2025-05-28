'use client';

import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  Article,
  fetchHeadlines,
} from '@/services/news';

import NewsCard from './NewsCard';

const categories = ['technology','business','sports','health','entertainment'];

const NewsFeed: React.FC = () => {
  const [category, setCategory] = useState(categories[0]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [page, setPage] = useState(1);
  const loader = useRef<HTMLDivElement>(null);

  const loadMore = useCallback(async () => {
    const newArticles = await fetchHeadlines(category, page);
    setArticles(prev => [...prev, ...newArticles]);
  }, [category, page]);

  useEffect(() => {
    setArticles([]);
    setPage(1);
  }, [category]);

  useEffect(() => {
    loadMore();
  }, [loadMore]);

  // IntersectionObserver to increment page
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) setPage(p => p + 1);
    });
    if (loader.current) obs.observe(loader.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex space-x-2 overflow-auto pb-2">
        {categories.map(cat => (
          <button
            key={cat}
            className={`px-3 py-1 rounded-full ${
              cat === category
                ? 'bg-primary text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => setCategory(cat)}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {articles.map((art, i) => (
          <NewsCard key={i} article={art} />
        ))}
      </div>

      <div ref={loader} className="h-10" />
    </div>
  );
};

export default NewsFeed;
