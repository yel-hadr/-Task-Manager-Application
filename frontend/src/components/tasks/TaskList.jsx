import React, { useState, useEffect } from 'react';
import TaskModal from './TaskModal';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    // Fetch tasks from API
    const fetchTasks = async () => {
      try {
        // Implement task fetching logic
        // Example:
        // const response = await taskService.getTasks();
        // setTasks(response.data);
      } catch (error) {
        console.error('Failed to fetch tasks', error);
      }
    };

    fetchTasks();
  }, []);

  const handleEditTask = (task) => {
    setSelectedTask(task);
  };

  const handleDeleteTask = async (taskId) => {
    try {
      // Implement delete logic
      // await taskService.deleteTask(taskId);
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (error) {
      console.error('Failed to delete task', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl mb-4">My Tasks</h2>
      <div className="grid gap-4">
        {tasks.map(task => (
          <div 
            key={task.id} 
            className="bg-white shadow rounded p-4 flex justify-between items-center"
          >
            <div>
              <h3 className="font-bold">{task.title}</h3>
              <p>{task.description}</p>
              <span className={`
                px-2 py-1 rounded text-sm 
                ${task.status === 'completed' ? 'bg-green-200' : 'bg-yellow-200'}
              `}>
                {task.status}
              </span>
            </div>
            <div>
              <button 
                onClick={() => handleEditTask(task)} 
                className="mr-2 text-blue-500"
              >
                Edit
              </button>
              <button 
                onClick={() => handleDeleteTask(task.id)} 
                className="text-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedTask && (
        <TaskModal 
          task={selectedTask} 
          onClose={() => setSelectedTask(null)} 
        />
      )}
    </div>
  );
};

export default TaskList;