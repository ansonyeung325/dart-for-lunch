import type { GlobalStore } from '@/models/interface'
import { reactive } from 'vue'

export const globalStore = reactive<GlobalStore>({
  showLoading: false,
})
