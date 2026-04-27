import { defineConfig } from 'vitepress'

const SITE_NAME = 'Hermes 中文社区'
const SITE_TITLE = 'Hermes 中文社区 · hermes-agent 中文文档·教程·技能市场'
const SITE_DESC = 'Hermes 中文社区 — NousResearch hermes-agent 在中国的官方中文文档与社区门户。涵盖 hermes 入门教程、CLI 速查、技能市场、Linux Live USB 制盘、接 DeepSeek / 通义 / Kimi / Ollama 全套指南。'
const SITE_URL = 'https://zh.u-hermes.org'
const REPO = 'https://github.com/dongsheng123132/u-hermes'

const SEO_KEYWORDS = [
  'Hermes 中文社区',
  'hermes 中文',
  'hermes 中文文档',
  'hermes 教程',
  'hermes-agent',
  'hermes agent 中文',
  'NousResearch hermes',
  'NousResearch 中文',
  'AI Agent 中文',
  'AI 编程助手',
  'U-Hermes',
  'U-Hermes 马盘',
  '虾盘',
  'hermes 接 DeepSeek',
  'hermes 接通义千问',
  'hermes ollama',
  'hermes 本地运行',
  'AI U盘',
  'Live USB AI',
  'hermes 安装',
  'hermes 配置',
]

