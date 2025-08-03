import React from 'react';
import { motion } from 'framer-motion';
import { 
  Code, 
  Zap, 
  Palette, 
  FileText, 
  ArrowLeft,
  Github,
  ExternalLink,
  Star,
  Heart
} from 'lucide-react';

export default function AboutPage() {
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

  const technologies = [
    { name: "React 19", icon: Zap, color: "from-blue-500 to-cyan-500", description: "최신 React 버전" },
    { name: "Vite", icon: Zap, color: "from-purple-500 to-pink-500", description: "빠른 빌드 도구" },
    { name: "Tailwind CSS", icon: Palette, color: "from-teal-500 to-blue-500", description: "유틸리티 CSS 프레임워크" },
    { name: "Generouted", icon: FileText, color: "from-green-500 to-emerald-500", description: "파일 기반 라우팅" },
    { name: "PostCSS", icon: Code, color: "from-orange-500 to-red-500", description: "CSS 전처리기" },
    { name: "Framer Motion", icon: Heart, color: "from-pink-500 to-rose-500", description: "애니메이션 라이브러리" }
  ];

  const features = [
    { title: "파일 기반 라우팅", description: "src/pages/ 디렉토리 구조가 자동으로 URL로 변환됩니다." },
    { title: "반응형 디자인", description: "모든 디바이스에서 완벽하게 작동하는 반응형 레이아웃." },
    { title: "모던 UI/UX", description: "최신 디자인 트렌드와 사용자 경험을 반영한 인터페이스." },
    { title: "빠른 개발 환경", description: "Hot Module Replacement과 빠른 빌드로 효율적인 개발." },
    { title: "애니메이션", description: "부드러운 애니메이션과 인터랙션으로 생동감 있는 웹사이트." },
    { title: "접근성", description: "웹 접근성 가이드라인을 준수하는 사용자 친화적 디자인." }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
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
                <Star className="w-5 h-5 text-purple-500" />
                <span className="text-sm font-medium text-gray-700">프로젝트 소개</span>
              </motion.div>
              
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-800 via-pink-800 to-indigo-800 bg-clip-text text-transparent mb-6">
                프로젝트 소개 📖
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
                이 프로젝트는 최신 웹 기술을 활용하여 만들어졌습니다.
                <br />
                <span className="text-purple-600 font-medium">모던하고 아름다운</span> 웹 경험을 제공합니다.
              </p>
            </motion.div>
          </motion.div>

          {/* Technologies Section */}
          <motion.div 
            className="mb-16"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h2 variants={itemVariants} className="text-3xl font-bold text-center text-gray-800 mb-12">
              🛠️ 사용 기술
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {technologies.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  variants={itemVariants}
                  className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-white/20"
                  whileHover={{ y: -5 }}
                >
                  <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br ${tech.color} rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <tech.icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {tech.name}
                  </h3>
                  
                  <p className="text-sm text-gray-600">
                    {tech.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Features Section */}
          <motion.div 
            className="mb-16"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h2 variants={itemVariants} className="text-3xl font-bold text-center text-gray-800 mb-12">
              ✨ 주요 기능
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  variants={itemVariants}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-white/20"
                  whileHover={{ y: -5 }}
                >
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Stats Section */}
          <motion.div 
            className="mb-16"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-8 text-white text-center">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <div className="text-4xl font-bold mb-2">6+</div>
                  <div className="text-purple-100">사용 기술</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">100%</div>
                  <div className="text-purple-100">반응형</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">⚡</div>
                  <div className="text-purple-100">빠른 성능</div>
                </div>
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
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-2xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
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