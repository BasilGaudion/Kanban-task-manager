export interface Subtask {
  id?: string;
  title: string;
  isCompleted: boolean;
}

export interface Task {
  id?: string;
  title: string;
  description: string;
  status: string;
  subtasks: Subtask[];
}

export interface Column {
  id?: string;
  name: string;
  color: string;
  tasks: Task[];
}

export interface Board {
  _id?: string;
  name: string;
  columns: Column[];
}