"use client"
import { getUser } from '@/lib/getUser';
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { AuroraText } from '@/components/ui/aurora-text';

const DashboardPage = () => {
  const [currentUserName,setCurrentusername] = useState("");
    const router = useRouter();
    const currentUser = async()=>{
       try {
        const curUser = await getUser();
        setCurrentusername(curUser.user_metadata.name);
        
       
       } catch (error) {
          console.log(error);
          
       }
    }

    useEffect(()=>{
      currentUser();
    },[])
    
    
  

  return (
    <div className='px-5'>
     <h1 className='text-2xl md:text-5xl'>Hello, <AuroraText>{currentUserName}</AuroraText></h1> 
    </div>
  )
}

export default DashboardPage