import { useState, useEffect } from "react";

export default function TodoList({ darkMode }) {
  
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  
  const [task, setTask] = useState("");
  
 
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  
 
  const [filter, setFilter] = useState("all");
  
 
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);
  
  
  const addTask = () => {
    if (task.trim() === "") return;
    
    const newTask = {
      id: Date.now(), 
      text: task,
      completed: false
    };
    
    setTasks([...tasks, newTask]);
    setTask("");
  };
  
  
  const removeTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };
  
  
  const toggleComplete = (id) => {
    setTasks(tasks.map(task => 
      task.id === id 
        ? { ...task, completed: !task.completed } 
        : task
    ));
  };
  
  
  const startEditing = (task) => {
    setEditingId(task.id);
    setEditText(task.text);
  };
  
  
  const saveEdit = () => {
    if (editText.trim() === "") return;
    
    setTasks(tasks.map(task => 
      task.id === editingId 
        ? { ...task, text: editText } 
        : task
    ));
    
    setEditingId(null);
    setEditText("");
  };
  
  
  const handleEditKeyPress = (e) => {
    if (e.key === 'Enter') {
      saveEdit();
    } else if (e.key === 'Escape') {
      setEditingId(null);
      setEditText("");
    }
  };
  
  
  const filteredTasks = tasks.filter(task => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true; 
  });
  
  return (
    <div className="todo-container">
      <h2>To-Do List</h2>
      
      <div className="add-task-form">
        <input
          type="text"
          placeholder="Add a new task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTask()}
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      
      <div className="filter-buttons">
        <button 
          className={filter === "all" ? "active" : ""}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button 
          className={filter === "pending" ? "active" : ""}
          onClick={() => setFilter("pending")}
        >
          Pending
        </button>
        <button 
          className={filter === "completed" ? "active" : ""}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
      </div>
      
      <ul className="todo-list">
        {filteredTasks.length === 0 ? (
          <li>No tasks found</li>
        ) : (
          filteredTasks.map((t) => (
            <li 
              key={t.id} 
              className={`todo-item ${t.completed ? "completed" : ""}`}
            >
              {editingId === t.id ? (
                <div className="edit-form">
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyDown={handleEditKeyPress}
                    autoFocus
                  />
                  <button onClick={saveEdit}>Save</button>
                </div>
              ) : (
                <>
                  <div className="todo-content">
                    <input
                      type="checkbox"
                      checked={t.completed}
                      onChange={() => toggleComplete(t.id)}
                    />
                    <span className="todo-text">{t.text}</span>
                  </div>
                  <div className="todo-actions">
                    <button 
                      onClick={() => startEditing(t)}
                      disabled={t.completed}
                    >
                      Edit
                    </button>
                    <button onClick={() => removeTask(t.id)}>
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))
        )}
      </ul>
      
      <div className="todo-stats">
        <span>Total: {tasks.length}</span>
        <span>Completed: {tasks.filter(t => t.completed).length}</span>
        <span>Pending: {tasks.filter(t => !t.completed).length}</span>
      </div>
    </div>
  );
}