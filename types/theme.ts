export type ThemeId = 'blue' | 'swiss';

export interface ThemeOption {
  id: ThemeId;
  label: string;
  description?: string;
}

export const THEME_OPTIONS: ThemeOption[] = [
  {
    id: 'blue',
    label: '深海蓝',
    description: '默认主题，接近 DeepSeek 网页端风格',
  },
  {
    id: 'swiss',
    label: '瑞士设计',
    description: 'DE-Swiss-Design，高对比直角与硬阴影',
  },
];

export const DEFAULT_THEME_ID: ThemeId = 'blue';
