import { Store } from "react-notifications-component";

let isFirstNotificationShown = false;

const ToastHandle = (message, type, oneTimeCall) => {
  if (!oneTimeCall) {
    message = message.charAt(0).toUpperCase() + message.slice(1); // Always capitalize the first letter of the message
    Store.addNotification({
      message: message,
      type: type,
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 3000,
        onScreen: true,
      },
    });
    isFirstNotificationShown = true;
  }
};

export default ToastHandle;
