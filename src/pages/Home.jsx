import Sidebar from "../components/Sidebar";
import Chat from '../components/Chat';
import { useDebugValue, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import supabase from "../supabase_config";
import { setUser } from "../state/slices/userSlice";
import { setChatList } from "../state/slices/chatListSlice";

export default function Home() {
    const user = useSelector((state)=> state.user)
    const dispatch = useDispatch()
    // const navigate = useNavigate()
    useEffect(()=> {
        supabase.auth.onAuthStateChange((_, session)=> {
            if (session){
            async function getInfo(){
                const { data: Profiles, error } = await supabase
                .from('Profiles')
                .select('*')
                .eq("user_id", session?.user?.id)
                dispatch(setUser(Profiles[0]))
                console.log("Home Component UseEffect");
            }
            getInfo()
            async function getChatList(){
                try{
                  const { data: userChats, error } = await supabase
                  .from('userChats')
                  .select("*")
                  // Filters
                  .eq('user_id', session?.user?.id)
                  if (userChats){
                    console.log("Hello user Chats", userChats);
                    dispatch(setChatList(userChats))
                  }
                } catch (error) {
                  console.log(error.message);
                }
            }
            getChatList()
            }
        })
    }, [])
    return (
        <>
            <div className="text-white h-screen p-5 bg-slate-700">
                <div className=" flex bg-slate-800 w-full h-full shadow-xl">
                    <div className="bg-gray-900 w-1/4 shadow-lg">
                        <Sidebar/>
                    </div>
                    <div className="w-full">
                        <Chat/>
                    </div>
                </div>
            </div>
        </>
    )
}