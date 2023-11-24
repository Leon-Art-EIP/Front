import React, { useState } from 'react';
import { Meta } from '@storybook/react';
import NotificationToast, { NotificationToastProps } from './NotificationToast';
import Button from '../Button/Button';

export default {
  title: 'Components/NotificationToast',
  component: NotificationToast,
} as Meta;

const Template = (args: NotificationToastProps) => {
  const [show, setShow] = useState(false);
  
  const handleClick = () => {
    setShow(true);
    setTimeout(() => setShow(false), 5000);
  };

  return (
    <>
      <Button color='primary' onClick={handleClick} type={"button"}>Show Success Notification</Button>
      {show && <NotificationToast {...args} type="success" />}
    </>
  );
};

const ErrorTemplate = (args: NotificationToastProps) => {
  const [show, setShow] = useState(false);
  
  const handleClick = () => {
    setShow(true);
    setTimeout(() => setShow(false), 5000);
  };

  return (
    <>
      <Button color='primary' onClick={handleClick} type={"button"}>Show Error Notification</Button>
      {show && <NotificationToast {...args} type="error" />}
    </>
  );
};

const InfoTemplate = (args: NotificationToastProps) => {
  const [show, setShow] = useState(false);
  
  const handleClick = () => {
    setShow(true);
    setTimeout(() => setShow(false), 5000);
  };

  return (
    <>
      <Button color='primary' onClick={handleClick} type={"button"}>Show Info Notification</Button>
      {show && <NotificationToast {...args} type="info" />}
    </>
  );
};

export const Success = () => <Template message="This is a success message" type={'success'} />;
export const Error = () => <ErrorTemplate message="This is an error message" type={'success'} />;
export const Info = () => <InfoTemplate message="This is an info message" type={'success'} />;
