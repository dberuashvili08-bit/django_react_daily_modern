import React, { useEffect, useState } from 'react';
import './index.css';
import axios from 'axios';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { Task } from './types';

const API = 'http://localhost:8000/api/tasks/';

const App: React.FC = () => {
  const [tasks,setTasks]=useState<Task[]>([]);
  const [filter,setFilter]=useState<'all'|'active'|'completed'>('all');
  const [error,setError]=useState<string>('');

  const load = async () => {
    try{
      const url = filter==='all' ? API : API+`?status=${filter}`;
      const {data} = await axios.get<Task[]>(url);
      setTasks(data); setError('');
    }catch(e:any){ setError('Ошибка загрузки данных'); }
  };

  useEffect(()=>{ load(); },[filter]);

  const add = async (title:string, description:string) => {
    try{ await axios.post(API,{title,description}); await load(); }
    catch{ setError('Не удалось добавить задачу'); }
  };
  const toggle = async (id:number, val:boolean) => {
    try{ await axios.patch(API+id+'/',{is_completed:val}); await load(); }
    catch{ setError('Не удалось обновить задачу'); }
  };
  const remove = async (id:number) => {
    try{ await axios.delete(API+id+'/'); await load(); }
    catch{ setError('Не удалось удалить задачу'); }
  };

  return (<div className='container'>
    <h1>Ежедневник — Modern API</h1>
    <TaskForm onAdd={add}/>
    <div className='filters'>
      <button onClick={()=>setFilter('all')}>Все</button>
      <button onClick={()=>setFilter('active')}>Активные</button>
      <button onClick={()=>setFilter('completed')}>Завершённые</button>
    </div>
    {error && <div className='error'>{error}</div>}
    <TaskList tasks={tasks} onToggle={toggle} onDelete={remove}/>
  </div>);
};
export default App;