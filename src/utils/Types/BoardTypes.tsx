export interface Subtask {
  _id?: string;
  title: string;
  isCompleted: boolean;
}

export interface Task {
  _id?: string;
  title: string;
  description: string;
  color: string;
  status: string;
  subtasks: Subtask[];
}

export interface Column {
  _id?: string;
  name: string;
  color: string;
  tasks: Task[];
}

export interface Board {
  _id?: string;
  name: string;
  columns: Column[];
}
