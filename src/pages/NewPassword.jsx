import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router"
import { setUser } from "../state/slices/userSlice"
import supabase from "../supabase_config"
import { Link } from "react-router-dom"

export default function NewPassword() {
    const [err, setError] = useState([])
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const sendLink = async (e) => {
        e.preventDefault()
        const password1 = e.target[0].value
        const password2 = e.target[1].value
        if (password1 == password2) {
            const {data, error} = await supabase.auth.updateUser({password: password1})
            console.log(data);
            console.log(error);
            if (error){
                setError([...err, error.message])
            } else {
                navigate('/')
            }
        } else {
            setError([...err, "Password did not matched"])
        }
    }
    useEffect(()=> {
        supabase.auth.onAuthStateChange((_, session)=> {
            if (session) {
                dispatch(setUser(session?.user))
                navigate('/new-password')
            } else {
                navigate("/reset-password")
            }
        })
    }, [])
    return (
        <>
            <div className="bg-slate-900 flex flex-col h-screen items-center justify-center">
                <div className=" bg-slate-800 flex flex-col p-5 justify-center items-center rounded">
                    <h2 className="text-3xl py-3 text-white">New Password</h2>
                    <form onSubmit={sendLink} className="flex flex-col space-y-3 justify-center items-center">
                        <input className="focus:outline-green-400 py-2 px-3 bg-slate-700 text-white" type="password" name="password1" id="password1" placeholder="Password" />
                        <input className="focus:outline-green-400 py-2 px-3 bg-slate-700 text-white" type="password" name="password2" id="password2" placeholder="Re-type Password" />
                        <input type="submit" value="Change" className= " text-lg text-black py-2 px-4 bg-slate-300 hover:bg-slate-400"/>
                        {err? err.map((er) => (
                            <div className="text-red-500" key={er}>{er}</div>
                        )) : ""}
                    </form>
                </div>
            </div>
        </>
    )
}