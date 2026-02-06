"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { Spinner } from "@/components/ui/spinner";
import Blogcard from "@/components/blogcard";
import { Bounce, ToastContainer } from "react-toastify";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileHeart, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { removeBookmark } from "@/store/bookmarkSlice";

function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { bookmarks } = useSelector((state) => state.bookmarks);
  const dispatch = useDispatch();
  const handleRemoveBookmark = (data) => {
    dispatch(removeBookmark(data));
  };

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

  if (loading)
    return (
      <div className="p-6 h-screen w-full flex flex-col justify-center items-center">
        <Spinner />
      </div>
    );
  return (
    <div className="max-w-7xl mx-auto p-6">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <h1 className="text-3xl font-bold mb-6 text-center">All Blogs</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <Blogcard key={blog.id} blog={blog} />
        ))}
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <Button className="fixed bottom-4 right-4 bg-green-500">
            <FileHeart />
            {bookmarks.length}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Bookmarks</DialogTitle>
            <DialogDescription>Here is your bookmark lists</DialogDescription>
          </DialogHeader>
          <div className="no-scrollbar -mx-4 max-h-[50vh] overflow-y-auto px-4">
            {bookmarks.length === 0 && 'no items in bookmark'}
            {bookmarks.map((b) => (
              <div className="relative">
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
                  <h3
                    className="font-bold"
                    style={{ width: "calc(100% - 100px)" }}
                  >
                    {b.title}
                  </h3>
                </Link>
                <X
                  size={16}
                  className="cursor-pointer text-muted-foreground hover:text-red-500 absolute right-0 top-[50%] translate-middle-y"
                  onClick={() => handleRemoveBookmark(b)}
                />
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default BlogsPage;
