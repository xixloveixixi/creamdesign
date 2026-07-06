import { defaultTheme, mergeTheme, themeToCSSVariables } from './theme';

describe('ConfigProvider theme tokens', () => {
  it('should expose semantic tokens as CSS variables', () => {
    const theme = mergeTheme({
      token: {
        colorPrimaryBg: '#f3e8ff',
        colorTextPlaceholder: '#8a8f98',
        colorTextDisabled: '#a1a1aa',
        colorBgDisabled: '#f4f4f5',
        colorSuccessBg: '#ecfdf3',
        colorSuccessBorder: '#86efac',
        colorErrorBg: '#fef2f2',
        colorErrorBorder: '#fecaca',
        colorWarningBg: '#fffbeb',
        colorWarningBorder: '#fde68a',
        colorInfoBg: '#eff6ff',
        colorInfoBorder: '#bfdbfe',
        controlFocusShadow: '0 0 0 3px rgba(124, 58, 237, 0.24)',
      },
    });

    const cssVariables = themeToCSSVariables(theme);

    expect(cssVariables['--cream-color-primary-bg']).toBe('#f3e8ff');
    expect(cssVariables['--cream-color-text-placeholder']).toBe('#8a8f98');
    expect(cssVariables['--cream-color-text-disabled']).toBe('#a1a1aa');
    expect(cssVariables['--cream-color-bg-disabled']).toBe('#f4f4f5');
    expect(cssVariables['--cream-color-success-bg']).toBe('#ecfdf3');
    expect(cssVariables['--cream-color-success-border']).toBe('#86efac');
    expect(cssVariables['--cream-color-error-bg']).toBe('#fef2f2');
    expect(cssVariables['--cream-color-error-border']).toBe('#fecaca');
    expect(cssVariables['--cream-color-warning-bg']).toBe('#fffbeb');
    expect(cssVariables['--cream-color-warning-border']).toBe('#fde68a');
    expect(cssVariables['--cream-color-info-bg']).toBe('#eff6ff');
    expect(cssVariables['--cream-color-info-border']).toBe('#bfdbfe');
    expect(cssVariables['--cream-control-focus-shadow']).toBe(
      '0 0 0 3px rgba(124, 58, 237, 0.24)'
    );
  });

  it('should keep Button component tokens derived from global tokens', () => {
    const theme = mergeTheme({
      token: {
        colorPrimary: '#7c3aed',
        colorPrimaryHover: '#6d28d9',
        colorPrimaryActive: '#5b21b6',
        borderRadius: 6,
      },
    });

    expect(theme.components.Button.colorPrimary).toBe('#7c3aed');
    expect(theme.components.Button.colorPrimaryHover).toBe('#6d28d9');
    expect(theme.components.Button.colorPrimaryActive).toBe('#5b21b6');
    expect(theme.components.Button.borderRadius).toBe(6);
  });

  it('should provide defaults for new semantic tokens', () => {
    const cssVariables = themeToCSSVariables(defaultTheme);

    expect(cssVariables['--cream-color-text-placeholder']).toBe(
      defaultTheme.token.colorTextPlaceholder
    );
    expect(cssVariables['--cream-color-bg-disabled']).toBe(
      defaultTheme.token.colorBgDisabled
    );
    expect(cssVariables['--cream-control-focus-shadow']).toBe(
      defaultTheme.token.controlFocusShadow
    );
  });
});
