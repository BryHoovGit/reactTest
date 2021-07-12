// Only needed if using classes
// import React from 'react'

import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'

//Comes from Tasks.js file originally
// Use effect is a hook used to create side effects when page loads
import { useState, useEffect } from 'react';

function App() {
  //Toggles new form
  const [showAddTask, setShowAddTask] = useState(false)

  //From Tasks.js
  const [tasks, setTasks] = useState([]);

// Use effect is an arrow function. getTasks receives the data from fetchTasks and then sets tasks to the state
useEffect(() => {
  const getTasks = async() => {
    const tasks = await fetchTasks()
    setTasks(tasks)
  }
  getTasks()
}, [])

// fetch tasks finds our tasks and returns the data from the server
const fetchTasks = async() => {
  const res = await fetch('http://localhost:5000/tasks')
  const data = await res.json()

  return data
}

const fetchTask = async(id) => {
  const res = await fetch(`http://localhost:5000/tasks/${id}`)
  const data = await res.json()

  return data
}


//Add Task
const addTask = async(task) => {
  const res = await fetch('http://localhost:5000/tasks', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(task)
  })

  //saves data from res.json()
  const data = await res.json()

  //spreads existing tasks and adds data from res.json()
  setTasks([...tasks, data])


  // const id = Math.floor(Math.random() * 10000) + 1
  // const newTask = { id, ...task }
  // setTasks([...tasks, newTask])
}

//Delete Task
const deleteTask = async(id) => {
  const res = await fetch(`http://localhost:5000/tasks/${id}`, {
    method: 'DELETE',
  })
  res.status === 200
    ? setTasks(tasks.filter((task) => task.id !== id))
    : alert('Error Deleting This Task')
};

//Toggle Reminder 
const toggleReminder = async(id) => {
  const toggleTask = await fetchTask(id)
  const updatedTask = { ...toggleTask, reminder: !toggleTask.reminder } 

  const res = await fetch(`http://localhost:5000/tasks/${id}`, {
    method: 'PUT',
    headers: {
    'Content-type': 'application/json'
    },
    body: JSON.stringify(updatedTask)
  })

  const data = await res.json()

  setTasks(tasks.map((task) => task.id === id ? {...task, reminder: data.reminder} : task))
}

  return (
    <div className="container">
      <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
      {showAddTask && <AddTask onAdd={addTask}/>}
      {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/> : 'No Tasks To Show'}
    </div>
  );
}

// class App extends React.Component {
//   render() {
//     return <h1>Hello from a class!</h1>
//   }
// }

export default App;
