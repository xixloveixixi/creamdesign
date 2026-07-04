import React, { createContext, useContext, useEffect, useMemo } from 'react';
import {
  defaultTheme,
  mergeTheme,
  setGlobalThemeCSSVariables,
  themeToCSSVariables,
  type ResolvedTheme,
  type ThemeConfig,
} from './theme';

export interface ConfigProviderProps {
  theme?: ThemeConfig;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const ThemeContext = createContext<ResolvedTheme>(defaultTheme);

export const useTheme = () => useContext(ThemeContext);

export const ConfigProvider: React.FC<ConfigProviderProps> = ({
  theme,
  className,
  style,
  children,
}) => {
  const resolvedTheme = useMemo(() => mergeTheme(theme), [theme]);
  const cssVariables = useMemo(
    () => themeToCSSVariables(resolvedTheme),
    [resolvedTheme]
  );

  useEffect(() => {
    setGlobalThemeCSSVariables(cssVariables);
  }, [cssVariables]);

  return (
    <ThemeContext.Provider value={resolvedTheme}>
      <div
        className={['cream-config-provider', className]
          .filter(Boolean)
          .join(' ')}
        style={{
          ...cssVariables,
          ...style,
        }}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export default ConfigProvider;
