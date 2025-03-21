import './assets/main.css'

import ErrorStackParser from 'error-stack-parser'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'
// import { findCodeBySourceMap } from './utils/index'

import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(ElementPlus)
app.use(createPinia())
app.use(router)

app.config.errorHandler = (err : any, vm, info) => {
    const stack = ErrorStackParser.parse(err as Error)
    const jsError = {
        stack_frames: stack,
        message: err.message,
        stack: err.stack,
        name: err.name,
    }
    vm!.$message.error(`你触发了一个${err.name}错误`);
    localStorage.setItem('jsErrorList', JSON.stringify(jsError))
    // findCodeBySourceMap(stack[0])
    // console.log('stack', stack)
}


app.mount('#app')
