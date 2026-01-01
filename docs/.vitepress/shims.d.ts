declare module 'vitepress-theme-open17/genFeed' {
  export function genFeed(siteConfig: unknown): void | Promise<void>;
}

declare module 'pseudocode' {
  interface PseudocodeOptions {
    lineNumber?: boolean;
    captionCount?: boolean;
  }

  const pseudocode: {
    renderToString: (source: string, options?: PseudocodeOptions) => string;
  };
  export default pseudocode;
}
