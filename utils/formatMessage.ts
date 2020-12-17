const getCurrentTime = () => {
    const today = new Date();

    const time =
        ('0' + today.getHours()).slice(-2) +
        ':' +
        ('0' + today.getMinutes()).slice(-2) +
        ':' +
        ('0' + today.getSeconds()).slice(-2);

    return time;
};

interface Message {
    username: string;
    text: string;
    time: string;
}

const formatMessage = (username: string, text: string): Message => {
    return {
        username,
        text,
        time: getCurrentTime(),
    };
};

export default formatMessage;
