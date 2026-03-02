import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
  stories: ['../packages/components/src/**/*.mdx', '../packages/components/src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/preset-create-react-app',
    '@storybook/addon-onboarding',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  webpackFinal: async (config) => {
    // Disable eslint in storybook - filter out eslint-loader
    config.module?.rules?.forEach((rule) => {
      if (rule.use && Array.isArray(rule.use)) {
        rule.use = rule.use.filter((use) => {
          if (typeof use === 'object' && use.loader === 'eslint-loader') {
            return false;
          }
          return true;
        });
      }
    });
    // Remove ESLintWebpackPlugin
    config.plugins = config.plugins?.filter((plugin) => {
      const pluginName = plugin.constructor.name;
      return !pluginName.includes('ESLintWebpackPlugin') && !pluginName.includes('ESLintPlugin');
    });
    return config;
  },
};
export default config;
