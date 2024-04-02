import { Store } from 'react-notifications-component';

// let isFirstNotificationShown = false;

const ToastHandle = (message, type) => {
    Store.addNotification({
        message: message,
        type: type,
        insert: 'top',
        container: 'top-right',
        animationIn: ['animate__animated', 'animate__fadeIn'],
        animationOut: ['animate__animated', 'animate__fadeOut'],
        dismiss: {
            duration: 3000,
            onScreen: true,
        },
    });
}

export default ToastHandle;