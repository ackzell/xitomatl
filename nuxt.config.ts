import { defineNuxtConfig } from 'nuxt/config';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [`@nuxt/eslint`, `@unocss/nuxt`, `@vueuse/nuxt`, `@nuxt/icon`],
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },
  compatibilityDate: `2024-11-01`,
  eslint: {
    config: {
      stylistic: {
        quotes: `single`,
        semi: true,
      },
    },
  },
  unocss: {
    nuxtLayers: true,
  },
});
