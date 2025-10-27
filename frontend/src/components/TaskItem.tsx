import React from 'react';
import { Task } from '../types';
interface Props{ task:Task; onToggle:(id:number,val:boolean)=>Promise<void>; onDelete:(id:number)=>Promise<void> }
const TaskItem: React.FC<Props> = ({task,onToggle,onDelete}) => (
  <div className={`task ${task.is_completed?'completed':''}`}>
    <h3>{task.title}</h3>
    {task.description && <p>{task.description}</p>}
    <div style={{display:'flex',gap:8}}>
      <button onClick={()=>onToggle(task.id,!task.is_completed)}>{task.is_completed?'Сделать активной':'Завершить'}</button>
      <button onClick={()=>onDelete(task.id)}>Удалить</button>
    </div>
  </div>
);
export default TaskItem;