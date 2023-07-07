const getErrorMessage = (error: any): string => {
  if (error.response && error.response.data && error.response.data.error) {
    return error.response.data.error;
  }

  if (error.message) {
    return error.message;
  }

  return "An error occurred.";
};

export default getErrorMessage;
