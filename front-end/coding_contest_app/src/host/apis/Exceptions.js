import Swal from 'sweetalert2';

// Utility function to handle API responses and errors
export const handleApiResponse = (response) => {
  if (!response || typeof response !== "object") {
    console.error("Invalid response object");
    return;
  }

  console.log(response)
  const status = response?.status;
  const message = response?.data.message || response.message;

  switch (status) {
    case 400:
      Swal.fire({
        icon: 'warning',
        title: 'Bad Request',
        text: message || 'The server could not understand the request due to invalid syntax.',
        footer: 'Please check your input and try again.',
      });
      break;

    case 401:  // Unauthorized
      Swal.fire({
        icon: 'warning',
        title: 'Unauthorized',
        text: message || 'You need to log in to access this resource.',
        footer: 'Please log in and try again.',
      });
      break;

    case 403:  // Forbidden
      Swal.fire({
        icon: 'error',
        title: 'Forbidden',
        text: message || 'You do not have permission to access this resource.',
        footer: 'If you believe this is an error, contact support.',
      });
      break;

    case 404:  // Not Found
      Swal.fire({
        icon: 'error',
        title: 'Not Found',
        text: message || 'The resource you are looking for was not found.',
        footer: 'Please check the URL or contact support if the issue persists.',
      });
      break;

    case 500:  // Internal Server Error
      Swal.fire({
        icon: 'error',
        title: 'Server Error',
        text: message || 'There was an issue on our end. Please try again later.',
        footer: 'If the issue persists, contact support.',
      });
      break;

    case 503:  // Service Unavailable
      Swal.fire({
        icon: 'error',
        title: 'Service Unavailable',
        text: message || 'The service is currently unavailable. Please try again later.',
      });
      break;

    default:  // Other or unexpected statuses
      Swal.fire({
        icon: 'info',
        title: 'Unexpected Response',
        text: message || 'An unexpected status was returned. Please try again.',
      });
      break;
  }
};

// Optional: Generic error handler for network or unexpected errors
export const handleNetworkError = (error) => {
  Swal.fire({
    icon: 'error',
    title: 'Network Error',
    text: error?.message || 'A network error occurred. Please check your connection and try again.',
  });
};
