// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';

/*
 * Я не стал подробно настраивать правила еслинта. Или устанавливать готовые правила от airbnb и vue
 * Т.к. в настройку проекта можно провалиться на несколько дней
 */
export default withNuxt(
    {
        rules: {
            'semi': ['error', 'always'], // Требует точки с запятой
            'quotes': ['error', 'single'], // Обязательно одинарные кавычки
            'no-trailing-spaces': 'error',  // Запрещает пустые символы в конце строки
            'comma-dangle': ['error', 'always-multiline'],  // Запятые обязательны в многострочных литералах
            'comma-style': ['error', 'last'],   // Запятая ставится только в конце строки и не может начинатся с нее
            'comma-spacing': ['error', { 'before': false, 'after': true }], // Пробелы до запятой запрещены, после нее сколько угодно
        },
    },
);
