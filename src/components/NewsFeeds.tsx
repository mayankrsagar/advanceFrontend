'use client';

import React, {
  useEffect,
  useState,
} from 'react';

import {
  Article,
  fetchHeadlines,
} from '@/services/news';

import NewsCard from './NewsCard';

const categories = ['technology', 'business', 'sports', 'health', 'entertainment'];
const PAGE_SIZE = 20;

const NewsFeed: React.FC = () => {
  const [category, setCategory] = useState(categories[0]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch headlines whenever category or page changes
  useEffect(() => {
    const loadArticles = async () => {
      setLoading(true);
      try {
        // Ensure fetchHeadlines returns { articles: Article[], totalResults: number }
        const { articles: fetchedArticles, totalResults: total } = await fetchHeadlines(category, page);
        setArticles(fetchedArticles);
        setTotalResults(total);
      } catch (error) {
        console.error('Failed to fetch headlines:', error);
      } finally {
        setLoading(false);
      }
    };

    loadArticles();
  }, [category, page]);

  const totalPages = Math.ceil(totalResults / PAGE_SIZE);

  return (
    <div className="space-y-4">
      <div className="flex space-x-2 overflow-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`px-3 py-1 rounded-full ${
              cat === category ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => {
              setCategory(cat);
              setPage(1);
            }}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-10">Loading...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {articles.map((article, idx) => (
              <NewsCard key={idx} article={article} />
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center space-x-4 mt-6">
            <button
              disabled={page === 1}
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Previous
            </button>

            <span>
              Page {page} of {totalPages || 1}
            </span>

            <button
              disabled={page === totalPages}
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default NewsFeed;
