'use client';

import { Button } from 'flowbite-react';
import React from 'react'

interface ModalProps {
    modalOpen: boolean;
    setModalOpen: (open: boolean) => boolean | void;
    children?: React.ReactNode;
    actions?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ( {modalOpen, setModalOpen, children, actions} ) => {
  return (    
    <div className={`modal ${modalOpen ? "modal-open" : ""}`}>
        <div className='modal-box w-96'>
            {children}
            <div className="modal-action">
                <form method="dialog">
                    <Button outline gradientDuoTone="purpleToPink"  onClick={() => setModalOpen(false)}>
                        Cancel
                    </Button>
                </form>
                {actions}
            </div>
        </div>
    </div>
  )
}

export default Modal
