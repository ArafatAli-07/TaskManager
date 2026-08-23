'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const Main = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState({
    title: "",
    description: "",
    dueDate:""
  })
  const [selectedTask, setSelectedTask] = useState(null);
  const [editbutton, setEditbutton] = useState(false)

  const editTaskhandler = async()=>{
    try {
      const res = await axios.put(`http://localhost:8000/api/v1/task/${selectedTask._id}/edit-task`,input, {withCredentials:true})
      if(res.data.success){
        toast.success(res.data.message);
        getTasks();
        setEditbutton(false);
        setInput({
          title:"",
          description:"",
          dueDate:""
        })
      }

    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  const deleteTaskhandler = async(task)=>{
    try {
      const res = await axios.get(`http://localhost:8000/api/v1/task/${task._id}/delete-task`, {withCredentials:true})
      if(res.data.success){
        toast.success(res.data.message);
        getTasks();
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  const handleChange = (e)=>{
    setInput({...input, [e.target.name]:e.target.value});
  }

  const uploadTaskHandeler = async (e) =>{
    e.preventDefault();   
    try {
      const res = await axios.post(`http://localhost:8000/api/v1/task/upload`,input, {withCredentials:true})

      if(res.data.success){
        toast.success(res.data.message);
        getTasks();
        setInput({
          title:"",
          description:"",
          dueDate:""
        })
      }

    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  const getTasks = async() =>{
    try {
      const res = await axios.get(`http://localhost:8000/api/v1/task/all-tasks`, {withCredentials:true})

      if(res.data.success){
        setTasks(res.data.tasks)
      }

    } catch (error) {
      toast.error(error.response.data.message)
      
    }
  }

  useEffect(() => {
    getTasks();
  }, []);
  
  return (
    <div className='flex flex-col items-center bg-slate-950 min-h-screen'>
      <form onSubmit={uploadTaskHandeler} className='bg-blue-700/7 border-2 border-slate-500 rounded-lg backdrop-blur-md w-xl p-7 text-white mt-10'>
        <h1 className='flex justify-center font-bold font-serif text-2xl '>Add Task</h1>
        <div className='flex flex-col font-bold font-serif mt-2'>
          <label htmlFor='title' >Enter task</label>
          <input className='border-2 border-blue-600 bg-white rounded-lg p-1 text-black ' name= "title" value={input.title} onChange={handleChange} type='text' id='title' placeholder='Enter your Task'/>
        </div>
        <div className='flex flex-col justify-center font-bold font-serif mt-2'>
          <label htmlFor='description' >Enter description</label>
          <input className='border-2 border-blue-600 bg-white rounded-lg p-1 text-black ' name= "description" value={input.description} onChange={handleChange}  type='text' id='description' placeholder='Enter your description '/>
        </div>
        <div className='flex flex-col justify-center font-bold font-serif mt-2'>
          <label htmlFor='date' >Enter due date</label>
          <input className='border-2 border-blue-600 bg-white rounded-lg p-1 text-black '  name= "dueDate" value={input.dueDate} onChange={handleChange}type='date' id='date' placeholder='Enter due date'/>
        </div>
        <div className='flex item-center justify-center'>
          {
            editbutton ? (
              <button type="button" onClick={editTaskhandler} className='border-2 border-blue-200 bg-blue-500  font-bold font-serif mt-6 p-1 px-3 rounded-xl'>Edit Task</button>
            ):(
              <button type="submit" className='border-2 border-blue-200 bg-blue-500  font-bold font-serif mt-6 p-1 px-3 rounded-xl'>Add Task</button>
            )
          }
        </div>
      </form>

      <section className='w-full text-center '>
        <div className='text-white my-5 mx-10'>
          <h2 className='font-bold font-serif text-2xl'>Your task</h2>
          <hr className='my-3'/>
        </div>
        <div className='text-white flex flex-wrap gap-4 justify-center'>
          {
            tasks.map((task,index)=>{
              return (
                <div key={index}className='p-3 border-2 border-blue-200 rounded-xl w-[30vw] hover:scale-110 duration-300 cursor-pointer'>
                   <div className='p-1 '><span className='font-bold font-serif'>Title : </span>{task.title}</div>
                   <div className='p-1 '><span className='font-bold font-serif'>Description : </span>{task.description}</div>
                   <div className='p-1 '><span className='font-bold font-serif'>DueDate : </span>{task.dueDate}</div>

                   <div className='flex justify-between'>
                      <button onClick={()=>{
                        setSelectedTask(task)
                        setInput({
                        title: task.title,
                        description: task.description,
                        dueDate: task.dueDate
                      })
                        setEditbutton(true)
                      }} className=' border-2 border-blue-200 rounded-xl px-2 py-1'>Edit</button>
                      <button onClick={()=>deleteTaskhandler(task)} className=' border-2 border-blue-200 rounded-xl px-2 py-1'>Delete</button>
                   </div>
                </div>
              )
            })
          }
        </div>
      </section>
    </div>
  )
}

export default Main
