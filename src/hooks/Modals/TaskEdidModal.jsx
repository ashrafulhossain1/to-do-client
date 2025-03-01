import PropTypes from 'prop-types'
import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react'
import { Fragment } from 'react'
import TaskForm from './TaskForm'

const TaskEdidModal = ({ setIsEditModalOpen, isOpen, filteredTask, refetch }) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as='div'
        className='relative z-10'
        onClose={() => setIsEditModalOpen(false)}
      >
        <TransitionChild
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-[#00000050] backdrop-blur-sm' />
        </TransitionChild>

        <div className='fixed inset-0 overflow-y-auto flex items-center justify-center p-4'>
          <TransitionChild
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 scale-95'
            enterTo='opacity-100 scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 scale-100'
            leaveTo='opacity-0 scale-95'
          >
            <DialogPanel className='w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-center shadow-2xl transition-all border border-gray-200'>
              <DialogTitle
                as='h3'
                className='text-xl font-semibold text-gray-900'
              >
                
              </DialogTitle>
              <div className='mt-4 w-full'>
                <TaskForm filteredTask={filteredTask} refetch={refetch} setIsEditModalOpen={setIsEditModalOpen} />
              </div>
              <div className='mt-6 flex justify-center'>
                <button
                  type='button'
                  className='px-5 py-2 rounded-lg font-medium text-black bg-[#e6b89c] hover:bg-[#e6b89c] transition duration-300 shadow-md'
                  onClick={() => setIsEditModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  )
}

TaskEdidModal.propTypes = {
  setIsEditModalOpen: PropTypes.func,
  isOpen: PropTypes.bool,
}

export default TaskEdidModal;
