import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router"
import { setUser } from "../state/slices/userSlice"
import supabase from "../supabase_config"
import { Link } from "react-router-dom"

export default function ResetPassword() {
    const [err, setError] = useState([])
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const sendLink = async (e) => {
        e.preventDefault()
        const email = e.target[0].value
        const {data, error} = await supabase.auth.resetPasswordForEmail(email)
        alert("Check your email")
        console.log(data);
        console.log(error);
    }
    useEffect(()=> {
        supabase.auth.onAuthStateChange((_, session)=> {
            if (session) {
                dispatch(setUser(session?.user))
                navigate('/')
            } else {
                navigate("/reset-password")
            }
        })
    }, [])
    return (
        <>
            <div className="bg-slate-900 flex flex-col h-screen items-center justify-center">
                <div className=" bg-slate-800 flex flex-col p-5 justify-center items-center rounded">
                    <h2 className="text-3xl py-3 text-white">Reset Password</h2>
                    <form onSubmit={sendLink} className="flex flex-col space-y-3 justify-center items-center">
                        <input autoComplete="email" className="focus:outline-green-400 py-2 px-3 bg-slate-700 text-white" type="email" name="email" id="email" placeholder="Email" />
                        <input type="submit" value="Send" className= " text-lg text-black py-2 px-4 bg-slate-300 hover:bg-slate-400"/>
                        {err? err.map((er) => (
                            <div className="text-red-500" key={er}>{er}</div>
                        )) : ""}
                        <p className="text-slate-300">Already have an Account? <Link to={'/login'}><span className="text-blue-500 underline">Login</span></Link> </p>
                    </form>
                </div>
            </div>
        </>
    )
}