/**
 * Цветовая палитра приложения
 * Основано на референсном дизайне (Calm-style meditation app)
 */

// Плоская структура для обратной совместимости
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

// Вложенная структура для новых компонентов (meditation module)
const colors = {
    // Основной акцентный цвет
    primary: '#13EC80',
    primaryDark: '#10D070',
    primaryLight: 'rgba(19, 236, 128, 0.2)',

    // Фоны (вложенный объект)
    background: {
        default: '#F6F8F7',
        dark: '#102219',
        elevated: '#FFFFFF',
        elevatedDark: '#1C2E26',
    },

    // Текст (вложенный объект)
    text: {
        primary: '#111814',
        primaryDark: '#FFFFFF',
        secondary: '#64748B',
        tertiary: '#94A3B8',
    },

    // Утилитарные
    white: '#FFFFFF',
    error: '#EF4444',
    border: '#E2E8F0',
    borderDark: 'rgba(255, 255, 255, 0.1)',

    // Акценты категорий
    categoryMorning: '#F59E0B',
    categoryStress: '#60A5FA',
    categorySleep: '#818CF8',
    categoryNature: '#13EC80',
};

export default colors;

// Типизация для поддержки dark mode
export type ColorScheme = 'light' | 'dark';
