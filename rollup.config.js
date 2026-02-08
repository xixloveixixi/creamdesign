import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import postcss from 'rollup-plugin-postcss';
import excludeDependenciesFromBundle from 'rollup-plugin-exclude-dependencies-from-bundle';

// 共享的基础插件配置（不包含 TypeScript）
const getBasePlugins = () => [
  nodeResolve({
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  }),
  commonjs(),
  json(),
  excludeDependenciesFromBundle(),
  postcss({
    extract: true, // 提取 CSS 到单独文件
    modules: false, // 全局 CSS
    use: ['sass'],
    minimize: false, // 开发时不压缩
  }),
];

// TypeScript 插件配置
const getTypeScriptPlugin = (options = {}) => {
  const compilerOptions = {
    declaration: options.declaration !== false,
    declarationMap: options.declarationMap !== false,
    jsx: 'react-jsx',
    emitDeclarationOnly: false,
    module: 'esnext',
    target: 'es5',
    moduleResolution: 'node',
    esModuleInterop: true,
    allowSyntheticDefaultImports: true,
  };

  // 只有在使用 dir 输出时才设置 outDir
  if (options.outDir) {
    compilerOptions.outDir = options.outDir;
  }

  return typescript({
    tsconfig: './tsconfig.json',
    compilerOptions,
    exclude: [
      '**/*.test.ts',
      '**/*.test.tsx',
      '**/*.stories.ts',
      '**/*.stories.tsx',
    ],
    include: ['src/**/*.ts', 'src/**/*.tsx'],
  });
};

// 外部依赖
const external = ['react', 'react-dom', 'react/jsx-runtime'];

export default [
  // 主入口 - 整体打包 (CJS)
  {
    input: 'src/index.tsx',
    output: {
      dir: 'dist',
      format: 'cjs',
      entryFileNames: 'index.js',
      exports: 'named',
    },
    external,
    plugins: [getTypeScriptPlugin({ outDir: 'dist' }), ...getBasePlugins()],
  },
  // 主入口 - 整体打包 (ESM)
  {
    input: 'src/index.tsx',
    output: {
      dir: 'dist',
      format: 'es',
      entryFileNames: 'index.esm.js',
    },
    external,
    plugins: [
      getTypeScriptPlugin({
        declaration: false,
        declarationMap: false,
        outDir: 'dist',
      }),
      ...getBasePlugins(),
    ],
  },
  // 按需加载 - 每个组件单独打包 (ESM)
  {
    input: {
      button: 'src/component/Button/index.tsx',
      menu: 'src/component/Menu/index.ts',
      table: 'src/component/Table/index.tsx',
      form: 'src/component/Form/index.tsx',
      input: 'src/component/Input/index.ts',
      progress: 'src/component/Progress/index.tsx',
      pagination: 'src/component/Pagination/index.ts',
      upload: 'src/component/Upload/index.ts',
      icon: 'src/component/Icon/index.ts',
    },
    output: {
      dir: 'dist',
      format: 'es',
      entryFileNames: '[name]/index.esm.js',
      chunkFileNames: 'chunks/[name]-[hash].js',
      exports: 'named',
    },
    external,
    plugins: [getTypeScriptPlugin({ outDir: 'dist' }), ...getBasePlugins()],
  },
  // 按需加载 - 每个组件单独打包 (CJS)
  {
    input: {
      button: 'src/component/Button/index.tsx',
      menu: 'src/component/Menu/index.ts',
      table: 'src/component/Table/index.tsx',
      form: 'src/component/Form/index.tsx',
      input: 'src/component/Input/index.ts',
      progress: 'src/component/Progress/index.tsx',
      pagination: 'src/component/Pagination/index.ts',
      upload: 'src/component/Upload/index.ts',
      icon: 'src/component/Icon/index.ts',
    },
    output: {
      dir: 'dist',
      format: 'cjs',
      entryFileNames: '[name]/index.js',
      chunkFileNames: 'chunks/[name]-[hash].cjs.js',
      exports: 'named',
    },
    external,
    plugins: [
      getTypeScriptPlugin({
        declaration: false,
        declarationMap: false,
        outDir: 'dist',
      }),
      ...getBasePlugins(),
    ],
  },
];
