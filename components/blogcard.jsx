"use client"
import React from 'react'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from 'next/link'


const Blogcard = ({blog}) => {

  function htmlToPlainText(html) {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
}

  return (
     <Card className="mx-auto w-full max-w-sm pt-0 overflow-hidden">
      
      <img
        src={blog.featured_image}
        alt="Event cover"
        className="relative aspect-video w-full object-cover"
      />
      <CardHeader>
        <CardAction>
          <Badge variant="secondary">{blog.category}</Badge>
        </CardAction>
        <CardTitle>{blog.title}</CardTitle>
        <CardDescription className="line-clamp-2">
          {htmlToPlainText(blog.content)}
          </CardDescription>
          
      </CardHeader>
      <CardFooter>
        <Link href={`/blogs/${blog.id}`} className='w-full'>
          <Button className="w-full cursor-pointer">View blog</Button>
        </Link>
        
      </CardFooter>
    </Card>
  )
}

export default Blogcard;