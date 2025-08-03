import React from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Zap, 
  Palette, 
  Code, 
  Database, 
  BarChart3,
  ArrowRight,
  Star,
  Heart,
  TrendingUp
} from 'lucide-react';

export default function HomePage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const features = [
    {
      icon: Zap,
      title: "빠른 성능",
      description: "Vite 기반의 초고속 빌드와 HMR",
      gradient: "from-yellow-400 to-orange-500",
      delay: 0.1
    },
    {
      icon: Palette,
      title: "아름다운 UI",
      description: "Tailwind CSS로 구현된 모던 디자인",
      gradient: "from-pink-400 to-rose-500",
      delay: 0.2
    },
    {
      icon: Code,
      title: "최신 기술",
      description: "React 19와 최신 웹 기술 스택",
      gradient: "from-blue-400 to-cyan-500",
      delay: 0.3
    },
    {
      icon: Database,
      title: "강력한 기능",
      description: "AG Grid와 Chart.js로 데이터 시각화",
      gradient: "from-purple-400 to-indigo-500",
      delay: 0.4
    }
  ];

  const navigationCards = [
    {
      title: "소개",
      description: "프로젝트 소개",
      href: "/about",
      icon: Star,
      gradient: "from-emerald-400 to-teal-500"
    },
    {
      title: "블로그",
      description: "기술 블로그",
      href: "/blog",
      icon: TrendingUp,
      gradient: "from-violet-400 to-purple-500"
    },
    {
      title: "연락처",
      description: "문의하기",
      href: "/contact",
      icon: Heart,
      gradient: "from-rose-400 to-pink-500"
    },
    {
      title: "React 19",
      description: "최신 React",
      href: "/blog/react-19",
      icon: Zap,
      gradient: "from-cyan-400 to-blue-500"
    },
    {
      title: "Ant Design",
      description: "UI 컴포넌트",
      href: "/antd-demo",
      icon: Palette,
      gradient: "from-orange-400 to-red-500"
    },
    {
      title: "AG Grid",
      description: "데이터 그리드",
      href: "/ag-grid-demo",
      icon: Database,
      gradient: "from-indigo-400 to-purple-500"
    },
    {
      title: "Chart.js",
      description: "데이터 시각화",
      href: "/chart-demo",
      icon: BarChart3,
      gradient: "from-teal-400 to-emerald-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-950 text-white overflow-hidden relative">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-indigo-900/40 to-black"></div>
        
        {/* Floating Elements with improved animations */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-purple-400/30 to-pink-400/30 rounded-full blur-3xl animate-pulse opacity-80"></div>
        <div className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-gradient-to-r from-blue-400/30 to-cyan-400/30 rounded-full blur-3xl animate-pulse opacity-70" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 rounded-full blur-3xl animate-pulse opacity-60" style={{animationDelay: '4s'}}></div>
        <div className="absolute top-10 right-1/3 w-64 h-64 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-full blur-3xl animate-pulse opacity-50" style={{animationDelay: '6s'}}></div>
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      <div className="relative z-10 w-full">
        {/* Header */}
        <motion.div 
          className="text-center pt-20 pb-16 px-4 w-full mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="mb-8">
            <motion.div
              className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-xl px-8 py-4 rounded-full border border-white/10 mb-12 shadow-2xl"
              whileHover={{ scale: 1.08, backgroundColor: 'rgba(255,255,255,0.1)', y: -2 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <Sparkles className="w-6 h-6 text-yellow-300 animate-pulse" />
              <span className="text-lg font-semibold text-white/95 tracking-wide">React + Vite + Tailwind</span>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
            </motion.div>
            
            <h1 className="text-7xl md:text-9xl font-black mb-12 leading-[0.9] tracking-tight">
              <motion.span 
                className="block bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent drop-shadow-2xl"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                환영합니다
              </motion.span>
              <motion.div 
                className="flex items-center justify-center mt-6"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6, type: "spring", bounce: 0.4 }}
              >
                <span className="text-6xl md:text-8xl mr-4">🚀</span>
                <span className="text-5xl md:text-7xl bg-gradient-to-r from-purple-300 via-pink-300 to-cyan-300 bg-clip-text text-transparent font-bold">
                  Dev Space
                </span>
              </motion.div>
            </h1>
            
            <motion.p 
              className="text-2xl md:text-3xl text-white/80 mb-16 max-w-5xl mx-auto leading-relaxed font-light"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <span className="bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent font-normal">
                차세대 웹 기술로 만든 
              </span>
              <span className="bg-gradient-to-r from-purple-300 via-pink-300 to-cyan-300 bg-clip-text text-transparent font-bold"> 
                놀라운 개발 경험
              </span>
              <br />
              <span className="text-xl md:text-2xl text-white/60 mt-4 block">
                ✨ 아름다운 디자인 • 🚀 빛나는 성능 • 💫 혁신적인 UX
              </span>
            </motion.p>
          </motion.div>

          {/* Features Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20 max-w-6xl mx-auto w-full justify-items-center"
            variants={containerVariants}
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                className="group relative"
                whileHover={{ y: -15, scale: 1.05 }}
                transition={{ delay: feature.delay, duration: 0.3, ease: "easeOut" }}
              >
                <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 group-hover:bg-white/10 group-hover:border-white/25 transition-all duration-500 shadow-2xl group-hover:shadow-3xl overflow-hidden">
                  {/* Glow effect */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`}></div>
                  
                  <div className="relative z-10">
                    <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-white/95 transition-colors">
                      {feature.title}
                    </h3>
                    
                    <p className="text-white/70 leading-relaxed group-hover:text-white/80 transition-colors">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Navigation Cards */}
        <motion.div 
          className="px-4 pb-20 w-full"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="text-center mb-16 w-full">
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight w-full">
              <span className="bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
                탐험해보세요
              </span>
            </h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto w-full">
              다양한 페이지와 기능들을 둘러보며 놀라운 경험을 시작해보세요
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto justify-items-center place-items-center">
            {navigationCards.map((card, index) => (
              <motion.a
                key={card.title}
                href={card.href}
                className="group relative block w-full max-w-sm mx-auto"
                variants={itemVariants}
                whileHover={{ y: -12, scale: 1.03, rotateY: 5 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <div className="relative overflow-hidden bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 group-hover:border-white/30 transition-all duration-500 shadow-2xl group-hover:shadow-3xl h-full">
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-15 transition-opacity duration-500`}></div>
                  
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                  
                  <div className="relative z-10 text-center h-full flex flex-col">
                    <div className="mb-8">
                      <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${card.gradient} rounded-3xl mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-2xl mx-auto`}>
                        <card.icon className="w-10 h-10 text-white" />
                      </div>
                    </div>
                    
                    <div className="flex-grow flex flex-col justify-between">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-white/95 transition-colors leading-tight">
                          {card.title}
                        </h3>
                        
                        <p className="text-white/70 mb-8 group-hover:text-white/80 transition-colors leading-relaxed">
                          {card.description}
                        </p>
                      </div>
                      
                      <div className="flex items-center justify-center text-white/60 group-hover:text-white/80 transition-all duration-300">
                        <span className="text-lg font-semibold">자세히 보기</span>
                        <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-2 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div 
          className="text-center pb-16 px-4 w-full"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            variants={itemVariants} 
            className="bg-gradient-to-r from-white/5 via-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-12 border border-white/20 max-w-5xl mx-auto shadow-2xl"
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-8">
              <div className="inline-flex items-center gap-3 bg-white/10 px-6 py-3 rounded-full mb-6">
                <Code className="w-5 h-5 text-purple-300" />
                <span className="text-white/90 font-medium">파일 기반 라우팅</span>
              </div>
            </div>
            
            <h3 className="text-3xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-purple-300 to-cyan-300 bg-clip-text text-transparent">
                자동 생성된 페이지들
              </span>
            </h3>
            
            <p className="text-xl text-white/80 mb-6 leading-relaxed">
              혁신적인 파일 기반 라우팅 시스템으로 개발 생산성을 극대화했습니다
            </p>
            
            <div className="inline-flex items-center gap-3 bg-black/30 px-6 py-4 rounded-2xl border border-white/20">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <code className="text-lg font-mono text-white/90 tracking-wider">src/pages/</code>
              <ArrowRight className="w-4 h-4 text-white/60" />
              <span className="text-white/80 font-medium">URL 구조</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
} 