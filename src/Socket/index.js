import { createContext, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addMessage } from "../redux/actions/conversationsList";
import { add_id } from "../redux/actions/messNotification";
const SocketContext = createContext();
function SocketProvider({ children }) {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [socket, setSocket] = useState(null);
    useEffect(() => {
        const connect = (userId) => {
            const ws = new WebSocket(`ws://localhost:8080?userId=${userId}`);
            setSocket(ws);
        };
        user?.userId && connect(user.userId);
        if (!user?.userId) {
            socket && socket?.close();
        }
    }, [user?.userId]);
    console.log(socket);
    useEffect(() => {
        const handleRealtime = () => {
            socket.onmessage = (e) => {
                const data = JSON.parse(e.data);
                switch (data.type) {
                    case "message":
                        dispatch(add_id(data.conversationsId));
                    case "notification":
                }
            };
        };
        socket && handleRealtime();
    }, [socket]);
    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
}

export { SocketContext, SocketProvider };
