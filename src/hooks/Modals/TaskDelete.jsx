import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react'
import { Fragment } from 'react'
import PropTypes from 'prop-types'

const TaskDelete = ({ closeModal, isOpen, taskDelete }) => {
  return (
      <Transition appear show={isOpen} as={Fragment}>
          <Dialog as='div' className='relative z-10' onClose={closeModal}>
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
                      <DialogPanel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-center shadow-2xl transition-all border border-gray-200'>
                          <DialogTitle
                              as='h3'
                              className='text-xl font-semibold text-gray-900'
                          >
                              Are you sure?
                          </DialogTitle>
                          <div className='mt-3'>
                              <p className='text-md text-gray-600'>
                                  You cannot undo once it&apos;s done!
                              </p>
                          </div>
                          <div className='mt-6 flex justify-center gap-4'>
                              <button
                                  type='button'
                                  onClick={taskDelete}
                                  className='px-5 py-2 rounded-lg font-medium text-black bg-[#c98b9b] hover:bg-[#c98b9b] transition duration-300 shadow-md'
                              >
                                  Yes
                              </button>
                              <button
                                  type='button'
                                  className='px-5 py-2 rounded-lg font-medium text-black bg-[#a2d1f5] hover:bg-[#a2d1f5] transition duration-300 shadow-md'
                                  onClick={closeModal}
                              >
                                  No
                              </button>
                          </div>
                      </DialogPanel>
                  </TransitionChild>
              </div>
          </Dialog>
      </Transition>
  )
}

TaskDelete.propTypes = {
  closeModal: PropTypes.func,
  isOpen: PropTypes.bool,
  taskDelete: PropTypes.func,
}

export default TaskDelete;
