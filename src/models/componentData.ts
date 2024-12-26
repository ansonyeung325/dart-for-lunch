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
  canvasSize: CanvasSize
  showLeaderBoard: boolean
  showForm: boolean
}

export interface CanvasSize {
  height?: number
  width?: number
}
