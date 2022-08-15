import React, {useContext, useEffect, useState} from 'react';
import { LOGIN_ROUTE } from '../utils/consts';
import {Link} from 'react-router-dom'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'
import { useAuthState } from 'react-firebase-hooks/auth';
import { Context } from '..';




function NavBar() {
  
  const {auth} = useContext(Context);
  const [user] = useAuthState(auth)
  const [photo,setPhoto]=useState('null')

  const navigation = user? [
    { name: 'Главная', href: '/', current: true },
    {  name: 'Чаты', href: '/Chat', current: false},
  ]
  :[
    { name: 'Главная', href: '/', current: true },
  ]
  
  const navigationLogin={ name: 'Войти', href: {LOGIN_ROUTE}, current: false }
  
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  

  useEffect(()=>{
     user
     ?setPhoto(user.photoURL)
     :setPhoto('')
  },[user])
  
  const logOut =()=>{
      auth.signOut()
      console.log(user)
  }
  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className=" max-w-7xl mx-auto px-2 sm:  lg: ">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="z-[2] flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <img
                    className="block lg:hidden h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                    alt="Workflow"
                  />
                  <img
                    className="hidden lg:block h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
                    alt="Workflow"
                  />
                </div>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link to={item.href} 
                        key={item.name}
                        className={classNames(
                          item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'px-3 py-2 rounded-md text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </Link>

                    ))}
                    {user?<Link to='#' onClick={()=>logOut()} 
                        className={classNames(
                          navigationLogin.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'px-3 py-2 rounded-md text-sm font-medium'
                        )}
                        
                      >
                        {'Выйти'}
                      </Link>
                      :<Link to={LOGIN_ROUTE} 
                        className={classNames(
                          navigationLogin.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'px-3 py-2 rounded-md text-sm font-medium'
                        )}
                        
                      >
                        {'Войти'}
                      </Link>
                     }
                     
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  type="button"
                  className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="ml-3 relative">
                  <div>
                    <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src={photo}
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                    
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link to={item.href} exact><Disclosure.Button
                  key={item.name}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block px-3 py-2 rounded-md text-base font-medium'
                  )}
                aria-current={item.current ? 'page' : ''}
                >
                  {item.name}
                </Disclosure.Button></Link>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

export default NavBar;