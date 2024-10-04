import Swal from 'sweetalert2';

const showSwalAlert = ({ icon = 'warning', title = 'Alert', text = 'Something happened!', footer = '' }) => {
  Swal.fire({
    icon: icon,        // 'warning', 'error', 'success', 'info', etc.
    title: title,      // Alert title
    text: text,        // Main message
    footer: footer,    // Optional footer text
  });
};

export default showSwalAlert;
