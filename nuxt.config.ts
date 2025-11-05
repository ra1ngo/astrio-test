// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxt/ui', '@pinia/nuxt', 'pinia-plugin-persistedstate/nuxt', '@vueuse/nuxt'],
  app: {
    head: {
      title: 'Astrio test',
    },
  },
  css: ['~/assets/css/main.css'],
  icon: {
    mode: 'svg',
  },
  // piniaPluginPersistedstate: {
  //   storage: 'localStorage',
  // },
});