export default defineConfig({
  title: SITE_NAME,
  titleTemplate: ':title · Hermes 中文社区',
  description: SITE_DESC,
  cleanUrls: true,
  lang: 'zh-CN',
  lastUpdated: true,
  srcExclude: ['**/README.md', '**/node_modules/**'],
  ignoreDeadLinks: [
    /^\/discussions$/,
    /^\/buy$/,
    /^\/oss$/,
    /^\/github$/,
    /^\/upstream$/,
    /\.jpg$/,
    /\.png$/,
    /\.ico$/,
    /^https?:\/\/localhost(:\d+)?/,
    /^https?:\/\/127\.0\.0\.1(:\d+)?/,
  ],

  sitemap: {
    hostname: SITE_URL,
    transformItems(items) {
      // 主要页面给更高优先级,有助于搜索引擎抓取
      return items.map(item => {
        if (item.url === '' || item.url === 'zh/' || item.url === 'zh/index.html') {
          return { ...item, priority: 1.0, changefreq: 'daily' }
        }
        if (item.url.startsWith('zh/')) {
          return { ...item, priority: 0.8, changefreq: 'weekly' }
        }
        return { ...item, priority: 0.5, changefreq: 'monthly' }
      })
    },
  },

  head: [
    ['link', { rel: 'icon', href: '/favicon.ico', sizes: 'any' }],
    ['link', { rel: 'icon', type: 'image/png', href: '/logo.png' }],
    ['link', { rel: 'apple-touch-icon', href: '/logo.png' }],
    ['link', { rel: 'canonical', href: SITE_URL }],
    ['link', { rel: 'alternate', hreflang: 'zh-CN', href: SITE_URL + '/zh/' }],
    ['link', { rel: 'alternate', hreflang: 'en', href: SITE_URL + '/en/' }],
    ['link', { rel: 'alternate', hreflang: 'ja', href: SITE_URL + '/ja/' }],
    ['link', { rel: 'alternate', hreflang: 'x-default', href: SITE_URL + '/zh/' }],
    ['meta', { name: 'theme-color', content: '#f97316' }],
    ['meta', { name: 'keywords', content: SEO_KEYWORDS.join(',') }],
    ['meta', { name: 'author', content: 'Hermes 中文社区' }],
    ['meta', { name: 'application-name', content: SITE_NAME }],
    ['meta', { name: 'generator', content: 'VitePress' }],
    ['meta', { name: 'robots', content: 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1' }],
    ['meta', { name: 'baidu-site-verification', content: '' }],
    ['meta', { name: 'google-site-verification', content: '' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'zh_CN' }],
    ['meta', { property: 'og:locale:alternate', content: 'en_US' }],
    ['meta', { property: 'og:locale:alternate', content: 'ja_JP' }],
    ['meta', { property: 'og:site_name', content: SITE_NAME }],
    ['meta', { property: 'og:title', content: SITE_TITLE }],
    ['meta', { property: 'og:description', content: SITE_DESC }],
    ['meta', { property: 'og:url', content: SITE_URL }],
    ['meta', { property: 'og:image', content: SITE_URL + '/logo.png' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: SITE_TITLE }],
    ['meta', { name: 'twitter:description', content: SITE_DESC }],
    ['meta', { name: 'twitter:image', content: SITE_URL + '/logo.png' }],
    [
      'script',
      { type: 'application/ld+json' },
      JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'WebSite',
            '@id': SITE_URL + '#website',
            name: SITE_NAME,
            alternateName: [
              'Hermes 中文社区',
              'hermes 中文文档',
              'hermes-agent 中文社区',
              'NousResearch hermes 中文',
              'U-Hermes 社区',
              '马盘社区',
            ],
            url: SITE_URL,
            inLanguage: 'zh-CN',
            description: SITE_DESC,
            keywords: SEO_KEYWORDS.join(','),
            publisher: { '@id': SITE_URL + '#org' },
            potentialAction: {
              '@type': 'SearchAction',
              target: { '@type': 'EntryPoint', urlTemplate: SITE_URL + '/zh/?s={search_term_string}' },
              'query-input': 'required name=search_term_string',
            },
          },
          {
            '@type': 'Organization',
            '@id': SITE_URL + '#org',
            name: 'Hermes 中文社区',
            alternateName: ['U-Hermes 中文社区', 'hermes-agent 中文文档'],
            url: SITE_URL,
            logo: SITE_URL + '/logo.png',
            sameAs: [
              REPO,
              'https://github.com/NousResearch/hermes-agent',
              'https://u-hermes.org',
            ],
          },
          {
            '@type': 'SoftwareApplication',
            '@id': SITE_URL + '#app',
            name: 'Hermes Agent(中文便携版 U-Hermes)',
            alternateName: ['hermes-agent', 'U-Hermes 马盘', 'NousResearch Hermes'],
            description: 'Hermes 是 NousResearch 出品的开源 AI Agent,支持 shell、浏览器自动化、文件读写、多步推理。U-Hermes 是其中文便携包装版。',
            applicationCategory: 'DeveloperApplication',
            operatingSystem: 'Windows, Linux, macOS',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'CNY', description: '开源免费' },
            url: SITE_URL,
            downloadUrl: REPO,
            license: 'https://opensource.org/licenses/MIT',
            keywords: SEO_KEYWORDS.join(','),
          },
        ],
      }),
    ],
  ],

  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      link: '/zh/',
      themeConfig: zhConfig(),
    },
    en: {
      label: 'English',
      lang: 'en-US',
      link: '/en/',
      themeConfig: enConfig(),
    },
    ja: {
      label: '日本語',
      lang: 'ja-JP',
      link: '/ja/',
      themeConfig: jaConfig(),
    },
  },

  themeConfig: {
    logo: { src: '/logo.png', alt: 'Hermes 中文社区', width: 24, height: 24 },
    siteTitle: 'Hermes 中文社区',
    socialLinks: [
      { icon: 'github', link: REPO },
    ],
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: { buttonText: '搜索文档', buttonAriaLabel: '搜索文档' },
              modal: {
                noResultsText: '没有找到相关结果',
                resetButtonTitle: '清除',
                footer: { selectText: '选择', navigateText: '切换', closeText: '关闭' },
              },
            },
          },
          en: {
            translations: {
              button: { buttonText: 'Search', buttonAriaLabel: 'Search' },
            },
          },
          ja: {
            translations: {
              button: { buttonText: '検索', buttonAriaLabel: '検索' },
            },
          },
        },
      },
    },
  },

  markdown: {
    lineNumbers: false,
    theme: { light: 'github-light', dark: 'github-dark' },
  },

  vite: {
    server: { host: '127.0.0.1' },
  },
})

