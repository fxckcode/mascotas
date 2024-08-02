import CloseIcon from '@mui/icons-material/Close'
import { Modal } from '@mui/material'

const CustomModal = ({ open, onClose, children }) => {
    return (
        <Modal open={open} onClose={onClose} className='flex justify-center items-center'>
            <div className='lg:w-1/2 w-[90%] bg-white border border-gray-500 p-5 rounded-lg flex-col overflow-y-auto max-h-[95%] h-[70%]'>
                <div className='flex justify-end'>
                    <CloseIcon className='hover:text-gray-400 text-black transition-all' onClick={() => onClose()} />
                </div>
                <div className='w-full flex flex-col gap-5'>
                    {children}
                </div>
            </div>
        </Modal>
    )
}

export default CustomModal