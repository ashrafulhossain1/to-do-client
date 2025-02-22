import React, { useState } from 'react';
import useToDos from "../../hooks/Todos/useToDos";
import useAxiosPublic from "../../hooks/AxiosPublic/useAxiosPublic";
import { Modal, Input, Select, Button, message } from 'antd';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { confirmAlert } from 'react-confirm-alert'; // For confirmation dialogs
import 'react-confirm-alert/src/react-confirm-alert.css'; // Styles for confirmation modal
import Loading from '../shared/Loading/Loading';

const Category = () => {
    const { todos, isLoading, refetch } = useToDos();
    const axiosPublic = useAxiosPublic();

    // Group tasks by category using filter
    const toDoTasks = todos?.filter((task) => task.category === 'To-Do') || [];
    const inProgressTasks = todos?.filter((task) => task.category === 'In Progress') || [];
    const doneTasks = todos?.filter((task) => task.category === 'Done') || [];

    // Modal state
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form, setForm] = useState({
        _id: '', // Add task ID to track which task is being edited
        title: '',
        description: '',
        category: 'To-Do',
    });

    // Function to handle editing a task
    const handleEdit = (task) => {
        setForm({
            _id: task._id, // Include the task ID
            title: task.title,
            description: task.description,
            category: task.category,
        });
        setIsModalVisible(true); // Open the modal
    };

    // Function to handle deleting a task
    const handleDelete = (id) => {
        confirmAlert({
            title: 'Confirm Deletion',
            message: 'Are you sure you want to delete this task?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        try {
                            const res = await axiosPublic.delete(`/todos/${id}`);
                            if (res.data.deletedCount > 0) {
                                refetch(); // Refetch data after deletion
                                message.success('Task deleted successfully!');
                            }
                        } catch (error) {
                            console.error('Error deleting task:', error);
                            message.error('Failed to delete task. Please try again.');
                        }
                    },
                },
                {
                    label: 'No',
                },
            ],
        });
    };

    // Function to handle submitting updated task
    const handleSubmit = async () => {
        // console.log(form._id)
        try {
            const taskId = form._id; // Get the task ID from the form state
            const updatedData = {
                title: form.title,
                description: form.description,
                category: form.category, // Maps to "status" in your API
            };
            const response = await axiosPublic.patch(`/todos/${taskId}`, updatedData);
            if (response.data.modifiedCount > 0) {
                message.success('Task updated successfully!');
                refetch(); // Refetch the data to reflect the changes
            } else {
                message.warning('No changes were made to the task.');
            }
        } catch (error) {
            console.error('Error updating task:', error);
            message.error('Failed to update task. Please try again.');
        } finally {
            setIsModalVisible(false); // Close the modal after submission
        }
    };



    // Function to close the modal
    const handleCancel = () => {
        setIsModalVisible(false); // Close the modal
    };

    // Function to handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({ ...prevForm, [name]: value }));
    };

    // Function to handle category changes
    const handleCategoryChange = (value) => {
        setForm((prevForm) => ({ ...prevForm, category: value }));
    };

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div className="flex flex-col md:flex-row gap-4 lg:gap-6 p-4 md:p-6 md:min-h-[700px]">
            {/* To-Do Section */}
            <div className="flex-1 rounded-lg bg-[#e6b89c24]">
                <h3 className="text-center text-base py-1 md:text-lg font-bold bg-[#c98b9b3b] mb-2 md:mb-4">To-Do</h3>
                <div>
                    {toDoTasks.length > 0 ? (
                        toDoTasks.map((task) => (
                            <div key={task._id} className="p-2 border m-2 bg-black/5 rounded-md border-gray-300 flex justify-between items-center">
                                <div>
                                    <h4 className="font-semibold">{task.title}</h4>
                                    <p className="text-sm text-gray-600">{task.description}</p>
                                </div>
                                <div className="flex gap-2">
                                    <AiOutlineEdit
                                        onClick={() => handleEdit(task)}
                                        className="cursor-pointer text-blue-500 hover:text-blue-700"
                                        size={20}
                                    />
                                    <AiOutlineDelete
                                        onClick={() => handleDelete(task._id)}
                                        className="cursor-pointer text-red-500 hover:text-red-700"
                                        size={20}
                                    />
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-gray-600 italic">No tasks in this category</div>
                    )}
                </div>
            </div>

            {/* In Progress Section */}
            <div className="flex-1 rounded-lg bg-[#ffe3c357]">
                <h3 className="text-center text-base py-1 md:text-lg font-bold bg-[#e6b89c24] mb-2 md:mb-4">In Progress</h3>
                <div>
                    {inProgressTasks.length > 0 ? (
                        inProgressTasks.map((task) => (
                            <div key={task._id} className="p-2 border m-2 bg-black/5 rounded-md border-gray-300 flex justify-between items-center">
                                <div>
                                    <h4 className="font-semibold">{task.title}</h4>
                                    <p className="text-sm text-gray-600">{task.description}</p>
                                </div>
                                <div className="flex gap-2">
                                    <AiOutlineEdit
                                        onClick={() => handleEdit(task)}
                                        className="cursor-pointer text-blue-500 hover:text-blue-700"
                                        size={20}
                                    />
                                    <AiOutlineDelete
                                        onClick={() => handleDelete(task._id)}
                                        className="cursor-pointer text-red-500 hover:text-red-700"
                                        size={20}
                                    />
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-gray-600 italic">No tasks in this category</div>
                    )}
                </div>
            </div>

            {/* Done Section */}
            <div className="flex-1 rounded-lg bg-[#a2d1f53d]">
                <h3 className="text-center text-base py-1 md:text-lg font-bold bg-[#a2d1f55a] mb-2 md:mb-4">Done</h3>
                <div>
                    {doneTasks.length > 0 ? (
                        doneTasks.map((task) => (
                            <div key={task._id} className="p-2 border m-2 bg-black/5 rounded-md border-gray-300 flex justify-between items-center">
                                <div>
                                    <h4 className="font-semibold">{task.title}</h4>
                                    <p className="text-sm text-gray-600">{task.description}</p>
                                </div>
                                <div className="flex gap-2">
                                    <AiOutlineEdit
                                        onClick={() => handleEdit(task)}
                                        className="cursor-pointer text-blue-500 hover:text-blue-700"
                                        size={20}
                                    />
                                    <AiOutlineDelete
                                        onClick={() => handleDelete(task._id)}
                                        className="cursor-pointer text-red-500 hover:text-red-700"
                                        size={20}
                                    />
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-gray-600 italic">No tasks in this category</div>
                    )}
                </div>
            </div>

            {/* Modal for Editing Task */}
            <Modal
                title="Edit Task"
                open={isModalVisible}
                onOk={handleSubmit}
                onCancel={handleCancel}
                okText="Save Changes"
                cancelText="Cancel"
            >
                <div className="mb-4">
                    <label className="block mb-2 font-medium">Title (Required, Max 50 Characters)</label>
                    <Input
                        placeholder="Enter task title"
                        name="title"
                        value={form.title}
                        onChange={handleInputChange}
                        maxLength={50}
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 font-medium">Description (Max 200 Characters)</label>
                    <Input.TextArea
                        placeholder="Enter task description"
                        name="description"
                        value={form.description}
                        onChange={handleInputChange}
                        maxLength={200}
                        rows={4}
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 font-medium">Category</label>
                    <Select
                        value={form.category}
                        className="w-full"
                        onChange={handleCategoryChange}
                        options={[
                            { value: 'To-Do', label: 'To-Do' },
                            { value: 'In Progress', label: 'In Progress' },
                            { value: 'Done', label: 'Done' },
                        ]}
                    />
                </div>
            </Modal>
        </div>
    );
};

export default Category;