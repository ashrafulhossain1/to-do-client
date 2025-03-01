// import React, { useState } from 'react';
// import useToDos from "../../hooks/Todos/useToDos";
// import useAxiosPublic from "../../hooks/AxiosPublic/useAxiosPublic";
// import { Modal, Input, Select, Button, message } from 'antd';
// import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
// import { confirmAlert } from 'react-confirm-alert'; // For confirmation dialogs
// import 'react-confirm-alert/src/react-confirm-alert.css'; // Styles for confirmation modal
// import Loading from '../shared/Loading/Loading';

// const Category = () => {
//     const { todos, isLoading, refetch } = useToDos();
//     const axiosPublic = useAxiosPublic();

//     // Group tasks by category using filter
//     const toDoTasks = todos?.filter((task) => task.category === 'To-Do') || [];
//     const inProgressTasks = todos?.filter((task) => task.category === 'In Progress') || [];
//     const doneTasks = todos?.filter((task) => task.category === 'Done') || [];

//     // Modal state
//     const [isModalVisible, setIsModalVisible] = useState(false);
//     const [form, setForm] = useState({
//         _id: '', // Add task ID to track which task is being edited
//         title: '',
//         description: '',
//         category: 'To-Do',
//     });

//     // Function to handle editing a task
//     const handleEdit = (task) => {
//         setForm({
//             _id: task._id,
//             title: task.title,
//             description: task.description,
//             category: task.category,
//         });
//         setIsModalVisible(true); // Open the modal
//     };

//     // Function to handle deleting a task
//     const handleDelete = (id) => {
//         confirmAlert({
//             title: 'Confirm Deletion',
//             message: 'Are you sure you want to delete this task?',
//             buttons: [
//                 {
//                     label: 'Yes',
//                     onClick: async () => {
//                         try {
//                             const res = await axiosPublic.delete(`/todos/${id}`);
//                             if (res.data.deletedCount > 0) {
//                                 refetch(); // Refetch data after deletion
//                                 message.success('Task deleted successfully!');
//                             }
//                         } catch (error) {
//                             console.error('Error deleting task:', error);
//                             message.error('Failed to delete task. Please try again.');
//                         }
//                     },
//                 },
//                 {
//                     label: 'No',
//                 },
//             ],
//         });
//     };

//     // Function to handle submitting updated task
//     const handleSubmit = async () => {
//         // console.log(form._id)
//         try {
//             const taskId = form._id;
//             const updatedData = {
//                 title: form.title,
//                 description: form.description,
//                 category: form.category,
//             };
//             const response = await axiosPublic.patch(`/todos/${taskId}`, updatedData);
//             if (response.data.modifiedCount > 0) {
//                 message.success('Task updated successfully!');
//                 refetch(); // Refetch the data to reflect the changes
//             } else {
//                 message.warning('No changes were made to the task.');
//             }
//         } catch (error) {
//             console.error('Error updating task:', error);
//             message.error('Failed to update task. Please try again.');
//         } finally {
//             setIsModalVisible(false);
//         }
//     };



//     // Function to close the modal
//     const handleCancel = () => {
//         setIsModalVisible(false);
//     };

//     // Function to handle input changes
//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setForm((prevForm) => ({ ...prevForm, [name]: value }));
//     };

//     // Function to handle category changes
//     const handleCategoryChange = (value) => {
//         setForm((prevForm) => ({ ...prevForm, category: value }));
//     };

//     if (isLoading) {
//         return <Loading></Loading>
//     }

//     return (
//         <div className="flex flex-col md:flex-row gap-4 lg:gap-6 p-4 md:p-6 md:min-h-[700px]">
//             {/* To-Do Section */}
//             <div className="flex-1 rounded-lg bg-[#e6b89c24]">
//                 <h3 className="text-center text-base py-1 md:text-lg font-bold bg-[#c98b9b3b] mb-2 md:mb-4">To-Do</h3>
//                 <div>
//                     {toDoTasks.length > 0 ? (
//                         toDoTasks.map((task) => (
//                             <div key={task._id} className="p-2 border m-2 bg-black/5 rounded-md border-gray-300 flex justify-between items-center">
//                                 <div>
//                                     <h4 className="font-semibold">{task.title}</h4>
//                                     <p className="text-sm text-gray-600">{task.description}</p>
//                                 </div>
//                                 <div className="flex gap-2">
//                                     <AiOutlineEdit
//                                         onClick={() => handleEdit(task)}
//                                         className="cursor-pointer text-blue-500 hover:text-blue-700"
//                                         size={20}
//                                     />
//                                     <AiOutlineDelete
//                                         onClick={() => handleDelete(task._id)}
//                                         className="cursor-pointer text-red-500 hover:text-red-700"
//                                         size={20}
//                                     />
//                                 </div>
//                             </div>
//                         ))
//                     ) : (
//                         <div className="text-center text-gray-600 italic">No tasks in this category</div>
//                     )}
//                 </div>
//             </div>

