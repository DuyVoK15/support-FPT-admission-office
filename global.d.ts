declare global {
    namespace NodeJS {
      interface ProcessEnv {
        BASE_API_URL: string | undefined;
        EXPO_PUBLIC_MORE_KEY: string | undefined;
        // etc...
      }
    }
  }
  export { }