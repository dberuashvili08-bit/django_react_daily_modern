import React, { useState } from 'react';
interface Props{ onAdd:(title:string, description:string)=>Promise<void> }
const TaskForm: React.FC<Props> = ({onAdd}) => {
  const [title,setTitle]=useState(''); const [description,setDescription]=useState('');
  return (<form className='task-form' onSubmit={async e=>{e.preventDefault(); if(title.trim()){await onAdd(title,description); setTitle(''); setDescription('');}}}>
    <input value={title} onChange={e=>setTitle(e.target.value)} placeholder='Название задачи' required />
    <textarea value={description} onChange={e=>setDescription(e.target.value)} placeholder='Описание (необязательно)' />
    <button type='submit'>Добавить</button>
  </form>);
};
export default TaskForm;