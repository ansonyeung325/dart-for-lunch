import type { MenuPage } from './enum'

export interface GameSettingData {
  suggestedDish: Array<Dish>
  gamemodes: Array<GameMode>
  selectedDishes: Set<String>
  isTyping: boolean
  inputValue: string
  gamemode: GameMode | null
}

export interface HomeData {
  rebuildKey: number
  canvasSize: Size
  showLeaderBoard: boolean
  showForm: boolean
  started: boolean
  globalStore: GlobalStore
}

export interface Size {
  height?: number
  width?: number
}

export interface MenuStateStore {
  currentPageEnum: typeof MenuPage
  gamemode: GameMode | null
  gamemodes: Array<GameMode>
  selectedDishes: Set<String>
  currentPage: MenuPage
}

export interface Dish {
  id?: String
  name: string
  createdAt?: Date
}

export interface GameMode {
  id: String
  name: String
  createdAt?: Date
}

export interface GlobalStore {
  showLoading: boolean
}
