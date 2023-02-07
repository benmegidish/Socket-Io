import './App.css';
import { io } from 'socket.io-client';
import { useState } from 'react';
import ChatComp from './components/chat';
const socket = io.connect("http://localhost:4000")

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [show, setShow] = useState(false);
  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShow(true);
    }
  }

  return (
    <div className="App">
      {!show ?
        <div className='joinChatContainer'>
          <h3>Join Room</h3>
          <input type='text' placeholder='User name' onChange={(e) => setUsername(e.target.value)} />
          <input type='text' placeholder='Room ID' onChange={(e) => setRoom(e.target.value)} />
          <input type='button' value="Join" onClick={() => joinRoom()} />
        </div>
        :
        <div>
          <div>
            <button value="Get Back" onClick={() => setShow(false)}>Get Back</button>
          </div>
          <ChatComp socket={socket} username={username} room={room} />
        </div>
      }
    </div>
  );
}

export default App;
