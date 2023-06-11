import {createApp} from 'vue'
import App from './App.vue'
import index from './router/index'
import element from 'element-plus'


import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.use(element)


app.use(index)
app.mount('#app')
