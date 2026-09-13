'use client'

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const Main = () => {
  const [tasks, setTasks] = useState([])
  const [input, setInput] = useState({ title: '', description: '', dueDate: '' })
  const [selectedTask, setSelectedTask] = useState(null)
  const [editbutton, setEditbutton] = useState(false)

  const resetForm = () => {
    setInput({ title: '', description: '', dueDate: '' })
    setSelectedTask(null)
    setEditbutton(false)
  }

  const getTasks = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/v1/task/all-tasks', { withCredentials: true })
      if (res.data.success) setTasks(res.data.tasks)
    } catch (error) { toast.error(error?.response?.data?.message || 'Something went wrong') }
  }

  const uploadTaskHandler = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:8000/api/v1/task/upload', input, { withCredentials: true })
      if (res.data.success) { toast.success(res.data.message); getTasks(); resetForm() }
    } catch (error) { toast.error(error?.response?.data?.message || 'Something went wrong') }
  }

  const editTaskHandler = async () => {
    try {
      const res = await axios.put(`http://localhost:8000/api/v1/task/${selectedTask._id}/edit-task`, input, { withCredentials: true })
      if (res.data.success) { toast.success(res.data.message); getTasks(); resetForm() }
    } catch (error) { toast.error(error?.response?.data?.message || 'Something went wrong') }
  }

  const deleteTaskHandler = async (task) => {
    try {
      const res = await axios.get(`http://localhost:8000/api/v1/task/${task._id}/delete-task`, { withCredentials: true })
      if (res.data.success) { toast.success(res.data.message); getTasks() }
    } catch (error) { toast.error(error?.response?.data?.message || 'Something went wrong') }
  }

  useEffect(() => { getTasks() }, [])

  return (
    <main className="min-h-screen w-full bg-slate-950 px-4 py-6 sm:px-6 md:px-8">
      <form onSubmit={uploadTaskHandler} className="w-full max-w-xl mx-auto mt-4 sm:mt-6 p-5 sm:p-7 bg-blue-700/10 border-2 border-slate-500 rounded-xl text-white">
        <h1 className="text-center font-bold font-serif text-xl sm:text-2xl">{editbutton ? 'Edit Task' : 'Add Task'}</h1>

        <div className="flex flex-col mt-4 font-bold font-serif">
          <label htmlFor="title">Enter task</label>
          <input className="w-full mt-1 p-2 border-2 border-blue-600 rounded-lg bg-white text-black outline-none" name="title" value={input.title} onChange={e => setInput({ ...input, title: e.target.value })} type="text" id="title" placeholder="Enter your task" />
        </div>

        <div className="flex flex-col mt-4 font-bold font-serif">
          <label htmlFor="description">Enter description</label>
          <textarea className="w-full mt-1 p-2 min-h-24 border-2 border-blue-600 rounded-lg bg-white text-black outline-none resize-y" name="description" value={input.description} onChange={e => setInput({ ...input, description: e.target.value })} id="description" placeholder="Enter your description" />
        </div>

        <div className="flex flex-col mt-4 font-bold font-serif">
          <label htmlFor="date">Enter due date</label>
          <input className="w-full mt-1 p-2 border-2 border-blue-600 rounded-lg bg-white text-black outline-none" name="dueDate" value={input.dueDate} onChange={e => setInput({ ...input, dueDate: e.target.value })} type="date" id="date" />
        </div>

        <div className="flex justify-center gap-3 mt-6">
          {editbutton && <button type="button" onClick={resetForm} className="px-4 py-2 rounded-xl bg-gray-700 border-2 border-gray-300">Cancel</button>}
          <button type={editbutton ? 'button' : 'submit'} onClick={editbutton ? editTaskHandler : undefined} className="px-4 py-2 rounded-xl bg-blue-600 border-2 border-blue-200 hover:bg-blue-500 active:scale-95">
            {editbutton ? 'Edit Task' : 'Add Task'}
          </button>
        </div>
      </form>

      <section className="w-full mt-8 sm:mt-10">
        <div className="max-w-7xl mx-auto text-white text-center">
          <h2 className="font-bold font-serif text-xl sm:text-2xl">Your Tasks</h2>
          <hr className="my-3 border-slate-700" />
        </div>

        <div className="max-w-7xl mx-auto mt-5 flex flex-wrap justify-center gap-4">
          {tasks.map(task => (
            <div key={task._id} className="w-full sm:w-[calc(50%-8px)] lg:w-[calc(33.333%-11px)] xl:w-[30%] min-w-0 p-4 border-2 border-blue-200 rounded-xl bg-slate-900/50 text-white hover:border-blue-400 hover:shadow-lg transition-all">
              <div className="p-1 break-words"><b>Title: </b>{task.title}</div>
              <div className="p-1 break-words"><b>Description: </b>{task.description}</div>
              <div className="p-1 break-words"><b>Due Date: </b>{task.dueDate}</div>

              <div className="flex gap-3 mt-4">
                <button onClick={() => { setSelectedTask(task); setInput({ title: task.title, description: task.description, dueDate: task.dueDate }); setEditbutton(true); window.scrollTo({ top: 0, behavior: 'smooth' }) }} className="flex-1 px-3 py-2 rounded-xl bg-blue-700 border-2 border-blue-200 hover:bg-blue-600">Edit</button>
                <button onClick={() => deleteTaskHandler(task)} className="flex-1 px-3 py-2 rounded-xl bg-red-700 border-2 border-red-300 hover:bg-red-600">Delete</button>
              </div>
            </div>
          ))}
        </div>

        {tasks.length === 0 && <p className="text-center text-gray-400 mt-8">No tasks found. Add your first task!</p>}
      </section>
    </main>
  )
}

export default Main
