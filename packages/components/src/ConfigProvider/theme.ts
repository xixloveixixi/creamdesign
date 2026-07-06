import type { CSSProperties } from 'react';

export interface GlobalToken {
  colorPrimary: string;
  colorPrimaryHover: string;
  colorPrimaryActive: string;
  colorText: string;
  colorTextSecondary: string;
  colorTextPlaceholder: string;
  colorTextDisabled: string;
  colorBorder: string;
  colorBgContainer: string;
  colorBgElevated: string;
  colorBgDisabled: string;
  colorSuccess: string;
  colorSuccessBg: string;
  colorSuccessBorder: string;
  colorWarning: string;
  colorWarningBg: string;
  colorWarningBorder: string;
  colorError: string;
  colorErrorBg: string;
  colorErrorBorder: string;
  colorInfo: string;
  colorInfoBg: string;
  colorInfoBorder: string;
  borderRadius: number | string;
  boxShadow: string;
  controlFocusShadow: string;
}

export interface ButtonToken {
  colorPrimary?: string;
  colorPrimaryHover?: string;
  colorPrimaryActive?: string;
  borderRadius?: number | string;
}

export interface ComponentToken {
  Button?: ButtonToken;
}

export interface ThemeConfig {
  token?: Partial<GlobalToken>;
  components?: ComponentToken;
}

export interface ResolvedTheme {
  token: GlobalToken;
  components: {
    Button: Required<ButtonToken>;
  };
}

export type ThemeCSSProperties = CSSProperties &
  Record<`--cream-${string}`, string>;

export const defaultTheme: ResolvedTheme = {
  token: {
    colorPrimary: '#9333ea',
    colorPrimaryHover: '#7e22ce',
    colorPrimaryActive: '#6b21a8',
    colorText: '#212121',
    colorTextSecondary: '#616161',
    colorTextPlaceholder: '#757575',
    colorTextDisabled: '#9e9e9e',
    colorBorder: '#e0e0e0',
    colorBgContainer: '#ffffff',
    colorBgElevated: '#ffffff',
    colorBgDisabled: '#f9f9f9',
    colorSuccess: '#4caf50',
    colorSuccessBg: '#f6ffed',
    colorSuccessBorder: '#b7eb8f',
    colorWarning: '#ffc107',
    colorWarningBg: '#fffbe6',
    colorWarningBorder: '#ffe58f',
    colorError: '#f44336',
    colorErrorBg: '#fff2f0',
    colorErrorBorder: '#ffccc7',
    colorInfo: '#2196f3',
    colorInfoBg: '#e6f7ff',
    colorInfoBorder: '#91d5ff',
    borderRadius: '0.375rem',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    controlFocusShadow: '0 0 0 3px rgba(168, 85, 247, 0.2)',
  },
  components: {
    Button: {
      colorPrimary: '#9333ea',
      colorPrimaryHover: '#7e22ce',
      colorPrimaryActive: '#6b21a8',
      borderRadius: '0.375rem',
    },
  },
};

const toCssSize = (value: number | string) =>
  typeof value === 'number' ? `${value}px` : value;

export const mergeTheme = (theme?: ThemeConfig): ResolvedTheme => {
  const token = {
    ...defaultTheme.token,
    ...(theme?.token ?? {}),
  };

  return {
    token,
    components: {
      Button: {
        ...defaultTheme.components.Button,
        colorPrimary:
          theme?.components?.Button?.colorPrimary ?? token.colorPrimary,
        colorPrimaryHover:
          theme?.components?.Button?.colorPrimaryHover ??
          token.colorPrimaryHover,
        colorPrimaryActive:
          theme?.components?.Button?.colorPrimaryActive ??
          token.colorPrimaryActive,
        borderRadius:
          theme?.components?.Button?.borderRadius ?? token.borderRadius,
      },
    },
  };
};

export const themeToCSSVariables = (
  theme: ResolvedTheme
): ThemeCSSProperties => ({
  '--cream-color-primary': theme.token.colorPrimary,
  '--cream-color-primary-hover': theme.token.colorPrimaryHover,
  '--cream-color-primary-active': theme.token.colorPrimaryActive,
  '--cream-color-text': theme.token.colorText,
  '--cream-color-text-secondary': theme.token.colorTextSecondary,
  '--cream-color-text-placeholder': theme.token.colorTextPlaceholder,
  '--cream-color-text-disabled': theme.token.colorTextDisabled,
  '--cream-color-border': theme.token.colorBorder,
  '--cream-color-bg-container': theme.token.colorBgContainer,
  '--cream-color-bg-elevated': theme.token.colorBgElevated,
  '--cream-color-bg-disabled': theme.token.colorBgDisabled,
  '--cream-color-success': theme.token.colorSuccess,
  '--cream-color-success-bg': theme.token.colorSuccessBg,
  '--cream-color-success-border': theme.token.colorSuccessBorder,
  '--cream-color-warning': theme.token.colorWarning,
  '--cream-color-warning-bg': theme.token.colorWarningBg,
  '--cream-color-warning-border': theme.token.colorWarningBorder,
  '--cream-color-error': theme.token.colorError,
  '--cream-color-error-bg': theme.token.colorErrorBg,
  '--cream-color-error-border': theme.token.colorErrorBorder,
  '--cream-color-info': theme.token.colorInfo,
  '--cream-color-info-bg': theme.token.colorInfoBg,
  '--cream-color-info-border': theme.token.colorInfoBorder,
  '--cream-border-radius': toCssSize(theme.token.borderRadius),
  '--cream-box-shadow': theme.token.boxShadow,
  '--cream-control-focus-shadow': theme.token.controlFocusShadow,
  '--cream-button-color-primary': theme.components.Button.colorPrimary,
  '--cream-button-color-primary-hover':
    theme.components.Button.colorPrimaryHover,
  '--cream-button-color-primary-active':
    theme.components.Button.colorPrimaryActive,
  '--cream-button-border-radius': toCssSize(
    theme.components.Button.borderRadius
  ),
});

type ThemeCSSVariablesListener = () => void;

const globalThemeCSSVariablesListeners = new Set<ThemeCSSVariablesListener>();
let globalThemeCSSVariables = themeToCSSVariables(defaultTheme);

const emitGlobalThemeCSSVariablesChange = () => {
  globalThemeCSSVariablesListeners.forEach(listener => listener());
};

export const getGlobalThemeCSSVariables = () => globalThemeCSSVariables;

export const setGlobalThemeCSSVariables = (
  cssVariables: ThemeCSSProperties
) => {
  globalThemeCSSVariables = cssVariables;
  emitGlobalThemeCSSVariablesChange();
};

export const subscribeGlobalThemeCSSVariables = (
  listener: ThemeCSSVariablesListener
) => {
  globalThemeCSSVariablesListeners.add(listener);

  return () => {
    globalThemeCSSVariablesListeners.delete(listener);
  };
};
