"use client"

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { Spinner } from "@/components/ui/spinner";
import Blogcard from "@/components/blogcard";

function BlogsPage() {
    const [blogs,setBlogs] = useState([])
    const [loading,setLoading] = useState(true)

    useEffect(()=>{
        const loadAllblogs = async()=>{
            const {data,error} = await supabase
            .from("blogs").select("*").order("created_at",{ascending:false});
            if(!error){
                setBlogs(data);
            }
            setLoading(false)
        }
        loadAllblogs();
    },[])

    if(loading) return <div className="p-6 h-screen w-full flex flex-col justify-center items-center"><Spinner/></div>;
  return (
    <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">All Blogs</h1>
         <div className="grid md:grid-cols-3 gap-6">
             {blogs.map((blog)=>(
            <Blogcard key={blog.id} blog={blog}/>
        ))}

         </div>
       
    </div>
  )
}

export default BlogsPage