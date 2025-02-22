import { useState, useEffect } from 'react';
import useToDos from "../../hooks/Todos/useToDos";
import useAxiosPublic from "../../hooks/AxiosPublic/useAxiosPublic";
import { Modal, Input, Select, message } from 'antd';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Loading from '../shared/Loading/Loading';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import SortableItem from './SortableItem';

const Category = () => {
    const { todos, isLoading, refetch } = useToDos();
    const axiosPublic = useAxiosPublic();
    const categories = ["To-Do", "In Progress", "Done"];
    const [tasks, setTasks] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);

    // Update tasks when todos change
    useEffect(() => {
        setTasks(todos);
    }, [todos]);

    // Modal state
    const [form, setForm] = useState({
        _id: '',
        title: '',
        description: '',
        category: 'To-Do'
    });

    // Drag End Handler
    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        setTasks((prevTasks) => {
            const oldIndex = prevTasks.findIndex((t) => t._id === active.id);
            const newIndex = prevTasks.findIndex((t) => t._id === over.id);
            return arrayMove(prevTasks, oldIndex, newIndex);
        });
    };

    // Delete Task
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
                { label: 'No' },
            ],
        });
    };

    const handleEdit = (task) => {
        console.log(task);

        setForm({
            _id: task._id,
            title: task.title,
            description: task.description,
            category: task.category,
        });
        setIsModalVisible(true); // Open the modal
    };



    //     // Function to handle submitting updated task
    const handleSubmit = async () => {
        // console.log(form._id)
        try {
            const taskId = form._id;
            const updatedData = {
                title: form.title,
                description: form.description,
                category: form.category,
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
            setIsModalVisible(false);
        }
    };


    // Function to close the modal
    const handleCancel = () => {
        setIsModalVisible(false);
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
        return <Loading />;
    }

    return (
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <div className="flex flex-col md:flex-row gap-4 p-4">
                {categories.map((category) => (
                    <div key={category} className={`flex-1  rounded-lg p-4  
                    
                        ${category == 'To-Do' ? "bg-[#c98b9b34]":category == 'In Progress' ? "bg-[#e6b89c24]": 
                            "bg-[#a2d1f55a]"}}


                    `}>
                        <h3 className={`text-center text-base py-1 md:text-lg font-bold ${category == 'To-Do' ? "bg-[#c98b9b3b]": category == 'In Progress' ? "bg-[#e6b89c24]": 
                            "bg-[#a2d1f55a]"} mb-2 md:mb-4`} >{category}</h3>
                        
                        <SortableContext items={tasks.filter((task) => task.category === category).map((task) => task._id)} strategy={verticalListSortingStrategy}>
                            {tasks
                                .filter((task) => task.category === category)
                                .map((task) => (
                                    <SortableItem key={task._id} id={task._id}>
                                        <div className="p-2 border m-2 bg-white rounded-md border-gray-300 flex justify-between items-center">
                                            <div>
                                                <h4 className="font-semibold">{task.title}</h4>
                                                <p className="text-sm text-gray-600">{task.description}</p>
                                            </div>
                                            <div className="flex gap-2">
                                                <AiOutlineEdit
                                                    onMouseDown={() => handleEdit(task)}
                                                    className="cursor-pointer text-blue-500 hover:text-blue-700"
                                                    size={20}
                                                />
                                                <AiOutlineDelete
                                                    onMouseDown={(e) => {
                                                        e.stopPropagation();
                                                        handleDelete(task._id);
                                                    }}
                                                    className="cursor-pointer text-red-500 hover:text-red-700"
                                                    size={20}
                                                />
                                            </div>
                                        </div>
                                    </SortableItem>
                                ))}
                        </SortableContext>
                    </div>
                ))}
            </div>
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
        </DndContext>
    );
};

export default Category;

