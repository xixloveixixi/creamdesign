#!/usr/bin/env node

import {rollup} from 'rollup';
import configs from '../rollup.config.js';

const configList = Array.isArray(configs) ? configs : [configs];

try {
  for (const [index, config] of configList.entries()) {
    const outputs = Array.isArray(config.output)
      ? config.output
      : [config.output];
    let bundle;

    try {
      bundle = await rollup({
        ...config,
        output: undefined,
      });

      for (const output of outputs) {
        await bundle.write(output);
      }
    } finally {
      if (bundle) {
        await bundle.close();
      }
    }

    console.log(`Rollup 配置 ${index + 1}/${configList.length} 构建完成`);
  }

  process.exit(0);
} catch (error) {
  console.error(error);
  process.exit(1);
}
