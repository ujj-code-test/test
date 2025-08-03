import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Calendar, 
  Clock, 
  User, 
  ArrowRight,
  ArrowLeft,
  Tag,
  Eye,
  Heart
} from 'lucide-react';

export default function BlogPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const blogPosts = [
    {
      id: 'react-19',
      title: 'React 19 새로운 기능들',
      excerpt: 'React 19에서 추가된 새로운 기능들을 살펴봅니다. Concurrent Features, Server Components, 그리고 더 많은 개선사항들을 확인해보세요.',
      author: '개발자',
      date: '2024-01-15',
      readTime: '5분',
      category: 'React',
      views: 1234,
      likes: 89,
      color: 'from-blue-500 to-cyan-500',
      tags: ['React', 'JavaScript', 'Frontend']
    },
    {
      id: 'tailwind-v4',
      title: 'Tailwind CSS v4 소개',
      excerpt: 'Tailwind CSS v4의 새로운 기능들을 알아봅니다. 더 빠른 빌드, 새로운 유틸리티, 그리고 개선된 개발자 경험을 경험해보세요.',
      author: '디자이너',
      date: '2024-01-10',
      readTime: '7분',
      category: 'CSS',
      views: 987,
      likes: 67,
      color: 'from-teal-500 to-emerald-500',
      tags: ['CSS', 'Tailwind', 'Design']
    },
    {
      id: 'vite-performance',
      title: 'Vite로 성능 최적화하기',
      excerpt: 'Vite를 사용하여 React 애플리케이션의 성능을 최적화하는 방법을 알아봅니다. 빌드 시간 단축과 번들 크기 최적화 팁을 공유합니다.',
      author: '성능 전문가',
      date: '2024-01-05',
      readTime: '8분',
      category: 'Performance',
      views: 756,
      likes: 45,
      color: 'from-purple-500 to-pink-500',
      tags: ['Vite', 'Performance', 'Build']
    },
    {
      id: 'typescript-tips',
      title: 'TypeScript 실전 팁',
      excerpt: 'TypeScript를 더 효과적으로 사용하는 실전 팁들을 공유합니다. 타입 안전성을 높이면서도 개발 생산성을 유지하는 방법을 알아보세요.',
      author: 'TypeScript 전문가',
      date: '2024-01-01',
      readTime: '6분',
      category: 'TypeScript',
      views: 1123,
      likes: 92,
      color: 'from-indigo-500 to-blue-500',
      tags: ['TypeScript', 'JavaScript', 'Development']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-red-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <motion.div
                className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg mb-6"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FileText className="w-5 h-5 text-orange-500" />
                <span className="text-sm font-medium text-gray-700">기술 블로그</span>
              </motion.div>
              
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-orange-800 via-red-800 to-pink-800 bg-clip-text text-transparent mb-6">
                블로그 📝
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                최신 기술과 개발 이야기를 공유합니다.
                <br />
                <span className="text-orange-600 font-medium">유용한 정보</span>와 <span className="text-red-600 font-medium">실전 팁</span>을 만나보세요.
              </p>
            </motion.div>
          </motion.div>

          {/* Blog Posts Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.id}
                variants={itemVariants}
                className="group bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-white/20"
                whileHover={{ y: -5 }}
              >
                {/* Category Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${post.color} text-white`}>
                    {post.category}
                  </span>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      <span>{post.views}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      <span>{post.likes}</span>
                    </div>
                  </div>
                </div>

                {/* Post Content */}
                <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-gray-900 transition-colors">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {post.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {post.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                    >
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Meta Information */}
                <div className="flex items-center justify-between mb-6 text-sm text-gray-500">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </div>

                {/* Read More Button */}
                <motion.a
                  href={`/blog/${post.id}`}
                  className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium group-hover:gap-3 transition-all duration-300"
                  whileHover={{ x: 5 }}
                >
                  자세히 보기
                  <ArrowRight className="w-4 h-4" />
                </motion.a>
              </motion.article>
            ))}
          </motion.div>

          {/* Newsletter Signup */}
          <motion.div 
            className="mb-16"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="bg-gradient-to-r from-orange-600 to-red-600 rounded-3xl p-8 text-white text-center">
              <h3 className="text-2xl font-bold mb-4">새로운 글 알림 받기</h3>
              <p className="text-orange-100 mb-6 max-w-2xl mx-auto">
                최신 기술 글과 개발 팁을 이메일로 받아보세요. 
                스팸은 절대 보내지 않습니다!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="이메일 주소"
                  className="flex-1 px-4 py-3 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <button className="bg-white text-orange-600 px-6 py-3 rounded-xl font-medium hover:bg-orange-50 transition-colors">
                  구독하기
                </button>
              </div>
            </motion.div>
          </motion.div>

          {/* Back to Home */}
          <motion.div 
            className="text-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.a
              href="/"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-600 to-red-600 text-white px-8 py-4 rounded-2xl hover:from-orange-700 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              variants={itemVariants}
            >
              <ArrowLeft className="w-5 h-5" />
              홈으로 돌아가기
            </motion.a>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 