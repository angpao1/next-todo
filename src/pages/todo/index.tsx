import React, {useState} from "react";
import {useRouter} from "next/navigation";
import {useAuth} from "@/hook/useAuth";
import {useTasks} from "@/hook/useTasks";

interface Task {
    id: string;
    title: string;
}

interface Data {
    tasks: Task[];
}

export default function TodoPage() {

    const router = useRouter();

    const userId = useAuth();

    const handleLogout = () => {
        localStorage.removeItem('user');
        router.push('/signin');
    };

    const {loading, error, data, addTask, updateTask, deleteTask} = useTasks() as {
        data: Data,
        loading: boolean,
        error: any,
        addTask: Function,
        updateTask: Function,
        deleteTask: Function
    };


    const [editingTask, setEditingTask] = useState<string | null>(null);
    const [newTitle, setNewTitle] = useState('');
    const [taskInput, setTaskInput] = useState('');

    const renderTasks = () => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;
        if (!data || !data.tasks) return null;

        return data.tasks.map(({id, title}) => (
            <div key={id} className="flex justify-between items-center mb-2">
                {editingTask === id ? (
                    <input
                        type="text"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        className="border rounded p-1"
                    />
                ) : (
                    title
                )}
                <div>
                    {/* Edit and Delete buttons */}
                    {editingTask === id ? (
                        <button onClick={() => handleUpdateTask(id)}
                                className="bg-green-500 text-white p-2 rounded ml-2">Save</button>
                    ) : (
                        <button onClick={() => {
                            setEditingTask(id);
                            setNewTitle(title);
                        }} className="bg-blue-500 text-white p-2 rounded ml-2">Edit</button>
                    )}
                    <button onClick={() => handleDeleteTask(id)}
                            className="bg-red-500 text-white p-2 rounded ml-2">Delete
                    </button>
                </div>
            </div>
        ));
    };

    const handleAddTask = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await addTask({variables: {title: taskInput, user_id: userId}});
        setTaskInput('');
    };

    const handleUpdateTask = async (id: string) => {
        await updateTask({variables: {id, title: newTitle}});
        setEditingTask(null);  // Reset the editingTask state when done
    };

    const handleDeleteTask = async (id: string) => {
        await deleteTask({variables: {id}});
    };

    return (

        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded"
                >
                    Logout
                </button>

                {renderTasks()}
                <form className="mt-8 space-y-6" onSubmit={handleAddTask}>
                    <input type="hidden" name="remember" value="true"/>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="task" className="sr-only">New Task</label>
                            <input
                                id="task"
                                name="task"
                                type="text"
                                autoComplete="off"
                                required
                                value={taskInput}
                                onChange={(e) => setTaskInput(e.target.value)}
                                placeholder="New task"
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            />
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Add Task
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}