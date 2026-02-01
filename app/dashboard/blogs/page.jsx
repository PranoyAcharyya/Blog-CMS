"use client"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs, deleteBlog } from "@/store/blogSlice";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { MoreHorizontalIcon } from "lucide-react"
import { Spinner } from "@/components/ui/spinner";

const MyBlogsPage = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const{items,loading} = useSelector((state)=>state.blogs);

    // fetch blogs//

    useEffect(()=>{
        async function loadBlogs() {
            const{data:{user}} = await supabase.auth.getUser();
            dispatch(fetchBlogs(user.id));
        }
        loadBlogs();
    },[dispatch])

    //delete

    async function handleDelete(id) {
        const ok = confirm("Delete this blog?");
        if(!ok) return;
        await dispatch(deleteBlog(id)).unwrap();
    }

  return (
    
    <div className="w-full mx-auto px-5 py-3">
        <h1 className="text-2xl font-bold mb-4">My Blogs</h1>
        {loading && <><Spinner/></>}
        {!loading && items.length === 0 && (
        <p>No blogs found.</p>
      )}
         <Table className="w-full">

        <TableHeader>
          <TableRow>
            <TableHead>Feature Image</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="text-right">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>

          {items.map((blog) => (
            <TableRow key={blog.id}>

              <TableCell>

              <img src={blog.featured_image} className="w-[100px] h-[50px] object-cover"/>
              </TableCell>

              <TableCell className="font-medium">
                {blog.title}
              </TableCell>

              <TableCell>
                {blog.category}
              </TableCell>

              <TableCell>
                {new Date(blog.created_at)
                  .toLocaleDateString()}
              </TableCell>

              <TableCell className="text-right">

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8"
                    >
                      <MoreHorizontalIcon />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end">

                    <DropdownMenuItem
                      onClick={() =>
                        router.push(
                          `/dashboard/edit/${blog.id}`
                        )
                      }
                    >
                      Edit
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                      variant="destructive"
                      onClick={() =>
                        handleDelete(blog.id)
                      }
                    >
                      Delete
                    </DropdownMenuItem>

                  </DropdownMenuContent>

                </DropdownMenu>

              </TableCell>

            </TableRow>
          ))}

        </TableBody>

      </Table>
    </div>
     
    
    
  )
}

export default MyBlogsPage