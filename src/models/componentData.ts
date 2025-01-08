import type { Dish } from '@/models/dish'

export interface FormData {
  dishes: Dish[]
  selected: Set<Dish>
  gamemode: number | null
  isTyping: boolean
  inputValue: string
}

export interface HomeData {
  rebuildKey: number
  canvasSize: Size
  showLeaderBoard: boolean
  showForm: boolean
  started: boolean
}

export interface Size {
  height?: number
  width?: number
}
