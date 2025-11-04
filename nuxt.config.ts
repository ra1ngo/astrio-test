// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', 'nuxt-icons', '@pinia/nuxt', 'pinia-plugin-persistedstate', '@vueuse/nuxt'],
  app: {
    head: {
      title: 'Astrio test',
    },
  },
  css: ['~/assets/css/reset.css'],
});