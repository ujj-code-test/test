import React from 'react';
import { useParams } from 'react-router-dom';

export default function BlogPostPage() {
  const { slug } = useParams();

  const posts = {
    'react-19': {
      title: 'React 19 새로운 기능들',
      content: 'React 19에서는 많은 새로운 기능들이 추가되었습니다. 이번 포스트에서는 주요 변경사항들을 살펴보겠습니다.',
      author: '개발자',
      date: '2024-01-15'
    },
    'tailwind-v4': {
      title: 'Tailwind CSS v4 소개',
      content: 'Tailwind CSS v4에서는 PostCSS 플러그인이 별도 패키지로 분리되었고, 더 나은 성능을 제공합니다.',
      author: '디자이너',
      date: '2024-01-10'
    }
  };

  const post = posts[slug] || {
    title: '포스트를 찾을 수 없습니다',
    content: '요청하신 블로그 포스트가 존재하지 않습니다.',
    author: '',
    date: ''
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 py-12">
      <div className="max-w-3xl mx-auto px-6">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {post.title}
          </h1>
          
          {post.author && (
            <div className="flex items-center text-gray-600 mb-6">
              <span>작성자: {post.author}</span>
              {post.date && (
                <>
                  <span className="mx-2">•</span>
                  <span>{post.date}</span>
                </>
              )}
            </div>
          )}
          
          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 leading-relaxed">
              {post.content}
            </p>
          </div>
        </div>
        
        <div className="text-center mt-8 space-x-4">
          <a
            href="/blog"
            className="inline-block bg-yellow-600 text-white px-6 py-3 rounded-lg hover:bg-yellow-700 transition-colors"
          >
            블로그 목록
          </a>
          <a
            href="/"
            className="inline-block bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
          >
            홈으로
          </a>
        </div>
      </div>
    </div>
  );
} 