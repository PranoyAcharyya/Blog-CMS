"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { MoveLeft } from "lucide-react";
import Link from "next/link";

export default function BlogDetailsPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    async function loadBlog() {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("id", id)
        .single();

      if (!error) {
        setBlog(data);
      }

      setLoading(false);
    }

    loadBlog();
  }, [id]);

  useEffect(() => {
    const loadAllblogs = async () => {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error) {
        setBlogs(data);
      }
      setLoading(false);
    };
    loadAllblogs();
  }, []);

  if (loading) return <p className="p-6">Loading...</p>;

  if (!blog) return <p>Blog not found</p>;

  return (
    <div className="max-w-7xl mx-auto p-6 flex flex-col md:flex-row  gap-5">
      <div className="w-full md:w-[70%]">
        <img src={blog.featured_image} className="w-full rounded-lg mb-6" />
        <h3>By {blog.author_name}</h3>
        <p className="text-sm text-gray-500 mb-2">
          <b className="text-black">Category:</b> {blog.category}
        </p>

        <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>

        <div
          className="prose dark:prose-invert"
          dangerouslySetInnerHTML={{
            __html: blog.content,
          }}
        />
        <Link href={"/blogs"}>
          <Button variant="outline" size="sm" className="mt-3 capitalize">
            <MoveLeft /> back to all blogs
          </Button>
        </Link>
      </div>
      <div className="w-full md:w-[30%]">
        <h2 className="font-bold text-2xl">Other Stories</h2>
        {blogs.map((b) => (
          <Link
            className="flex items-center gap-2 mt-4"
            href={`/blogs/${b.id}`}
            key={b.id}
          >
            <img
              src={b.featured_image}
              alt={b.title}
              className="w-[100px] h-[50px] object-cover"
            />
            <h3 className="font-bold" style={{ width: "calc(100% - 100px)" }}>
              {b.title}
            </h3>
          </Link>
        ))}
      </div>
    </div>
  );
}
