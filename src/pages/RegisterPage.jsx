import axios from 'axios';
import Header from '../Header'
import { useState } from "react";

export default function RegisterPage(){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    async function handleSubmit(ev){
        ev.preventDefault();
        try {
            await axios.post('/register',{
                name,
                email,
                password
            });
            alert('Registration successful, Login to continue ');    
                  
        }
        catch (error) {
         alert('Registration Failed! please try again later');   
        }
    }


    return(
        <div className='mt-4 grow items-center justify-around '>
        <Header />
        <div className='mt-32'>
            <h1 className='text-4xl text-center mb-4'>Register</h1>
            <form className='max-w-md mx-auto' onSubmit={handleSubmit}>
            <input type='text' placeholder='John Deo'value={name} onChange={ev=>setName(ev.target.value)}/>
            <input type='email' placeholder='Your email address' value={email} onChange={ev=>setEmail(ev.target.value)}/>
            <input type='password' placeholder='Your password' value={password} onChange={ev=>setPassword(ev.target.value)}/>
            <button className='primary'>Register</button>
            <div className='text-center py-2 text-gray-500'>
                Already have an account?? <a  href="/login" className="ml-2 underline text-primary">Login</a>
            </div>
            </form>
        </div>
         </div>
    );
}









// async function registerUser(ev) {
//     ev.preventDefault();
//     try {
//       await axios.post('/register', {
//         name,
//         email,
//         password,
//       });
//       alert('Registration successful. Now you can log in');
//     } catch (e) {
//       alert('Registration failed. Please try again later');
//     }
//   }