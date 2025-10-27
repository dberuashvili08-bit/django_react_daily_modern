import React from 'react';
import { Task } from '../types';
import TaskItem from './TaskItem';
interface Props{ tasks:Task[]; onToggle:(id:number,val:boolean)=>Promise<void>; onDelete:(id:number)=>Promise<void> }
const TaskList: React.FC<Props> = ({tasks,onToggle,onDelete}) => (
  <div className='task-list'>{tasks.map(t=>(<TaskItem key={t.id} task={t} onToggle={onToggle} onDelete={onDelete}/>))}</div>
);
export default TaskList;