export const handleGenericError = (error: any): string => {
  if (!error) {
    return "An unknown error occurred.";
  }

  if (error.response) {
    const responseData = error.response.data;

    // Try to extract a meaningful error message
    return (
      responseData?.message ||
      (Array.isArray(responseData?.email) && responseData.email.join(", ")) ||
      responseData?.detail ||
      responseData?.error ||
      error.message ||
      "An error occurred on the server."
    );
  }

  if (error.request) {
    return "No response received from the server. Please check your connection or try again later.";
  }

  if (error.message) {
    return error.message;
  }

  return "An unexpected error occurred.";
};

// export const handleSuccessMessage = (data: any): string => {
//   if (!data) {
//     return "Operation completed successfully.";
//   }

//   if (data.response) {
//     const responseData = data.response.data;
//     return (
//       responseData?.message ||
//       "Operation completed successfully."
//     );
//   }

//   if (data.message) {
//     return data.message;
//   }

//   if (typeof data === 'string') {
//     return data; // If data is a string, return it directly
//   }

//   return "Operation completed successfully.";
// };
