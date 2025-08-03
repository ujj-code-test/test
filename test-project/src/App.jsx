import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/index';
import AboutPage from './pages/about';
import ContactPage from './pages/contact';
import BlogPage from './pages/blog';
import BlogPostPage from './pages/blog/[slug]';
import AntdDemoPage from './pages/antd-demo';
import AgGridDemoPage from './pages/ag-grid-demo';
import ChartDemoPage from './pages/chart-demo';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/antd-demo" element={<AntdDemoPage />} />
        <Route path="/ag-grid-demo" element={<AgGridDemoPage />} />
        <Route path="/chart-demo" element={<ChartDemoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
