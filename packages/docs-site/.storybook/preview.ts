import type { Preview } from '@storybook/react';
// 导入组件样式 - 使用源代码目录
import '../../components/src/style/index.scss';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