//             {/* In Progress Section */}
//             <div className="flex-1 rounded-lg bg-[#ffe3c357]">
//                 <h3 className="text-center text-base py-1 md:text-lg font-bold bg-[#e6b89c24] mb-2 md:mb-4">In Progress</h3>
//                 <div>
//                     {inProgressTasks.length > 0 ? (
//                         inProgressTasks.map((task) => (
//                             <div key={task._id} className="p-2 border m-2 bg-black/5 rounded-md border-gray-300 flex justify-between items-center">
//                                 <div>
//                                     <h4 className="font-semibold">{task.title}</h4>
//                                     <p className="text-sm text-gray-600">{task.description}</p>
//                                 </div>
//                                 <div className="flex gap-2">
//                                     <AiOutlineEdit
//                                         onClick={() => handleEdit(task)}
//                                         className="cursor-pointer text-blue-500 hover:text-blue-700"
//                                         size={20}
//                                     />
//                                     <AiOutlineDelete
//                                         onClick={() => handleDelete(task._id)}
//                                         className="cursor-pointer text-red-500 hover:text-red-700"
//                                         size={20}
//                                     />
//                                 </div>
//                             </div>
//                         ))
//                     ) : (
//                         <div className="text-center text-gray-600 italic">No tasks in this category</div>
//                     )}
//                 </div>
//             </div>

//             {/* Done Section */}
//             <div className="flex-1 rounded-lg bg-[#a2d1f53d]">
//                 <h3 className="text-center text-base py-1 md:text-lg font-bold bg-[#a2d1f55a] mb-2 md:mb-4">Done</h3>
//                 <div>
//                     {doneTasks.length > 0 ? (
//                         doneTasks.map((task) => (
//                             <div key={task._id} className="p-2 border m-2 bg-black/5 rounded-md border-gray-300 flex justify-between items-center">
//                                 <div>
//                                     <h4 className="font-semibold">{task.title}</h4>
//                                     <p className="text-sm text-gray-600">{task.description}</p>
//                                 </div>
//                                 <div className="flex gap-2">
//                                     <AiOutlineEdit
//                                         onClick={() => handleEdit(task)}
//                                         className="cursor-pointer text-blue-500 hover:text-blue-700"
//                                         size={20}
//                                     />
//                                     <AiOutlineDelete
//                                         onClick={() => handleDelete(task._id)}
//                                         className="cursor-pointer text-red-500 hover:text-red-700"
//                                         size={20}
//                                     />
//                                 </div>
//                             </div>
//                         ))
//                     ) : (
//                         <div className="text-center text-gray-600 italic">No tasks in this category</div>
//                     )}
//                 </div>
//             </div>

//             {/* Modal for Editing Task */}
// <Modal
//     title="Edit Task"
//     open={isModalVisible}
//     onOk={handleSubmit}
//     onCancel={handleCancel}
//     okText="Save Changes"
//     cancelText="Cancel"
// >
//     <div className="mb-4">
//         <label className="block mb-2 font-medium">Title (Required, Max 50 Characters)</label>
//         <Input
//             placeholder="Enter task title"
//             name="title"
//             value={form.title}
//             onChange={handleInputChange}
//             maxLength={50}
//         />
//     </div>
//     <div className="mb-4">
//         <label className="block mb-2 font-medium">Description (Max 200 Characters)</label>
//         <Input.TextArea
//             placeholder="Enter task description"
//             name="description"
//             value={form.description}
//             onChange={handleInputChange}
//             maxLength={200}
//             rows={4}
//         />
//     </div>
//     <div className="mb-4">
//         <label className="block mb-2 font-medium">Category</label>
//         <Select
//             value={form.category}
//             className="w-full"
//             onChange={handleCategoryChange}
//             options={[
//                 { value: 'To-Do', label: 'To-Do' },
//                 { value: 'In Progress', label: 'In Progress' },
//                 { value: 'Done', label: 'Done' },
//             ]}
//         />
//     </div>
// </Modal>
//         </div>
//     );
// };