// ─────── 中文配置 ───────
function zhConfig() {
  return {
    nav: [
      { text: '首页', link: '/zh/' },
      { text: '快速开始', link: '/zh/quickstart/' },
      { text: '教程', link: '/zh/tutorials/' },
      { text: '📖 实体书', link: '/zh/book/' },
      { text: '安装', link: '/zh/install/' },
      { text: '技能市场', link: '/zh/market/' },
      { text: '社区论坛', link: '/zh/forum/' },
      { text: 'CLI 速查', link: '/zh/cli/' },
      { text: '版本发布', link: '/zh/releases/' },
      { text: '赞助', link: '/zh/sponsor/' },
    ],
    sidebar: {
      '/zh/quickstart/': [
        {
          text: '快速开始',
          items: [
            { text: '总览', link: '/zh/quickstart/' },
            { text: 'pip 安装', link: '/zh/quickstart/pip-install' },
            { text: 'Linux Live USB', link: '/zh/quickstart/linux-live-usb' },
            { text: 'Docker', link: '/zh/quickstart/docker' },
          ],
        },
      ],
      '/zh/tutorials/': [
        {
          text: '入门',
          items: [
            { text: 'Hermes 教程总览', link: '/zh/tutorials/' },
            { text: 'Hermes 是什么?', link: '/zh/tutorials/what-is-hermes' },
            { text: '5 分钟第一次对话', link: '/zh/tutorials/first-chat' },
            { text: 'Web UI 怎么用', link: '/zh/tutorials/web-ui-guide' },
          ],
        },
        {
          text: '接模型',
          items: [
            { text: '接 DeepSeek', link: '/zh/tutorials/connect-deepseek' },
            { text: '接通义千问', link: '/zh/tutorials/connect-qwen' },
            { text: '接 Kimi', link: '/zh/tutorials/connect-kimi' },
            { text: '接 OpenAI / Claude', link: '/zh/tutorials/connect-openai' },
            { text: '本地 Ollama', link: '/zh/tutorials/connect-ollama' },
          ],
        },
        {
          text: '实战',
          items: [
            { text: 'Hermes 写代码', link: '/zh/tutorials/coding-with-hermes' },
            { text: 'Hermes 浏览器自动化', link: '/zh/tutorials/browser-automation' },
            { text: 'Hermes 写自定义技能', link: '/zh/tutorials/build-skill' },
            { text: '便携 U 盘玩法', link: '/zh/tutorials/portable-usb-tips' },
          ],
        },
        {
          text: '对比',
          items: [
            { text: 'Hermes vs Claude Code', link: '/zh/tutorials/vs-claude-code' },
            { text: 'Hermes vs OpenClaw', link: '/zh/tutorials/vs-openclaw' },
            { text: 'Hermes vs Cursor', link: '/zh/tutorials/vs-cursor' },
          ],
        },
      ],
      '/zh/install/': [
        {
          text: '安装方式',
          items: [
            { text: '总览', link: '/zh/install/' },
            { text: 'Windows 便携 U 盘', link: '/zh/install/windows-portable' },
            { text: 'Linux Live USB', link: '/zh/install/linux-live-usb' },
            { text: 'pip', link: '/zh/install/pip' },
            { text: 'Docker', link: '/zh/install/docker' },
            { text: '从源码', link: '/zh/install/from-source' },
          ],
        },
      ],
      '/zh/market/': [
        {
          text: '技能市场',
          items: [
            { text: '全部', link: '/zh/market/' },
            { text: '官方', link: '/zh/market/official' },
            { text: '认证', link: '/zh/market/certified' },
            { text: '社区', link: '/zh/market/community' },
            { text: '提交技能', link: '/zh/market/submit' },
          ],
        },
      ],
      '/zh/cli/': [
        {
          text: 'CLI 速查',
          items: [
            { text: '总览', link: '/zh/cli/' },
            { text: 'hermes 命令', link: '/zh/cli/hermes-cli' },
            { text: '环境变量', link: '/zh/cli/env-vars' },
            { text: '端口约定', link: '/zh/cli/ports' },
            { text: '便捷脚本', link: '/zh/cli/scripts' },
          ],
        },
      ],
      '/zh/releases/': [
        {
          text: '版本发布',
          items: [
            { text: '上游 Releases', link: '/zh/releases/' },
            { text: '社区站 Changelog', link: '/zh/releases/changelog' },
          ],
        },
      ],
      '/zh/book/': [
        {
          text: '📖 实体书全文',
          items: [
            { text: '总览', link: '/zh/book/' },
          ],
        },
        {
          text: '00 · 前言',
          collapsed: false,
          items: [
            { text: '前言总览', link: '/zh/book/00-preface/' },
            { text: '01 这本教程写给谁', link: '/zh/book/00-preface/01-who-is-this-for' },
            { text: '02 为什么 2026 学 hermes', link: '/zh/book/00-preface/02-why-hermes' },
            { text: '03 怎么读这本教程', link: '/zh/book/00-preface/03-how-to-read' },
            { text: '04 7 天速成日程', link: '/zh/book/00-preface/04-7day-plan' },
          ],
        },
        {
          text: '01 · 基础',
          collapsed: true,
          items: [
            { text: '基础总览', link: '/zh/book/01-basics/' },
            { text: '01 Hermes 是什么', link: '/zh/book/01-basics/01-what-is-hermes' },
            { text: '02 3 分钟快速上手', link: '/zh/book/01-basics/02-3min-quickstart' },
            { text: '03 第一次对话', link: '/zh/book/01-basics/03-first-conversation' },
          ],
        },
        {
          text: '02 · 安装',
          collapsed: true,
          items: [
            { text: '安装总览', link: '/zh/book/02-installation/' },
            { text: '01 Linux 原生安装', link: '/zh/book/02-installation/01-linux-native' },
            { text: '02 macOS 原生安装', link: '/zh/book/02-installation/02-macos-native' },
            { text: '03 Windows + WSL', link: '/zh/book/02-installation/03-windows-wsl' },
            { text: '04 云服务器部署', link: '/zh/book/02-installation/04-cloud-server' },
          ],
        },
        {
          text: '03 · 核心功能',
          collapsed: true,
          items: [
            { text: '核心功能总览', link: '/zh/book/03-core-features/' },
            { text: '01 Skills 系统', link: '/zh/book/03-core-features/01-skills-system' },
            { text: '02 Memory 与上下文', link: '/zh/book/03-core-features/02-memory-and-context' },
            { text: '03 MCP 协议', link: '/zh/book/03-core-features/03-mcp-protocol' },
            { text: '04 Cron 定时任务', link: '/zh/book/03-core-features/04-cron-and-scheduling' },
            { text: '05 多智能体协作', link: '/zh/book/03-core-features/05-multi-agent' },
          ],
        },
        {
          text: '04 · 接模型',
          collapsed: true,
          items: [
            { text: '接模型总览', link: '/zh/book/04-providers/' },
            { text: '01 OpenAI / Anthropic', link: '/zh/book/04-providers/01-openai-anthropic' },
            { text: '02 国内模型', link: '/zh/book/04-providers/02-domestic-providers' },
            { text: '03 本地 Ollama', link: '/zh/book/04-providers/03-ollama-local' },
            { text: '04 OpenRouter 聚合', link: '/zh/book/04-providers/04-openrouter-aggregator' },
          ],
        },
        {
          text: '05 · 实战案例',
          collapsed: true,
          items: [
            { text: '案例总览', link: '/zh/book/05-cases/' },
            { text: '01 编程工作流', link: '/zh/book/05-cases/01-coding-workflow' },
            { text: '02 办公自动化', link: '/zh/book/05-cases/02-office-automation' },
            { text: '03 企业 IM 接入', link: '/zh/book/05-cases/03-enterprise-im' },
            { text: '04 团队部署', link: '/zh/book/05-cases/04-team-deployment' },
            { text: '05 便携 U 盘玩法', link: '/zh/book/05-cases/05-portable-usb' },
            { text: '06 超级个体', link: '/zh/book/05-cases/06-solo-entrepreneur' },
          ],
        },
        {
          text: '06 · 工程进阶',
          collapsed: true,
          items: [
            { text: '工程总览', link: '/zh/book/06-engineering/' },
            { text: '01 便携打包', link: '/zh/book/06-engineering/01-portable-packaging' },
            { text: '02 Electron 启动器', link: '/zh/book/06-engineering/02-electron-launcher' },
            { text: '03 Bundle 与补丁', link: '/zh/book/06-engineering/03-bundle-patches' },
            { text: '04 Provider 模板', link: '/zh/book/06-engineering/04-provider-template' },
          ],
        },
        {
          text: '07 · 排错',
          collapsed: true,
          items: [
            { text: '排错总览', link: '/zh/book/07-troubleshooting/' },
            { text: '01 安装失败', link: '/zh/book/07-troubleshooting/01-install-failures' },
            { text: '02 网络问题', link: '/zh/book/07-troubleshooting/02-network-issues' },
            { text: '03 FAQ', link: '/zh/book/07-troubleshooting/03-faq' },
          ],
        },
        {
          text: '99 · 附录',
          collapsed: true,
          items: [
            { text: '附录总览', link: '/zh/book/99-appendix/' },
            { text: '01 CLI 参考', link: '/zh/book/99-appendix/01-cli-reference' },
            { text: '02 配置模板', link: '/zh/book/99-appendix/02-config-templates' },
            { text: '03 术语表', link: '/zh/book/99-appendix/03-glossary' },
            { text: '04 资源链接', link: '/zh/book/99-appendix/04-resources' },
          ],
        },
      ],
      '/zh/about/': [
        {
          text: '关于',
          items: [
            { text: '项目介绍', link: '/zh/about/' },
            { text: '免责与商标声明', link: '/zh/about/disclaimer' },
            { text: '隐私政策', link: '/zh/about/privacy' },
          ],
        },
      ],
      '/zh/community/': [
        {
          text: '参与社区',
          items: [
            { text: '贡献指南', link: '/zh/community/contributing' },
            { text: '行为守则', link: '/zh/community/code-of-conduct' },
          ],
        },
      ],
    },
    editLink: {
      pattern: 'https://github.com/dongsheng123132/hermes-zh/edit/main/:path',
      text: '在 GitHub 上编辑此页',
    },
    docFooter: { prev: '上一页', next: '下一页' },
    outline: { label: '本页内容', level: [2, 3] },
    lastUpdated: { text: '最后更新于', formatOptions: { dateStyle: 'short', timeStyle: 'medium' } },
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
    sidebarMenuLabel: '目录',
    returnToTopLabel: '返回顶部',
    langMenuLabel: '切换语言',
    footer: {
      message:
        '基于 <a href="https://github.com/NousResearch/hermes-agent" target="_blank" rel="noopener">NousResearch/hermes-agent</a> · 非官方中文社区 · MIT 协议',
      copyright: '© 2026 U-Hermes 中文社区 · 由社区志愿者维护',
    },
  }
}

// ─────── 英文配置 ───────
function enConfig() {
  return {
    nav: [
      { text: 'Home', link: '/en/' },
      { text: 'Quick Start', link: '/en/quickstart/' },
      { text: 'GitHub', link: 'https://github.com/NousResearch/hermes-agent' },
    ],
    footer: {
      message: 'Based on <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a> · Unofficial CN community · MIT',
      copyright: '© 2026 U-Hermes CN Community',
    },
  }
}

// ─────── 日文配置 ───────
function jaConfig() {
  return {
    nav: [
      { text: 'ホーム', link: '/ja/' },
      { text: 'GitHub', link: 'https://github.com/NousResearch/hermes-agent' },
    ],
    footer: {
      message: '<a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a> ベース · 非公式中文コミュニティ · MIT',
      copyright: '© 2026 U-Hermes 中文コミュニティ',
    },
  }
}
