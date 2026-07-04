import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import postcss from 'rollup-plugin-postcss';
import excludeDependenciesFromBundle from 'rollup-plugin-exclude-dependencies-from-bundle';
import * as sass from 'sass';
import { fileURLToPath, pathToFileURL } from 'node:url';

const isProd = process.env.NODE_ENV === 'production';

const modernSassLoader = {
  name: 'sass',
  test: /\.(sass|scss)$/,
  async process({ code }) {
    const options = {
      url: pathToFileURL(this.id),
      syntax: /\.sass$/.test(this.id) ? 'indented' : 'scss',
      sourceMap: Boolean(this.sourceMap),
      loadPaths: this.options.loadPaths ?? this.options.includePaths ?? [],
    };

    if (this.options.style) {
      options.style = this.options.style;
    }
    if (this.options.importers) {
      options.importers = this.options.importers;
    }
    if (this.options.quietDeps !== undefined) {
      options.quietDeps = this.options.quietDeps;
    }
    if (this.options.silenceDeprecations) {
      options.silenceDeprecations = this.options.silenceDeprecations;
    }

    const result = sass.compileString(code, options);

    for (const loadedUrl of result.loadedUrls) {
      if (loadedUrl.protocol === 'file:') {
        this.dependencies.add(fileURLToPath(loadedUrl));
      }
    }

    return {
      code: result.css,
      map: result.sourceMap,
    };
  },
};

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
    use: [['sass', { loadPaths: ['src'] }]],
    loaders: [modernSassLoader],
    minimize: isProd,
    inject: options.injectCSS ?? true,
    sourceMap: !isProd,
  }),
];

const external = ['react', 'react-dom', 'react/jsx-runtime', /@company\//];

const componentEntries = {
  button: 'src/Button/index.tsx',
  'config-provider': 'src/ConfigProvider/index.ts',
  menu: 'src/Menu/index.ts',
  table: 'src/Table/index.tsx',
  form: 'src/Form/index.tsx',
  input: 'src/Input/index.ts',
  progress: 'src/Progress/index.tsx',
  pagination: 'src/Pagination/index.ts',
  upload: 'src/Upload/index.ts',
  icon: 'src/Icon/index.ts',
  card: 'src/Card/index.tsx',
  timeline: 'src/Timeline/index.tsx',
  tag: 'src/Tag/index.ts',
  message: 'src/Message/index.ts',
};

export default [
  // 1. 主入口 - CJS (包含类型声明)
  {
    input: 'src/index.tsx',
    output: {
      dir: 'dist',
      format: 'cjs',
      entryFileNames: 'index.cjs',
      exports: 'named',
      sourcemap: !isProd,
    },
    external,
    plugins: [
      typescript({
        tsconfig: './tsconfig.build.json',
        compilerOptions: {
          declaration: true,
          declarationMap: true,
          outDir: 'dist',
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
      entryFileNames: 'index.mjs',
      sourcemap: !isProd,
    },
    external,
    plugins: [
      typescript({
        tsconfig: './tsconfig.build.json',
        compilerOptions: {
          declaration: false,
          declarationMap: false,
          outDir: 'dist',
        },
        exclude: ['**/*.test.*', '**/*.stories.*'],
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
      entryFileNames: '[name]/index.mjs',
      chunkFileNames: 'chunks/[name]-[hash].mjs',
      exports: 'named',
      sourcemap: !isProd,
    },
    external,
    plugins: [
      typescript({
        tsconfig: './tsconfig.build.json',
        compilerOptions: {
          declaration: false,
          declarationMap: false,
          outDir: 'dist',
        },
        exclude: ['**/*.test.*', '**/*.stories.*'],
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
      entryFileNames: '[name]/index.cjs',
      chunkFileNames: 'chunks/[name]-[hash].cjs',
      exports: 'named',
      sourcemap: !isProd,
    },
    external,
    plugins: [
      typescript({
        tsconfig: './tsconfig.build.json',
        compilerOptions: {
          declaration: false,
          declarationMap: false,
          outDir: 'dist',
        },
        exclude: ['**/*.test.*', '**/*.stories.*'],
      }),
      ...getBasePlugins({ extractCSS: false, injectCSS: true }),
    ],
  },
];
