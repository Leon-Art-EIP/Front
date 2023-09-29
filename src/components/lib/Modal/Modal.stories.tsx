import React, { useState } from 'react';
import { Meta } from '@storybook/react';

import Modal, { ModalProps } from './Modal';
import Button from '../Button/Button';

export default {
    title: 'Components/Modal',
    component: Modal,
} as Meta;

const Template: (args: ModalProps) => JSX.Element = (args) => {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return (
        <>
            <Button color='info' onClick={openModal}>Open Modal</Button>
            <Modal {...args} isOpen={isOpen} handleClose={closeModal}>
                <h2>Modal Content</h2>
                <p className='m-10'>This is an example of a generic modal in Storybook.</p>
                <Button color='success' onClick={closeModal}>Close Modal</Button>
            </Modal>
        </>
    );
};

export const Default = () => <Template isOpen={false} handleClose={() => { } } children={undefined} />;
