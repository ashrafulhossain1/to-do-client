import { useState, useContext, useEffect } from 'react';
import { Modal, Button, Input, Select, message } from 'antd';
import { PlusOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import dayjs from 'dayjs';
import useAxiosPublic from '../../hooks/AxiosPublic/useAxiosPublic';
import useToDos from '../../hooks/Todos/useToDos';

const TaskHeading = () => {
    const { user } = useContext(AuthContext);
    const {todos, refetch } = useToDos();
    const axiosPublic = useAxiosPublic();
    const [isModalVisible, setIsModalVisible] = useState(false);
    // const [tasks, setTasks] = useState([]);

    const [form, setForm] = useState({
        title: '',
        description: '',
        category: 'To-Do',
    });

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    // Handle category selection
    const handleCategoryChange = (value) => {
        setForm({ ...form, category: value });
    };

    // Handle modal visibility
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    // Handle task submission
    const handleSubmit = () => {
        if (!form.title.trim()) {
            message.error('Title is required!');
            return;
        }

        if (form.title.length > 50) {
            message.error('Title cannot exceed 50 characters!');
            return;
        }

        if (form.description.length > 200) {
            message.error('Description cannot exceed 200 characters!');
            return;
        }

        const newTask = {
            title: form.title,
            description: form.description,
            category: form.category,
            isoDate: new Date().toISOString(),
            email: user?.email || 'Guest',
            name: user?.displayName || 'Anonymous',
            timestamp: Date.now(),
        };

        axiosPublic.post('/addTodo', newTask)
            .then((res) => {
                if (res.data.insertedId) {
                    message.success('Task added successfully');
                    refetch();
                    setForm({
                        title: '',
                        description: '',
                        category: 'To-Do',
                    });
                    setIsModalVisible(false);
                }
            })
            .catch(() => {
                message.error('Failed to add task');
            });
    };

    return (
        <div className="md:pt-4 flex md:gap-4 flex-col md:flex-row md:gap-y-1 justify-between items-center container mx-auto">
            {/* Left - Today's Date */}
            <span className="bg-[#c98b9b3b]  text-black  px-6 py-2 md:rounded-xl text-sm font-medium text-center order-1 h-12 flex items-center justify-center w-full md:w-auto">
                {dayjs().format('MMMM DD, YYYY')}
            </span>

            {/* Center - Title */}
            <h1 className="bg-[#ffe3c3d2] text-black  md:flex-grow w-full md:w-auto px-6 py-2 md:rounded-xl md:text-lg font-semibold text-center md:order-2 order-5 h-12 flex items-center justify-center">
                Task Management
            </h1>

            {/* Right - Add Button & Task Counter */}
            <div className="bg-[#c98b9b3b]  text-black  px-6 py-2 md:rounded-xl flex items-center gap-4  order-3 md:text-lg font-semibold h-12 w-full md:w-auto justify-center">
                <Button
                    type="primary"
                    className="font-semibold md:text-lg bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center h-10"
                    icon={<PlusOutlined />}
                    onClick={showModal}
                >
                    Add
                </Button>

                <div className="flex items-center gap-2">
                    <CheckCircleOutlined className="text-blue-600 text-xl" />
                    <span className="text-lg font-semibold">{todos?.length}</span>
                </div>
            </div>

            {/* Modal for add task */}
            <Modal
                title="Add New Task"
                open={isModalVisible}
                onOk={handleSubmit}
                onCancel={handleCancel}
                okText="Add Task"
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

export default TaskHeading;
