'use client';

import React from 'react';

import { Article } from '@/services/news';

const NewsCard: React.FC<{ article: Article }> = ({ article }) => (
  <a
    href={article.url}
    target="_blank"
    rel="noopener noreferrer"
    className="block bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition p-4"
  >
    {article.urlToImage && (
      <img
      width={100}
      height={100}
        src={article.urlToImage}
        alt={article.title}
        className="w-full h-40 object-cover"
      />
    )}
    <h3 className="mt-2 font-semibold text-lg text-primary">
      {article.title}
    </h3>
    {article.description && (
      <p className="text-sm text-gray-600 mt-1 line-clamp-3">
        {article.description}
      </p>
    )}
    <p className="text-xs text-gray-400 mt-2">
      {new Date(article.publishedAt).toLocaleString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })}
    </p>
  </a>
);

export default NewsCard;
