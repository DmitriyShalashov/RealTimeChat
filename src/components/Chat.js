
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import {useAuthState} from 'react-firebase-hooks/auth'
import {useCollectionData} from 'react-firebase-hooks/firestore'
import { addDoc, collection, orderBy, getDocs, serverTimestamp, setDoc, query, onSnapshot } from "firebase/firestore"; 

import { Context } from '..';
function Chat() {
    const {auth, firestore} = useContext(Context);
    const [user] = useAuthState(auth)
    const [value, setValue]=useState('')
    const [messages,setMessages]=useState([])
    const messageCollectionRef = collection(firestore, "messages",  )

    const element = useRef()
    
    
   
    useEffect(()=>{
         const q = query(messageCollectionRef, orderBy('createdAt'))
            onSnapshot(q,(snapshot)=>{
            const h=snapshot.docs.map(doc=>
                ({...doc.data(), id:doc.id})
            )
            setMessages(h)
         })
    }
    ,[])
    
    const sendMessage=()=>{
        const newMessage={
            text:value,
            name:user.displayName,
            photo:user.photoURL,
            uid:user.uid,
            createdAt:serverTimestamp()
        }
        addDoc(messageCollectionRef, newMessage)
        setValue('')
    }
    useEffect(()=>
       {element.current?.scrollIntoView({behavior:'smooth'})}      
    ,[messages])
    function timeConverter(el){
        if(el!==null){
            var a = new Date(el.seconds * 1000);
            var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
            var year =a.getFullYear()
            var month = months[a.getMonth()];
            var date = a.getDate();
            var hour = a.getHours();
            hour=hour<10?'0'+hour:hour
            var min = a.getMinutes();
            min=min<10?'0'+min:min
            var sec = a.getSeconds();
            sec=sec<10?'0'+sec:sec
            var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
            return time;
        }
      
      }
    return ( 
        <div className='container mt-[-70px] mx-auto max-w-7xl  sm: lg: flex justify-left items-center h-screen flex justify-between relative z-[1] '>
            <div className='w-[8%] h-[70%]  mt-[-40px] border-4 border-solid border-neutral-300 rounded-xl block'>
                <div className='w-[70px] h-[70px] mt-[20px] rounded-xl border-4 border-solid border-indigo-600 m-auto'></div>
                <div className='w-[70px] h-[70px] mt-[20px] rounded-xl border-4 border-solid border-indigo-600 m-auto'></div>
            </div>
            <div className='w-[90%] h-[70%] border-4 border-solid border-neutral-300 rounded-xl mt-[-40px] overflow-y-scroll messages'>
               
                {messages.map(el=>
                    el.uid!==user.uid?<div className='w-[400px] m-3  flex mb-[50px] ' key={el.id} ref={element}>
                        <img src={el.photo} className='w-[40px] h-[40px] rounded-[90px]'/>
                        <div> 
                            <h5 className='text-[15px]  ml-2 mb-1'>{el.name}</h5>
                            <div className='w-[250px] border-2 border-indigo-400 ml-2 p-2 rounded-[5px] '>    
                                <h4 className='whitespace-pre-line break-words	'>{el.text}</h4>    
                            </div> 
                        </div>
                        <h5 className='text-[12px] ml-1 mt-6'>{timeConverter(el.createdAt)}</h5>
                    </div>
                    :<div className='w-[400px] m-3 flex mb-[50px] ml-auto relative' key={el.id} ref={element}>
                        <h5 className='text-[12px] w-[100px] mt-6 mr-[-12px]'>{timeConverter(el.createdAt)}</h5>
                        <div className=''>
                            <h5 className='text-[15px] ml-[170px] mb-1'>{user.displayName}</h5>
                            <div className='w-[260px] bg-indigo-500 text-white mr-2 p-2 rounded-[5px] rounded-l-[10px]'>    
                                <h4 className='whitespace-pre-line break-words	'>{el.text}</h4>    
                            </div> 
                        </div>
                        <img src={user.photoURL} className='w-[40px] h-[40px] rounded-[90px] absolute bottom-0 right-0'/>
                    </div>
                )}
                
               
                    
                
                      
                
                
            </div>
            <input className='pointer-events-auto absolute w-[500px] h-[50px] bottom-[60px] left-[10%] border-4 border-solid border-neutral-300 rounded-xl' 
                placeholder='Ваше сообщение' 
                value={value}
                onChange={e=>setValue(e.target.value)}
            ></input>
            <button onClick={sendMessage} className='absolute w-[200px] h-[50px] bottom-[60px] right-0 bg-indigo-600 rounded-xl text-white font-medium text-lg duration-500 ease-linear hover:bg-indigo-700'>Отправить</button>
        </div>
    );
}

export default Chat;