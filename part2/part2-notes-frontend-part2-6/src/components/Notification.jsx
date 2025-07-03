const Notification = ({ message, checkError }) => {
  if (message === null) {
    return null;
  }
  console.log("checkError", checkError);
  return <div className={checkError ? "error" : "notError"}>{message}</div>;
};

export default Notification;
