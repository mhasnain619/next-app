"use client";

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';
const Nav = () => {
    const isUserLogedIn = true
    const [providers, setProviders] = useState(null)

    useEffect(() => {
        const setProviders = async () => {
            const response = await getProviders()
            setProviders(response)
        }
    }, [])
    return (
        <nav className='flex-between w-full mb-16 pt-3'>
            <Link href='/' className='flex gap-2 flex-center'>
                <Image width={30} height={30} className='object-contain' alt='logo' src='/assets/images/logo.svg' />
                <p className='logo_text'>propmt</p>
            </Link>
            {/* mob navigation */}
            <div className='sm:flex hidden'>
                {isUserLogedIn ? (
                    <div className='flex gap-3 md:gap-5'>
                        <Link href='/create-pormpt'><p className='black_btn'>Create Post</p></Link>
                        <button type='button' onClick={signOut} className='outline_btn'>signOut</button>
                        <Link href='/profile'>
                            <Image width={37} height={37} className='object-contain' alt='logo' src='/assets/images/logo.svg' />
                        </Link>

                    </div>
                ) : (
                    <>
                        {providers && Object.values(providers).map((provider) => {
                            return (
                                <button
                                    type='button'
                                    key={provider.name}
                                    onClick={() => signIn(provider.id)}
                                    className='black_btn'
                                >
                                    Sign In
                                </button>
                            )
                        })}

                    </>
                )}
            </div>
        </nav >
    )
}

export default Nav
