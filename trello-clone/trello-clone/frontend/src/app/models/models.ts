export interface Board {
  id: string,
  profile_id: string,
  name: string,
  created_at: string
}

export interface List {
  id: string,
  board_id: string,
  name: string,
  position: number,
  created_at: string
}

export type CardStatus = "pending" | "in_progress" | "done";

export interface Card {
  id: string,
  list_id: string,
  title: string,
  description: string,
  position: number,
  due_date: Date,
  is_done: boolean,
  created_at: string,
  isEditing: boolean,
  status: CardStatus
}
