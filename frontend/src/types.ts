export interface Task{
  id: number;
  title: string;
  description?: string;
  due_date?: string | null;
  is_completed: boolean;
  created_at: string;
}