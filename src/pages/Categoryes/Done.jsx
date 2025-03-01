import { useState } from "react";
import { FaDeleteLeft, FaEye } from 'react-icons/fa6';
import { GiClick } from 'react-icons/gi';
import axios from "axios";
import TaskEdidModal from "../../hooks/Modals/TaskEdidModal";
import TaskDelete from "../../hooks/Modals/TaskDelete";
import { FaEdit } from "react-icons/fa";

const Done = ({ filteredTask, refetch }) => {
  const { title, description, category, _id, date } = filteredTask;
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  let [isOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const taskDelete = () => {
    axios.delete(`https://to-do-server-black.vercel.app/task/${_id}`)
      .then(result => {
        console.log(result.data);
        refetch();
        setIsEditModalOpen(false);
      });
  }

  return (
    <div className='border border-green-500 mb-2 flex justify-between bg-[#000000df] p-2 rounded-sm'>
      <div className="space-y-2">
        <h1 className="text-xl text-white font-bold">{title}</h1>
        <p className="text-gray-300">{description}</p>
        <div className="flex items-end gap-0">
          {/* <h1 className="bg-green-500 font-bold py-1 px-4 rounded-full">{category}</h1> */}
        </div>
      </div>

      {/* Buttons for update and delete */}
      <div className="flex items-center justify-between">
        <div className='py-5 text-sm'>
          <span
            onClick={() => { setIsEditModalOpen(true) }}
            className='relative cursor-pointer inline-block px-3 py-2 font-semibold text-white leading-tight'
          >
            <span
              aria-hidden='true'
              className='absolute inset-0 bg-black rounded-full'
            ></span>
            <div className='flex items-center gap-2'>
              <FaEdit className='relative text-lg' />
            </div>
          </span>
          <TaskEdidModal
            isOpen={isEditModalOpen}
            setIsEditModalOpen={setIsEditModalOpen}
            filteredTask={filteredTask}
            refetch={refetch}
          />
        </div>

        {/* Delete button */}
        <div className=''>
          <div className='flex justify-end'>
            <span
              onClick={openModal}
              className='relative cursor-pointer inline-block px-3 py-2 font-semibold text-white leading-tight'
            >
              <span
                aria-hidden='true'
                className='absolute inset-0 bg-black rounded-full'
              ></span>
              <div className='flex items-center gap-0'>
                <FaDeleteLeft className='relative text-lg' />
              </div>
            </span>
          </div>
          <TaskDelete isOpen={isOpen} closeModal={closeModal} taskDelete={taskDelete} />
        </div>
      </div>
    </div>
  );
};

export default Done;
