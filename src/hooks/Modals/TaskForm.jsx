import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';

const TaskForm = ({ filteredTask, refetch, setIsEditModalOpen }) => {
    const { title, description, category, _id } = filteredTask;

    const updateTask = (e) => {
        e.preventDefault();
        const title = e.target.title.value;
        const description = e.target.description.value;
        const category = e.target.category.value;

        const taskUpdate = { title, description, category };

        axios.put(`https://to-do-server-black.vercel.app/todos/${_id}`, taskUpdate)
            .then(result => {
                // console.log(result.data);
                refetch();
                setIsEditModalOpen(false);
            });
    };

    return (
        <div className="max-w-lg mx-auto bg-white  rounded-lg p-6 ">
            <Toaster />
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-5">Update Task</h2>

            <form onSubmit={updateTask} className="space-y-4">
                {/* Title Input */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        defaultValue={title}
                        name="title"
                        className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        placeholder="Enter title"
                    />
                </div>

                {/* Description Input */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        rows="3"
                        defaultValue={description}
                        name="description"
                        className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        placeholder="Enter description"
                    />
                </div>

                {/* Category Select Dropdown */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <select 
                        name="category" 
                        defaultValue={category || "To-Do"} 
                        className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    >
                        <option value="To-Do">To-Do</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Done">Done</option>
                    </select>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-300"
                >
                    Update Task
                </button>
            </form>
        </div>
    );
};

export default TaskForm;