// export default Category;


// import { useState, useEffect } from 'react';
// import useToDos from "../../hooks/Todos/useToDos";
// import useAxiosPublic from "../../hooks/AxiosPublic/useAxiosPublic";
// import { Modal, Input, Select, message } from 'antd';
// import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
// import { confirmAlert } from 'react-confirm-alert';
// import 'react-confirm-alert/src/react-confirm-alert.css';
// import Loading from '../shared/Loading/Loading';
// import { DndContext, closestCenter } from '@dnd-kit/core';
// import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
// import SortableItem from './SortableItem';

// const Category = () => {
//     const { todos, isLoading, refetch } = useToDos();
//     const axiosPublic = useAxiosPublic();

//     const categories = ["To-Do", "In Progress", "Done"];

//     const [tasks, setTasks] = useState([]);
//     const [isModalVisible, setIsModalVisible] = useState(false);

//     // Update tasks when todos change
//     useEffect(() => {
//         setTasks(todos);
//     }, [todos]);

//     // Modal state
//     const [form, setForm] = useState({
//         _id: '',
//         title: '',
//         description: '',
//         category: 'To-Do'
//     });

//     // Drag End Handler
//     const handleDragEnd = (event) => {
//         const { active, over } = event;
//         if (!over || active.id === over.id) return;

//         setTasks((prevTasks) => {
//             const oldIndex = prevTasks.findIndex((t) => t._id === active.id);
//             if (oldIndex === -1) return prevTasks;

//             let updatedTasks = [...prevTasks];
//             const draggedTask = updatedTasks[oldIndex];

//             // Find the new category
//             let newCategory;
//             if (over.id.startsWith("category-")) {
//                 // Dropped in an empty category
//                 newCategory = over.id.replace("category-", "");
//             } else {
//                 // Dropped on an existing task, get its category
//                 newCategory = tasks.find((task) => task._id === over.id)?.category || draggedTask.category;
//             }

//             // Update the category of the dragged task
//             updatedTasks[oldIndex] = { ...draggedTask, category: newCategory };

//             // Reorder tasks if not dropped into an empty category
//             const newIndex = prevTasks.findIndex((t) => t._id === over.id);
//             if (newIndex !== -1) {
//                 return arrayMove(updatedTasks, oldIndex, newIndex);
//             }

//             return updatedTasks;
//         });

//         // Optional: Update category in database
//     };






//     // Delete Task
//     const handleDelete = (id) => {
//         confirmAlert({
//             title: 'Confirm Deletion',
//             message: 'Are you sure you want to delete this task?',
//             buttons: [
//                 {
//                     label: 'Yes',
//                     onClick: async () => {
//                         try {
//                             const res = await axiosPublic.delete(`/todos/${id}`);
//                             if (res.data.deletedCount > 0) {
//                                 refetch(); // Refetch data after deletion
//                                 message.success('Task deleted successfully!');
//                             }
//                         } catch (error) {
//                             console.error('Error deleting task:', error);
//                             message.error('Failed to delete task. Please try again.');
//                         }
//                     },
//                 },
//                 { label: 'No' },
//             ],
//         });
//     };

//     // Edit Task
//     const handleEdit = (task) => {
//         console.log(task);
//         setForm({
//             _id: task._id,
//             title: task.title,
//             description: task.description,
//             category: task.category,
//         });
//         setIsModalVisible(true); // Open the modal
//     };

//   // Function to handle submitting updated task
//     const handleSubmit = async () => {
//         // console.log(form._id)
//         try {
//             const taskId = form._id;
//             const updatedData = {
//                 title: form.title,
//                 description: form.description,
//                 category: form.category,
//             };
//             const response = await axiosPublic.patch(`/todos/${taskId}`, updatedData);
//             if (response.data.modifiedCount > 0) {
//                 message.success('Task updated successfully!');
//                 refetch(); // Refetch the data to reflect the changes
//             } else {
//                 message.warning('No changes were made to the task.');
//             }
//         } catch (error) {
//             console.error('Error updating task:', error);
//             message.error('Failed to update task. Please try again.');
//         } finally {
//             setIsModalVisible(false);
//         }
//     };


