import { useEffect, useRef, useState } from "react";
import socket from "../sockets/socket";

const GROUP_ID = "123"; // must match backend groupId

const ChatBoard = ({ current_user }) => {
  const [showChat, setShowChat] = useState(false);
  const [message, setMessage] = useState("");
  const [groupMessages, setGroupMessages] = useState([]);
  const bottomRef = useRef(null);

  const [user, setUser] = useState({
    name: "unknown",
    status: "online",
  });

  // SCROLL TO BOTTOM
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [groupMessages]);

  // LOAD OLD MESSAGES + SOCKET
  useEffect(() => {
    if (user.name === "unknown") return;

    // Load OLD messages
    fetch(`http://localhost:5000/api/group/messages/${GROUP_ID}`)
      .then((res) => res.json())
      .then((data) => setGroupMessages(data));

    // Join socket room
    socket.emit("join_group", GROUP_ID);

    // Receive NEW messages
    const handleMessage = (msg) => {
      setGroupMessages((prev) => [...prev, msg]);
    };

    socket.on("received_Group_Message", handleMessage);

    return () => {
      socket.off("received_Group_Message", handleMessage);
    };
  }, [user.name]);

  // SEND MESSAGE 
  const sendGroupMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    socket.emit("sent_Group_message", {
      groupId: GROUP_ID,
      message: message,
      current_user: current_user, 
    });

    setMessage("");
  };

  //open chat
  const openChat = () => {
    setShowChat(true);
    setUser({ name: "Group Chat", status: "online" });
  };

  return (
    <div className="flex bg-gray-100">
      {/* LEFT */}
      <div
        className={`${
          showChat ? "hidden md:flex" : "flex"
        } md:w-1/3 w-full bg-white border-r flex-col`}
      >
        <div className="h-16 px-4 flex items-center font-semibold text-lg border-b bg-gray-50">
          Chats
        </div>

        <div className="flex-1 overflow-y-auto">
          <div
            onClick={openChat}
            className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-100"
          >
            <div className="w-10 h-10 bg-green-500 rounded-full text-white flex items-center justify-center font-bold">
              G
            </div>
            <p className="font-medium">Group Chat</p>
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div
        className={`${
          showChat ? "flex" : "hidden md:flex"
        } flex-1 flex-col bg-[#ECE5DD]`}
      >
        {/* HEADER */}
        <div className="h-16 px-4 flex items-center gap-3 bg-white border-b">
          <button
            onClick={() => setShowChat(false)}
            className="md:hidden text-gray-600 text-xl"
          >
            ←
          </button>

          <div>
            <p className="font-semibold">{user.name}</p>
            <p className="text-xs text-green-600">{user.status}</p>
          </div>
        </div>

        {/* MESSAGES */}
        {user.name !== "unknown" && (
          <div className="flex-1 p-2 overflow-y-auto space-y-2">
            {groupMessages.map((msg) => (
              <div
                key={msg._id}
                className={`p-2 max-w-[40%] rounded-lg shadow text-[12px]
                  ${
                    msg.sender === current_user
                      ? "bg-green-200 ml-auto text-right"
                      : "bg-white mr-auto text-left"
                  }`}
              >
                <p>{msg.text}</p>

                <div className="flex justify-between text-[9px] text-indigo-500 italic mt-1">
                  <span>{msg.sender}</span>
                  <span>
                    {new Date(msg.createdAt).toLocaleTimeString("en-IN", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    })}
                  </span>
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>
        )}

        {/* INPUT */}
        {user.name !== "unknown" && (
          <form
            onSubmit={sendGroupMessage}
            className="h-16 px-4 flex items-center gap-3 bg-white border-t"
          >
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message"
              className="flex-1 px-4 py-2 rounded-full bg-gray-100 outline-none"
            />
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600"
            >
              Send
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ChatBoard;
