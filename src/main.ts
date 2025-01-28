import './styles/base.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faArrowLeft,
  faArrowRight,
  faCheck,
  faMinus,
  faXmark,
} from '@fortawesome/free-solid-svg-icons'
import { faChartLine } from '@fortawesome/free-solid-svg-icons/faChartLine'

library.add(faArrowLeft, faArrowRight, faCheck, faChartLine, faXmark, faMinus)
// dotenv.config()
const app = createApp(App)

app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
