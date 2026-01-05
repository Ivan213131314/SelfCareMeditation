/**
 * Цветовая палитра приложения
 * Основано на референсном дизайне (Calm-style meditation app)
 */

export const Colors = {
    // Основной акцентный цвет (яркий изумрудный)
    primary: '#13EC80',
    primaryDark: '#10D070', // Для pressed states
    primaryLight: 'rgba(19, 236, 128, 0.2)', // Для фонов кнопок

    // Фоны
    background: '#F6F8F7',
    backgroundDark: '#102219',

    // Карточки
    card: '#FFFFFF',
    cardDark: '#1C2E26',

    // Текст
    text: '#111814',
    textDark: '#FFFFFF',
    textSecondary: '#64748B', // slate-500
    textMuted: '#94A3B8', // slate-400

    // Утилитарные
    white: '#FFFFFF',
    error: '#EF4444', // red-500
    border: '#E2E8F0', // slate-200
    borderDark: 'rgba(255, 255, 255, 0.1)',

    // Акценты для категорий
    categoryMorning: '#F59E0B', // amber-500
    categoryStress: '#60A5FA', // blue-400
    categorySleep: '#818CF8', // indigo-400
    categoryNature: '#13EC80', // primary
};

// Типизация для поддержки dark mode
export type ColorScheme = 'light' | 'dark';

