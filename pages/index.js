import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/globals.css';

export default function Home() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks`)
            .then(response => setTasks(response.data))
            .catch(error => console.error('Error fetching tasks:', error));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks`, { title: newTask });
            setTasks([...tasks, response.data]);
            setNewTask('');
        } catch (error) {
            console.error('Error creating task:', error);
        }
    };

    return (
        <div className="container">
            <h1>Task Manager</h1>
            <div>
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="New task"
                />
                <button onClick={handleSubmit}>Add Task</button>
            </div>
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>{task.title}</li>
                ))}
            </ul>
        </div>
    );
}