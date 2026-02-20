import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import postcss from 'rollup-plugin-postcss';
import excludeDependenciesFromBundle from 'rollup-plugin-exclude-dependencies-from-bundle';

// 类型声明构建专用：忽略 CSS/SCSS 文件
const ignoreStylesPlugin = () => ({
  name: 'ignore-styles',
  load(id) {
    if (/\.(css|scss|sass|less)$/.test(id)) {
      return '';
    }
  },
});

const isProd = process.env.NODE_ENV === 'production';

const getBasePlugins = (options = {}) => [
  nodeResolve({
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  }),
  commonjs(),
  json(),
  excludeDependenciesFromBundle(),
  postcss({
    extract: options.extractCSS ?? false,
    modules: false,
    use: ['sass'],
    minimize: isProd,
    inject: options.injectCSS ?? true,
    sourceMap: !isProd,
  }),
];

const external = [
  'react',
  'react-dom',
  'react/jsx-runtime',
  /@company\//, // 内部包也作为外部依赖
];

const componentEntries = {
  button: 'src/component/Button/index.tsx',
  menu: 'src/component/Menu/index.ts',
  table: 'src/component/Table/index.tsx',
  form: 'src/component/Form/index.tsx',
  input: 'src/component/Input/index.ts',
  progress: 'src/component/Progress/index.tsx',
  pagination: 'src/component/Pagination/index.ts',
  upload: 'src/component/Upload/index.ts',
  icon: 'src/component/Icon/index.ts',
};

export default [
  // 1. 主入口 - CJS (包含类型声明)
  {
    input: 'src/index.tsx',
    output: {
      dir: 'dist',
      format: 'cjs',
      entryFileNames: 'index.js',
      exports: 'named',
      sourcemap: !isProd,
    },
    external,
    plugins: [
      typescript({
        tsconfig: './tsconfig.json',
        compilerOptions: {
          declaration: true,
          declarationMap: true,
          outDir: 'dist',
          target: 'es2018',
          module: 'esnext',
          jsx: 'react-jsx',
        },
        exclude: ['**/*.test.*', '**/*.stories.*'],
      }),
      ...getBasePlugins({ extractCSS: true, injectCSS: false }),
    ],
  },

  // 2. 主入口 - ESM
  {
    input: 'src/index.tsx',
    output: {
      dir: 'dist',
      format: 'es',
      entryFileNames: 'index.esm.js',
      sourcemap: !isProd,
    },
    external,
    plugins: [
      typescript({
        compilerOptions: {
          declaration: false,
          declarationMap: false,
          outDir: 'dist',
          target: 'es2018',
          module: 'esnext',
          jsx: 'react-jsx',
        },
      }),
      ...getBasePlugins({ extractCSS: false, injectCSS: false }),
    ],
  },

  // 3. 按需加载 - ESM 组件代码
  {
    input: componentEntries,
    output: {
      dir: 'dist',
      format: 'es',
      entryFileNames: '[name]/index.js',
      chunkFileNames: 'chunks/[name]-[hash].js',
      exports: 'named',
      sourcemap: !isProd,
    },
    external,
    plugins: [
      typescript({
        compilerOptions: {
          declaration: false,
          declarationMap: false,
          outDir: 'dist',
        },
      }),
      ...getBasePlugins({ extractCSS: false, injectCSS: false }),
    ],
  },

  // 4. 按需加载 - CJS 组件代码
  {
    input: componentEntries,
    output: {
      dir: 'dist',
      format: 'cjs',
      entryFileNames: '[name]/index.cjs.js',
      chunkFileNames: 'chunks/[name]-[hash].cjs.js',
      exports: 'named',
      sourcemap: !isProd,
    },
    external,
    plugins: [
      typescript({
        compilerOptions: {
          declaration: false,
          declarationMap: false,
          outDir: 'dist',
        },
      }),
      ...getBasePlugins({ extractCSS: false, injectCSS: true }),
    ],
  },

  // 5. 按需加载 - 类型声明文件（单独）
  {
    input: componentEntries,
    output: {
      dir: 'dist',
      format: 'es',
      entryFileNames: '[name]/index.d.ts',
    },
    plugins: [
      ignoreStylesPlugin(),
      typescript({
        compilerOptions: {
          declaration: true,
          emitDeclarationOnly: true,
          outDir: 'dist',
          target: 'es2018',
          module: 'esnext',
          jsx: 'react-jsx',
        },
        exclude: ['**/*.test.*', '**/*.stories.*'],
      }),
    ],
    external,
  },
];
