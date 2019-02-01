export interface ICard {
  id: string
  url?: string
  notes?: string
}

export interface ILane {
  id: string
  title?: string
  cards: ICard[]
}

export interface IBoard {
  id: string
  title?: string
  description?: string
  lanes?: ILane[]
  edited: Date
}

export interface IBoards extends Array<IBoard> {}
