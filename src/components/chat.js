import { useEffect, useState } from "react";
import ScrollToBottom from 'react-scroll-to-bottom';
const ChatComp = ({ socket, username, room }) => {
    const [currentmessage, setCurrentmessage] = useState("");
    const [messagelist, setMessagelist] = useState([]);
    const sendMessage = async () => {
        if (currentmessage !== "") {
            const messageData = {
                id: room,
                author: username,
                message: currentmessage,
                time: new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes()
            }
            await socket.emit("send_message", messageData);
            setMessagelist((list) => [...list, messageData]);
            setCurrentmessage("");
        }
    };

    useEffect(() => {
        socket.on('recieve_message', (data) => {
            console.log(data);
            setMessagelist((list) => [...list, data]);
        });
    }, [socket])
    return (
        <div className="chat-window">
            <div className="chat-header">
                <p>Live Chat</p>
            </div>
            <div className="chat-body">
                <ScrollToBottom className="message-container">
                    {
                        messagelist.map((messageContent) => {
                            return (<div className="message" id={username === messageContent.author ? "you" : "other"}>
                                <div>
                                    <div className="message-content">
                                        <p>{messageContent.message}</p>
                                    </div>
                                    <div className="messahe-meta">
                                        <p id="time">{messageContent.time}</p>
                                        <p id="author">{messageContent.author}</p>
                                    </div>
                                </div>
                            </div>);
                        })}
                </ScrollToBottom>
            </div>
            <div className="chat-footer">
                <input type='text' placeholder="type..." value={currentmessage} onChange={(e) => setCurrentmessage(e.target.value)}
                    onKeyUp={(e) => {
                        e.key === 'Enter' && sendMessage();
                    }} />
                <button onClick={sendMessage}>&#9658;</button>
            </div>
        </div>
    )
}

export default ChatComp;