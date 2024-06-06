'use client';

import React from 'react'

interface ModalProps {
    modalOpen: boolean;
    setModalOpen: (open: boolean) => boolean | void;
    children?: React.ReactNode;
    actions?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ modalOpen, setModalOpen, children, actions }) => {
    return (
        <div className={`modal ${modalOpen ? "modal-open" : ""}`}>
            <div className='modal-box w-96'>
                <button onClick={() => setModalOpen(false)} className="btn btn-circle btn-xs absolute top-0 right-0 m-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                <div className='mx-3 my-2'>
                    {children}
                    {actions && (
                        <div className="modal-action">
                            {actions}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Modal
