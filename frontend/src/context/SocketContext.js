import { createContext, useState, useEffect, useContext } from "react";

import io from "socket.io-client";
import { useAuthContext } from "./AuthContext";



const SocketContext = createContext();

export const useSocketContext = () => {
	return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {

    const {authUser}=useAuthContext()

    const [socket, setSocket] = useState(null);
	const [onlineUsers, setOnlineUsers] = useState([]);


    useEffect(() => {
        if (authUser) {
            const socket = io("http://localhost:8001", {
				query: {
					userId: authUser._id,
				},
			});
			setSocket(socket);

			// socket.on() is used to listen to the events. can be used both on client and server side
			socket.on("getOnlineUsers", (users) => {
				setOnlineUsers(users);
			});

			return () => socket.close();
		} 
        else{
            if (socket) {
				socket.close();
				setSocket(null);
			}
        }
    },[authUser])

    return <SocketContext.Provider value={{socket, onlineUsers}}>{children}</SocketContext.Provider>;
}