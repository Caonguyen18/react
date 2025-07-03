const Notification = ({ message, checkError }) => {
    if (!message) {
        return null;
    }
    
    return <div className={(checkError ? "error" : "notError")}>{message}</div>;
}

export default Notification;