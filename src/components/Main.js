import React, { useContext, useState ,useEffect} from 'react';
import {useAuthState} from 'react-firebase-hooks/auth'
import { Context } from '..';
function Main() {
    const {auth, firestore} = useContext(Context);
    const [user] = useAuthState(auth)
    const [name,setName]=useState('')
    useEffect(()=>{
        user
        ?setName(user.displayName)
        :setName('')
     },[user])

    console.log(user);
    return ( 
        <div className='container mt-[-70px] mx-auto max-w-7xl  px-2 sm:px-6 lg:px-8 flex justify-left items-center h-screen'>
            <div className='container flex justify-left items-center w-2/3 h-80 border-black border-solid border-2 p-10 rounded-xl'>
                <div className='relative'> 
                    <h1 className='text-6xl mb-10 font-medium'>Главная Страница</h1>
                    <div className='flex'>
                        <h2 className='text-3xl mb-0 font-light mr-4'>Здравствуйте </h2>
                        <p className='text-3xl mb-0 font-normal mr-4'>{name}</p>
                    </div>
                    <div className='mt-4'>
                    {user
                    ?<p className='ask text-3xl mb-0 font-light mr-4'>Как у вас дела?</p>
                    :<p className='text-3xl mb-0 font-light mr-4'>Вы не вошли в аккаунт</p>}
                    </div>
                </div>
              
                    
            </div>
            
        </div>
    );
}

export default Main;