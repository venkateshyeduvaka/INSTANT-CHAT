import {create} from "zustand"

const useConveraction=create((set)=>({
    selectedConveraction:null,
    setSelectedConveraction:(selectedConveraction)=>set({selectedConveraction}),
    messages:[],
    setMessages:(messages)=>set({messages}),
}))

export default useConveraction