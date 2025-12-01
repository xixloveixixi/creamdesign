import React from 'react';

function App() {
  return (
    <div className="app-container bg-neutral-50 min-h-screen">
      <header className="bg-primary p-6 text-center">
        <h1 className="font-size-h1 text-neutral-900 mb-2">CreamDesign</h1>
        <p className="text-neutral-800">现代化的设计系统示例</p>
      </header>
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <section className="mb-10">
          <h2 className="font-size-h2 text-heading mb-4">欢迎使用 CreamDesign</h2>
          <p className="text-body mb-6">
            这是一个基于柔和奶油色调的现代化设计系统示例。
            该系统包含完整的色彩体系、字体系统和组件样式。
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="card">
              <h3 className="font-size-h3 mb-2">设计系统特点</h3>
              <ul className="list-disc pl-5 text-body">
                <li>柔和的奶油色调主色系</li>
                <li>完整的字体系统</li>
                <li>灵活的组件样式</li>
                <li>响应式设计支持</li>
              </ul>
            </div>
            
            <div className="card card-hover">
              <h3 className="font-size-h3 mb-2">快速开始</h3>
              <p className="text-body mb-4">使用我们提供的工具类快速构建界面</p>
              <div className="flex gap-2">
                <button className="btn btn-primary">主要按钮</button>
                <button className="btn btn-secondary">次要按钮</button>
                <button className="btn btn-outline">描边按钮</button>
              </div>
            </div>
          </div>
        </section>
        
        <section>
          <h2 className="font-size-h2 text-heading mb-4">颜色展示</h2>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
            {['bg-primary-100', 'bg-primary-300', 'bg-primary-500', 'bg-primary-700', 'bg-primary-900',
              'bg-secondary-blue-300', 'bg-secondary-pink-300', 'bg-secondary-green-300',
              'bg-success', 'bg-warning', 'bg-error', 'bg-info',
              'bg-neutral-200', 'bg-neutral-400', 'bg-neutral-600'].map((bgClass, index) => (
              <div key={index} className={`${bgClass} p-4 rounded text-center text-sm`}>
                <div className="w-full h-16 mb-2 rounded opacity-80 bg-neutral-900"></div>
                {bgClass.replace('bg-', '')}
              </div>
            ))}
          </div>
        </section>
      </main>
      
      <footer className="bg-neutral-100 p-6 text-center text-muted">
        <p>&copy; {new Date().getFullYear()} CreamDesign 设计系统</p>
      </footer>
    </div>
  );
}

export default App;