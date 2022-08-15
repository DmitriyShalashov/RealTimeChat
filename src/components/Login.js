import React, { useContext } from 'react';
import { Context } from '..';
import { GoogleAuthProvider,signInWithPopup, getIdToken } from "firebase/auth";
import { Link } from 'react-router-dom';

function Login() {
    const {auth} = useContext(Context)
    const login=async()=>{
        const provider =new GoogleAuthProvider()
        const {user}=await signInWithPopup(auth,provider)
        console.log(user)
    }

    return ( 
        <div>
            <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
  <div className="max-w-md w-full space-y-8">
    <div>
      <img className="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="workFlow"/>
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in with Google</h2>
      <p className="mt-2 text-center text-sm text-gray-600"></p>
    </div>
    
      

      <div>
        <button onClick={login} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          <span className="absolute left-0 inset-y-0 flex items-center pl-3">
            
            <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"  />
            </svg>
          </span>
          Sign in
        </button>
      </div>
    
  </div>
</div>
        </div>
     );
}

export default Login;