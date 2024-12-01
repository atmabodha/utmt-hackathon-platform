// Import SweetAlert2
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Utility for showing a simple alert
export const showSwalAlert = ({
  icon = "warning",
  title = "Alert",
  text = "Something happened!",
  footer = "",
}) => {
  Swal.fire({
    icon: icon, // 'warning', 'error', 'success', 'info', etc.
    title: title, // Alert title
    text: text, // Main message
    footer: footer, // Optional footer text
  });
};

// Utility for showing a confirmation alert with OK and Cancel buttons
export const showConfirmationAlert = async ({
  icon = "warning",
  title = "Are you sure?",
  text = "Do you really want to proceed?",
  confirmButtonText = "Yes, delete it!",
  cancelButtonText = "Cancel",
  showCancelButton = true,
}) => {
  const result = await Swal.fire({
    icon: icon,
    title: title,
    text: text,
    showCancelButton: showCancelButton,
    confirmButtonText: confirmButtonText,
    cancelButtonText: cancelButtonText,
  });

  return result.isConfirmed; // true if OK, false if Cancel
};

// Utility for initializing Toastify in your app (should be called in App component or main entry point)
export const initializeToastify = () => {
  toast.configure();
};

// Utility for showing success toast
export const showSuccessToast = (message) => {
  toast.success(message, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 3000, // Automatically close after 3 seconds
  });
};

// Utility for showing error toast
export const showErrorToast = (message) => {
  toast.error(message, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 3000, // Automatically close after 3 seconds
  });
};

// Utility for showing info toast
export const showInfoToast = (message) => {
  toast.info(message, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 3000, // Automatically close after 3 seconds
  });
};

// Utility for showing warning toast
export const showWarningToast = (message) => {
  toast.warning(message, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 3000, // Automatically close after 3 seconds
  });
};

export default showSwalAlert;
