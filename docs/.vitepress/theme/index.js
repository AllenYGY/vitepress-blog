import Theme from 'vitepress-theme-open17'
import './style.css'
import Slides from '../../components/Slides.vue'

export default{
    extends: Theme,
    enhanceApp({ app }) {
        app.component('Slides',Slides)
      }
}