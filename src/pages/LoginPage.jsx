import axios from 'axios';
import Header from '../Header'
import { useContext, useState } from "react";
import { Navigate } from 'react-router-dom';
import { UserContext } from '../UserContext';


export default function LoginPage(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState('');
    const {setUser}=useContext(UserContext);
    async function handleLoginSubmit(ev) {
        ev.preventDefault();
        try {
          const {data}=await axios.post('/login', {email,password});
          setUser(data);
          alert('Login successful');
          setRedirect(true);
        } catch (e) {
          alert('Login failed');
        }
      }
    
      if (redirect) {
        return <Navigate to={'/'} />
      }
    

    return(
        <div className='mt-4 grow items-center justify-around '>
        <Header />
        <div className='mt-32'>
            <h1 className='text-4xl text-center mb-4'>Login to your account </h1>
            <form className='max-w-md mx-auto' onSubmit={handleLoginSubmit }>
            <input type='email' placeholder='Your email address' value={email} onChange={ev=>setEmail(ev.target.value)}/>
            <input type='password' placeholder='Your password' value={password} onChange={ev=>setPassword(ev.target.value)}/>
            <button className='primary'>Login</button>
            <div className='text-center py-2 text-gray-500'>
                Dont have an account ? <a  href="/register" className="ml-2 underline text-primary">Register</a>
            </div>
            </form>
        </div>
         </div>
    );
}