//     // Function to close the modal
//     const handleCancel = () => {
//         setIsModalVisible(false);
//     };

//     // Function to handle input changes
//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setForm((prevForm) => ({ ...prevForm, [name]: value }));
//     };

//     // Function to handle category changes
//     const handleCategoryChange = (value) => {
//         setForm((prevForm) => ({ ...prevForm, category: value }));
//     };


//     if (isLoading) {
//         return <Loading />;
//     }

//     return (
//         <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
//             <div className="flex flex-col md:flex-row gap-4 p-4">
//                 {categories.map((category) => (
//                     <div key={category} className="flex-1 rounded-lg p-4 bg-green-500">
//                         <h3 className={`text-center text-base py-1 md:text-lg font-bold ${category === 'To-Do' ? "bg-[#c98b9b3b]" : category === 'In Progress' ? "bg-[#e6b89c24]" : "bg-[#a2d1f55a]"} mb-2 md:mb-4`}>
//                             {category}
//                         </h3>

//                         {/* Drop area to allow tasks to be dropped into empty categories */}
//                         <SortableContext items={tasks.filter((task) => task.category === category).map((task) => task._id)} strategy={verticalListSortingStrategy}>
//                             <div className="min-h-[50px]"> {/* Ensures empty categories remain droppable */}
//                                 {tasks.filter((task) => task.category === category).length > 0 ? (
//                                     tasks.filter((task) => task.category === category).map((task) => (
//                                         <SortableItem key={task._id} id={task._id}>
//                                             <div className="p-2 border m-2 bg-white rounded-md border-gray-300 flex justify-between items-center">
//                                                 <div>
//                                                     <h4 className="font-semibold">{task.title}</h4>
//                                                     <p className="text-sm text-gray-600">{task.description}</p>
//                                                 </div>
//                                                 <div className="flex gap-2">
//                                                     <AiOutlineEdit
//                                                         onMouseDown={() => handleEdit(task)}
//                                                         className="cursor-pointer text-blue-500 hover:text-blue-700"
//                                                         size={20}
//                                                     />
//                                                     <AiOutlineDelete
//                                                         onMouseDown={(e) => {
//                                                             e.stopPropagation();
//                                                             handleDelete(task._id);
//                                                         }}
//                                                         className="cursor-pointer text-red-500 hover:text-red-700"
//                                                         size={20}
//                                                     />
//                                                 </div>
//                                             </div>
//                                         </SortableItem>
//                                     ))
//                                 ) : (
//                                     <div className="p-4 text-center text-gray-500 border-2 border-dashed rounded-lg">Drop tasks here</div>
//                                 )}
//                             </div>
//                         </SortableContext>
//                     </div>
//                 ))}
//             </div>

//             {/* Edit Task Modal */}
//             <Modal
//                 title="Edit Task"
//                 open={isModalVisible}
//                 onOk={handleSubmit}
//                 onCancel={handleCancel}
//                 okText="Save Changes"
//                 cancelText="Cancel"
//             >
//                 <div className="mb-4">
//                     <label className="block mb-2 font-medium">Title (Required, Max 50 Characters)</label>
//                     <Input
//                         placeholder="Enter task title"
//                         name="title"
//                         value={form.title}
//                         onChange={handleInputChange}
//                         maxLength={50}
//                     />
//                 </div>
//                 <div className="mb-4">
//                     <label className="block mb-2 font-medium">Description (Max 200 Characters)</label>
//                     <Input.TextArea
//                         placeholder="Enter task description"
//                         name="description"
//                         value={form.description}
//                         onChange={handleInputChange}
//                         maxLength={200}
//                         rows={4}
//                     />
//                 </div>
//                 <div className="mb-4">
//                     <label className="block mb-2 font-medium">Category</label>
//                     <Select
//                         value={form.category}
//                         className="w-full"
//                         onChange={handleCategoryChange}
//                         options={[
//                             { value: 'To-Do', label: 'To-Do' },
//                             { value: 'In Progress', label: 'In Progress' },
//                             { value: 'Done', label: 'Done' },
//                         ]}
//                     />
//                 </div>
//             </Modal>
//         </DndContext>
//     );
// };

// export default Category;

