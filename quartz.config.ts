import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Edumynt",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "iamkdraj.github.io",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Schibsted Grotesk",
        body: "Source Sans Pro",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#fefefe",
          lightgray: "#e8e8e8",
          gray: "#adadad",
          darkgray: "#3a3a3a",
          dark: "#1a1a1a",
          secondary: "#2563eb",
          tertiary: "#3b82f6",
          highlight: "rgba(37, 99, 235, 0.15)",
          textHighlight: "#fbbf2488",
        },
        darkMode: {
          light: "#0f0f0f",
          lightgray: "#2a2a2a",
          gray: "#5a5a5a",
          darkgray: "#e0e0e0",
          dark: "#f5f5f5",
          secondary: "#60a5fa",
          tertiary: "#3b82f6",
          highlight: "rgba(96, 165, 250, 0.15)",
          textHighlight: "#fbbf2488",
        },
      },
    },
  },
  pageOptions: {
    showTableOfContents: true,
    showReaderMode: true,
    showPageGraph: true,
    showBacklinks: true,
    showRecentNotes: true,
    enableSPA: true,
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents({ maxDepth: 6, minEntries: 1 }),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
