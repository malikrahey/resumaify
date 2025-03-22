"use client";

import React, { useEffect } from 'react'
import StoreProvider from '../StoreProvider';
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    console.log("useEffect");
    const checkLogin = async () => {
      const { data: user } = await supabase.auth.getUser();
      console.log(user.user);
      if (!user.user) {
        router.push('/sign-in')
      }
    }
    checkLogin();

  }, [router, supabase.auth]);

  return (
    <main className='flex flex-row min-w-[100vw] min-h-screen'>
      <StoreProvider>
      <nav className='h-full'>
          <Navbar />
      </nav>
      <main className='w-full bg-neutral-200 p-8'> 
        
        {children}
        <a>
          <div className='w-12 h-12 fixed right-0 bottom-0'></div>
        </a>
      </main>
      </StoreProvider>
    </main>
  )
}

export default Layout