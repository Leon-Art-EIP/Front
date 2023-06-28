import React, { useEffect } from 'react';

export interface ModalProps {
    isOpen: boolean;
    handleClose: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, handleClose, children }) => {

    useEffect(() => {
        if (isOpen) {
          document.body.classList.add('overflow-hidden')
        } else {
          document.body.classList.remove('overflow-hidden')
        }
      }, [isOpen])

    if (!isOpen) {
        return null;
    }

    return (
        <div
            className="fixed z-50 inset-0 overflow-y-auto"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
        >
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div
                    onClick={handleClose}
                    className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                    aria-hidden="true"
                ></div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                    &#8203;
                </span>
                <div
                    className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                >
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
