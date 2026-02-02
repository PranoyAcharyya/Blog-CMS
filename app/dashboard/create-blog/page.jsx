"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { createBlog } from "@/store/blogSlice";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

import { Editor } from "@tinymce/tinymce-react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// =======================
// Validation Schema
// =======================

const schema = yup.object({
  title: yup.string().required("Title required"),
  category: yup.string().required("Category required"),
  content: yup.string().required("Content required"),
  image: yup.mixed().required("Feature image required"),
});

const apiKey=process.env.NEXT_PUBLIC_TINYMCE_API_KEY


export default function CreateBlogPage() {
  
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      category: "",
      content: "",
      image: null,
    },
  });

  // =======================
  // SUBMIT
  // =======================

  async function onSubmit(values) {
    try {
      setLoading(true);

      // 1️⃣ Get user
      const {
        data: { user },
      } = await supabase.auth.getUser();
      //  console.log("User:", user);
      // 2️⃣ Upload image
      const file = values.image[0];
      const path = `${user.id}-${Date.now()}-${file.name}`;

      const { error: uploadError } = await supabase.storage
        .from("blog-images")
        .upload(path, file);

      if (uploadError) throw uploadError;

      const { data: img } = supabase.storage
        .from("blog-images")
        .getPublicUrl(path);

      // 3️⃣ Blog object
      const blogData = {
        title: values.title,
        category: values.category,
        content: values.content,
        featured_image: img.publicUrl,
        author_id: user.id,
      };

      // 4️⃣ Redux Save
      console.log("Blog Data:", blogData);
      await dispatch(createBlog(blogData)).unwrap();
      //   console.log("Submitting blog:", values);

      setLoading(false);
      router.push("/dashboard/blogs");
    } catch (err) {
      // console.error(err);
      setLoading(false);
      alert(err.message);
    }
  }

  return (
    <div className=" mx-auto px-5">
      <h1 className="text-2xl font-bold mb-4">Create Blog</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Category */}
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Content */}
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Editor
                    apiKey={apiKey}
                    value={field.value}
                    init={{
                      height: 300,
                      menubar: false,
                      plugins: [
                        "image",
                        "advlist",
                        "autolink",
                        "lists",
                        "link",
                        "image",
                        "charmap",
                        "preview",
                        "anchor",
                        "searchreplace",
                        "visualblocks",
                        "code",
                        "fullscreen",
                        "insertdatetime",
                        "media",
                        "table",
                        "code",
                        "help",
                        "wordcount",
                        "anchor",
                      ],
                      toolbar:
                        "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                    }}
                    onEditorChange={(text) => field.onChange(text)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Image */}

          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Feature Image</FormLabel>
                {/* Preview */}
                {preview && (
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-40 rounded border mb-2"
                  />
                )}

                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      field.onChange(e.target.files);

                      if (file) {
                        setPreview(URL.createObjectURL(file));
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={loading}>
            {loading ? "Creating..." : "Create Blog"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
