import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import './style.css'
import HermesHero from './components/HermesHero.vue'
import FeatureGrid from './components/FeatureGrid.vue'
import InstallTabs from './components/InstallTabs.vue'
import ChannelBadges from './components/ChannelBadges.vue'
import SkillGrid from './components/SkillGrid.vue'
import SponsorWall from './components/SponsorWall.vue'
import ReleaseList from './components/ReleaseList.vue'
import PypiStats from './components/PypiStats.vue'
import CompanionApps from './components/CompanionApps.vue'
import AboutBlock from './components/AboutBlock.vue'
import JoinCommunity from './components/JoinCommunity.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('HermesHero', HermesHero)
    app.component('FeatureGrid', FeatureGrid)
    app.component('InstallTabs', InstallTabs)
    app.component('ChannelBadges', ChannelBadges)
    app.component('SkillGrid', SkillGrid)
    app.component('SponsorWall', SponsorWall)
    app.component('ReleaseList', ReleaseList)
    app.component('PypiStats', PypiStats)
    app.component('CompanionApps', CompanionApps)
    app.component('AboutBlock', AboutBlock)
    app.component('JoinCommunity', JoinCommunity)
  },
} satisfies Theme
