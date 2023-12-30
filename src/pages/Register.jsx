import { useEffect, useState } from 'react';
import file from '../images/image.png';
import supabase from '../supabase_config';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { setUser } from '../state/slices/userSlice';
import { Link } from 'react-router-dom';

export default function Register() {
    const user = useSelector((state) => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [err, setErr] = useState([])
    const [image, setImage] = useState("")
    const [imageLink, setImageLink] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [user_id, setUserId] = useState("")
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("user", user);
        // if (user != null){
        //     navigate('/')
        //     return;
        // }
        setErr([])
        console.log("One");
        const username = e.target[0].value;
        const email = e.target[1].value;
        const password1 = e.target[2].value;
        const password2 = e.target[3].value;
        const img = e.target[4].files[0];
        setImage(img)
        if (password1 == password2){
            try {
                const { data: userDataaa, error} = await supabase.auth.signUp({
                    email,
                    password: password1,
                })
                setUsername(username)
                setEmail(userDataaa?.user?.email)
                setUserId(userDataaa?.user?.id)
                if (img) {
                    const { data, error } = await supabase
                      .storage
                      .from('ProfilePictures')
                      .upload(`${userDataaa.user.id}/${username}`, img)
                      if (error) {
                        setErr([...err, error.message])
                        console.log(error.message);
                      } else {     
                            const { data: datt } = supabase
                            .storage
                            .from('ProfilePictures')
                            .getPublicUrl(`${userDataaa.user.id}/${username}`)
                            setImageLink(datt.publicUrl)
                            setUsername(username)
                            async function CreateProfile () {
                                console.log(userDataaa.user.id, username, userDataaa.user.email, datt.publicUrl);
                                try {
                                    const { error } = await supabase
                                    .from('Profiles')
                                    .insert({ user_id: userDataaa.user.id, username: username, email: userDataaa.user.email, photo_url: datt.publicUrl })
                                } catch (eree) {
                                    setErr([...err, eree.message])
                                    console.log(eree.message);
                                }
                            }
                            CreateProfile()
                      }
                } else {
                    const fetchImage = async () => {
                        const { data, error } = supabase
                                .storage
                                .from('ProfilePictures')
                                .getPublicUrl(`unknown/user.png`)
                                if (data) {
                                    setImageLink(data.publicUrl)
                                    setUsername(username)
                                    console.log(data.publicUrl);
                                    console.log(imageLink);
                                    async function CreateProfile () {
                                        try {
                                            const { error } = await supabase
                                            .from('Profiles')
                                            .insert({ user_id: userDataaa.user.id, username: username, email: userDataaa.user.email, photo_url: data.publicUrl })
                                        } catch (eree) {
                                            setErr([...err, eree.message])
                                            console.log(eree.message);
                                        }
                                    }
                                    CreateProfile()
                                } else {
                                    setErr([...err, error.message])
                                    console.log(error);
                                }
                    }
                    fetchImage()
                }
                if (error){
                    setErr([...err, error.message])
                    console.log("Error occured", error);
                } else {
                    alert("Check your email and confirm.")
                    e.target[0].value = ""
                    e.target[1].value = ""
                    e.target[2].value = ""
                    e.target[3].value = ""
                    e.target[4].value = ""
                }
                navigate('/login')
                console.log('Two');
            } catch (error) {
                setErr([...err, error.message])
                console.log(error);
            }
        } else {
            setErr([...err, "Password did not matched!"])
            console.log(err);
        }
    }
    
    useEffect(()=> {
        supabase.auth.onAuthStateChange((_, session)=> {
            if (session) {
                dispatch(setUser(session?.user))
                navigate('/')
            }
        })
    }, [])
    return (
        <>
            <div className="bg-black flex flex-col h-screen items-center justify-center">
                <div className=" bg-slate-800 flex flex-col p-5 justify-center items-center rounded">
                    <h2 className="text-3xl py-3 text-white">Register</h2>
                    <form onSubmit={handleSubmit} className="flex flex-col space-y-3 justify-center items-center">
                        <input className="focus:outline-green-400 py-2 px-3 bg-slate-700 text-white" type="text" name="username" id="username" placeholder="Username" />
                        <input className="focus:outline-green-400 py-2 px-3 bg-slate-700 text-white" type="email" name="email" id="email" placeholder="Email" />
                        <input className="focus:outline-green-400 py-2 px-3 bg-slate-700 text-white" type="password" name="password1" id="password1" placeholder="Password" />
                        <input className="focus:outline-green-400 py-2 px-3 bg-slate-700 text-white" type="password" name="password2" id="password2" placeholder="Re-type Password"/>
                        <input className="focus:outline-green-400 py-2 px-3 bg-slate-700 text-white" type="file" name="file" id="file" onChange={e => setImage(e.target.files[0])} hidden/>
                        <div className='flex w-full justify-center items-center'>
                            <label htmlFor="file"><img src={file} alt="Image" className='w-full h-8 flex justify-start text-white'/></label>
                            <p className='text-white'>{image ? image.name: "profile picture(Optional)"}</p>
                        </div>
                        <div className='text-red-500'>
                            {err ? err.map((er) =>(
                                <div key={er}>{er}</div>
                            )) : ""}
                        </div>
                        <input type="submit" value="Register" className= " text-lg text-black py-2 px-4 bg-slate-300 hover:bg-slate-700 hover:text-white cursor-pointer"/>
                        <p className="text-slate-300">Already have an Account? <Link to={'/login'}><span className="text-blue-500 underline">Login</span></Link> </p>
                    </form>
                </div>
            </div>
        </>
    )
}