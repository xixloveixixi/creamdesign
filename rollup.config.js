import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import postcss from 'rollup-plugin-postcss';
import excludeDependenciesFromBundle from 'rollup-plugin-exclude-dependencies-from-bundle';
const config = {
  input: 'src/index.tsx',
  output: {
    file: 'dist/index.es.js',
    format: 'es',
  },
  plugins: [
    // TypeScript 插件应该在其他插件之前运行
    typescript({
      tsconfig: 'tsconfig.json',
      compilerOptions: {
        declaration: true,
        declarationMap: true,
        jsx: 'react-jsx',
        outDir: 'dist', // 必须与 Rollup 输出文件在同一目录
        noEmit: false, // 允许生成声明文件
      },
      exclude: ['src/**/*.test.tsx', 'src/**/*.stories.tsx'],
      // 确保正确处理 .d.ts 文件
      include: ['src/**/*.ts', 'src/**/*.tsx', 'src/**/*.d.ts'],
    }),
    nodeResolve({
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
    }),
    commonjs(),
    json(),
    excludeDependenciesFromBundle(),
    postcss({
      extract: true, // 将 CSS 提取到单独的文件
      minimize: false, // 不压缩（开发时）
      use: ['sass'], // 使用 sass 处理器
    }),
  ],
};

export default config;
