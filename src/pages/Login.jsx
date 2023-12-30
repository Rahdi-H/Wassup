import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router"
import { setUser } from "../state/slices/userSlice"
import supabase from "../supabase_config"
import { Link } from "react-router-dom"

export default function Login() {
    const [err, setError] = useState([])
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const signIn = async (e) => {
        e.preventDefault()
        const email = e.target[0].value
        const password = e.target[1].value
        let { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        })
        if (error){
            setError([...err, error.message])
            console.log(error.message);
        } else {
            navigate('/')
        }
        console.log("Data", data);
        console.log("Error", error);
        console.log("Hi", err);
  
    }
    useEffect(()=> {
        supabase.auth.onAuthStateChange((_, session)=> {
            if (session) {
                dispatch(setUser(session?.user))
                navigate('/')
            } else {
                navigate("/login")
            }
        })
    }, [])
    return (
        <>
            <div className="bg-slate-900 flex flex-col h-screen items-center justify-center">
                <div className=" bg-slate-800 flex flex-col p-5 justify-center items-center rounded">
                    <h2 className="text-3xl py-3 text-white">Login</h2>
                    <form onSubmit={signIn} className="flex flex-col space-y-3 justify-center items-center">
                        <input autoComplete="email" className="focus:outline-green-400 py-2 px-3 bg-slate-700 text-white" type="email" name="email" id="email" placeholder="Email" />
                        <input className="focus:outline-green-400 py-2 px-3 bg-slate-700 text-white" type="password" name="password1" id="password1" placeholder="Password" />
                        <input type="submit" value="Login" className= " text-lg text-black py-2 px-4 bg-slate-300 hover:bg-slate-400"/>
                        {err? err.map((er) => (
                            <div className="text-red-500" key={er}>{er}</div>
                        )) : ""}
                        <p className="text-slate-300">Don't have an Account? <Link to={'/register'} ><span className="text-blue-500 underline">Register</span></Link></p>
                        <p className="text-slate-300">Did you forgot your password? <Link to={'/reset-password'} ><span className="text-blue-500 underline">Reset password</span></Link></p>
                    </form>
                </div>
            </div>
        </>
    )
}