import Theme from 'vitepress-theme-open17'
import './style.css'
import Slides from '../../components/Slides.vue'
import Link from '../../components/Link.vue'
import BiliVideo from '../../components/BiliVideo.vue'
import FunctionPlot from '../../components/FunctionPlot.vue'
import ContributionGraph from '../../components/ContributionGraph.vue'
import Blog from '../../components/Blog.vue'
import Archive from '../../components/Archive.vue'
import Tags from '../../components/Tags.vue'
import DocTags from '../../components/DocTags.vue'
import HomeDashboard from '../../components/HomeDashboard.vue'
import HomeHero from '../../components/HomeHero.vue'
import SlidevLayout from './layouts/SlidevLayout.vue'
import Layout from './Layout.vue'

export default{
    extends: Theme,
    Layout,
    enhanceApp(ctx) {
        Theme.enhanceApp?.(ctx)
        const { app } = ctx
        const replaceComponent = (name, component) => {
            const registry = app._context.components
            registry[name] = component
            registry[name.toLowerCase()] = component
            const key = name[0].toUpperCase() + name.slice(1)
            registry[key] = component
        }

        app.component('Slides',Slides)
        app.component('Link',Link)
        app.component('BiliVideo',BiliVideo)
        app.component('FunctionPlot',FunctionPlot)
        app.component('ContributionGraph',ContributionGraph)
        app.component('DocTags',DocTags)
        app.component('HomeDashboard',HomeDashboard)
        app.component('HomeHero',HomeHero)
        replaceComponent('blog',Blog)
        replaceComponent('archive',Archive)
        replaceComponent('tags',Tags)
        app.component('SlidevLayout',SlidevLayout)
      }
}
