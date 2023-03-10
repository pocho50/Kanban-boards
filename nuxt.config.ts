// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "@vueuse/nuxt"],
  ssr: false,
  app: {
    head: {
      charset: "utf-8",
      title: "Kanban Boards",
    },
  },
});
