import {useState ,createContext,useContext} from "react";


export const AuthContext=createContext();

export const useAuthContext=()=>{
 return useContext(AuthContext)
}



export const AuthProvider=({children})=>{
    const [authUser,setauthUser]=useState(JSON.parse(localStorage.getItem("chat-user")) || null)
    return(
        <AuthContext.Provider value={{authUser,setauthUser}}>
          {children}
        </AuthContext.Provider>
    )
}