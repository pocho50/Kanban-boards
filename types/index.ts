export type ID = string;

export interface Board {
  id: ID;
  title: string;
  columns: Column[];
}

export interface Column {
  id: ID;
  title: string;
  tasks: Task[];
}

export interface Task {
  id: ID;
  title: string;
  createAt: Date;
}
