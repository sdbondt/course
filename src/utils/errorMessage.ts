const errorMessage = (error: any): string => {
    if ('data' in error) {
      return error.data.msg;
    }
    return "An error occurred";
}
  
export default errorMessage