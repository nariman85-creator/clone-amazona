import React,{useEffect} from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signin } from '../ACTIONS/userActions';
import Loading from '../components/Loading';
import MessageBox from '../components/MessageBox';

function SigninScreen(props) {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const redirect=props.location.search?props.location.search.split('=')[1]:'/';
    const userSignIn = useSelector((state) => state.userSignIn);
    const { userInfo,loading,error } = userSignIn;

    const dispatch=useDispatch();
    const submithandler=(e)=>{
        e.preventDefault();
        dispatch(signin(email,password));

    };
    useEffect(()=>{
      if(userInfo){
          props.history.push(redirect);
      }
    },[userInfo,props.history,redirect]);

    return (
     <div>
      <form className="form" onSubmit={submithandler}>
       <div>
        <h1>Sign In</h1>
       </div>
       {loading&&<Loading/>}
       {
           error&&<MessageBox variant="danger">{error}</MessageBox>
       }
       <div>
        <label htmlFor="email">Email address</label>
        <input
         type="email"
         id="email"
         placeholder="Enter Email"
         required
         onChange={(e) => setEmail(e.target.value)}
        />
       </div>
       <div>
        <label htmlFor="password">Input password</label>
        <input
         type="password"
         id="password"
         placeholder="Enter password"
         required
         onChange={(e) => setPassword(e.target.value)}
        />
       </div>
       <div>
        <label />
        <button className="primary" type="submit">
         Sign In
        </button>
       </div>
       <div>
           <label/>
           <div>
               New customer? {''}
               <Link to={`/register/redirect=${redirect}`}>Create your account</Link>
           </div>
       </div>
      </form>
     </div>
    );
}

export default SigninScreen
