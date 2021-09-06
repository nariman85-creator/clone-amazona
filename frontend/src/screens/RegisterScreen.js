import React,{useEffect} from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../ACTIONS/userActions';
import Loading from '../components/Loading';
import MessageBox from '../components/MessageBox';

function RegisterScreen(props) {
    const [email,setEmail]=useState('');
    const [name, setName] = useState('');
    const [password,setPassword]=useState('');
    const [confirmPassword,setConfirmPassword]=useState('');
    const redirect=props.location.search?props.location.search.split('=')[1]:'/';
    const userSignIn = useSelector((state) => state.userSignIn);
    const { userInfo,loading,error } = userSignIn;

    const dispatch=useDispatch();
    const submithandler=(e)=>{
        e.preventDefault();
        if(password!==confirmPassword){
            alert("Password and confirm password are not match")
        }else{
        dispatch(register(name, email, password));

        }

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
        <h1>Register</h1>
       </div>
       {loading && <Loading />}
       {error && <MessageBox variant="danger">{error}</MessageBox>}
       <div>
        <label htmlFor="name">Name</label>
        <input
         type="text"
         id="name"
         placeholder="Enter Name"
         required
         onChange={(e) => setName(e.target.value)}
        />
       </div>
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
        <label htmlFor="password">Input Password</label>
        <input
         type="password"
         id="password"
         placeholder="Enter password"
         required
         onChange={(e) => setPassword(e.target.value)}
        />
       </div>
        <div>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
         type="password"
         id="confirmPassword"
         placeholder="Enter confirm password"
         required
         onChange={(e) => setConfirmPassword(e.target.value)}
        />
       </div>

       <div>
        <label />
        <button className="primary" type="submit">
         Register
        </button>
       </div>
       <div>
        <label />
        <div>
         Already have an account? {''}
         <Link to={`/signin/redirect=${redirect}`}>Sign In</Link>
        </div>
       </div>
      </form>
     </div>
    );
}

export default RegisterScreen;
