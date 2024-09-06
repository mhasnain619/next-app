"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

const Nav = () => {
    const { data: session } = useSession();
    const [providers, setProviders] = useState(null);
    const [toogleDropdown, setToogleDropdown] = useState(false);

    useEffect(() => {
        const fetchProviders = async () => {
            const response = await getProviders();
            setProviders(response);
        };

        fetchProviders();
    }, []);

    return (
        <nav className='flex-between w-full mb-16 pt-3'>
            <Link href='/' className='flex gap-2 flex-center'>
                <Image width={30} height={30} className='object-contain' alt='logo' src='/assets/images/logo.svg' />
                <p className='logo_text'>prompt</p>
            </Link>
            {/* Desktop Navigation */}
            <div className='hidden sm:flex'>
                {session?.user ? (
                    <div className='flex gap-3 md:gap-5'>
                        <Link href='/create-prompt'><p className='black_btn'>Create Post</p></Link>
                        <button type='button' onClick={signOut} className='outline_btn'>Sign Out</button>
                        <Link href='/profile'>
                            <Image width={37} height={37} className='object-contain' alt='logo' src={session?.user?.image}
                            />
                        </Link>
                    </div>
                ) : (
                    <>
                        {providers && Object.values(providers).map((provider) => (
                            <button
                                type='button'
                                key={provider.name}
                                onClick={() => signIn(provider.id)}
                                className='black_btn'
                            >
                                Sign In
                            </button>
                        ))}
                    </>
                )}
            </div>

            {/* Mobile Navigation */}
            <div className='flex sm:hidden relative'>
                {session?.user ? (
                    <div className='flex'>
                        <Image
                            width={37}
                            height={37}
                            className='object-contain'
                            alt='logo'
                            src={session?.user?.image}
                            onClick={() => setToogleDropdown((prev) => !prev)}
                        />
                        {toogleDropdown && (
                            <div className='dropdown'>
                                <Link
                                    href='/profile'
                                    className='dropdown_link'
                                    onClick={() => setToogleDropdown(false)}
                                >
                                    My Profile
                                </Link>
                                <Link
                                    href='/create-prompt'
                                    className='dropdown_link'
                                    onClick={() => setToogleDropdown(false)}
                                >
                                    Create Prompt
                                </Link>
                                <button
                                    type='button'
                                    className='mt-5 w-full black_btn'
                                    onClick={() => {
                                        setToogleDropdown(false)
                                        signOut()
                                    }}
                                >
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        {providers && Object.values(providers).map((provider) => (
                            <button
                                type='button'
                                key={provider.name}
                                onClick={() => signIn(provider.id)}
                                className='black_btn'
                            >
                                Sign In
                            </button>
                        ))}
                    </>
                )}
            </div>
        </nav >
    );
};

export default Nav;
