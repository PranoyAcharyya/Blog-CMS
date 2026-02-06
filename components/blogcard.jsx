"use client";
import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { addtoBookmark, removeBookmark } from "@/store/bookmarkSlice";
import { Bookmark, BookmarkCheck, User } from "lucide-react";
import { toast } from "react-toastify";

const Blogcard = ({ blog }) => {
  const bookmarks = useSelector((state) => state.bookmarks.bookmarks);

  const bookmarked = bookmarks.some((item) => item.id === blog.id);

  // const [bookmarked,setBookmarked] =useState(false);
  const dispatch = useDispatch();

  const handleBookmarks = (data) => {
    if (!bookmarked) {
      dispatch(addtoBookmark(data));
      toast.success("Bookmark Added");
    } else {
      dispatch(removeBookmark(data));
      toast.info("Bookmark removed");
    }
  };

  function htmlToPlainText(html) {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  }

  return (
    <Card className="mx-auto w-full max-w-sm pt-0 overflow-hidden relative">
      <div
        className="absolute top-2 right-2 cursor-pointer  rounded"
        onClick={() => handleBookmarks(blog)}
      >
        {bookmarked ? (
          <BookmarkCheck color="#ff2056" />
        ) : (
          <Bookmark color="#ff2056" />
        )}
      </div>
      <img
        src={blog.featured_image}
        alt="Event cover"
        className="aspect-video w-full object-cover"
      />
      <CardHeader>
        <CardAction>
          <Badge variant="secondary">{blog.category}</Badge>
        </CardAction>
        <Link href={`/blogs/${blog.id}`} className="w-full">

         <CardTitle className='line-clamp-1 hover:text-red-500'>{blog.title}</CardTitle>
        </Link>

       
        <Button variant="outline" size="sm" className='self-start max-w-fit mt-2'>
          <User /> {blog.author_name}
        </Button>
        <CardDescription className="line-clamp-2">
          {htmlToPlainText(blog.content)}
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Link href={`/blogs/${blog.id}`} className="w-full">
          <Button className="w-full cursor-pointer">View blog</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default Blogcard;
