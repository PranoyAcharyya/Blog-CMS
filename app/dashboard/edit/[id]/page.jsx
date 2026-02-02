"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateBlog } from "@/store/blogSlice";
import { supabase } from "@/lib/supabaseClient";
import { useRouter, useParams } from "next/navigation";

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

const schema = yup.object({
  title: yup.string().required(),
  category: yup.string().required(),
  content: yup.string().required(),
  image: yup.mixed().nullable(),
});

const apiKey=process.env.NEXT_PUBLIC_TINYMCE_API_KEY

const EditBlogPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState("");

  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      category: "",
      content: "",
    },
  });

  /* =======================
     LOAD BLOG
  ======================= */

  useEffect(() => {
    async function loadBlog() {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        alert(error.message);
        return;
      }

      form.reset({
        title: data.title,
        category: data.category,
        content: data.content,
      });
      setCurrentImage(data.featured_image);
      setLoading(false);
    }

    loadBlog();
  }, [id, form]);

  async function onSubmit(values) {
    try {
      let imageUrl = currentImage;

      // If new image selected
      if (values.image && values.image.length > 0) {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        const file = values.image[0];
        const path = `${user.id}-${Date.now()}-${file.name}`;

        const { error: uploadError } = await supabase.storage
          .from("blog-images")
          .upload(path, file);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage
          .from("blog-images")
          .getPublicUrl(path);

        imageUrl = data.publicUrl;
      }

      await dispatch(
        updateBlog({
          id,
          updates: {
            title: values.title,
            category: values.category,
            content: values.content,
            featured_image: imageUrl,
          },
        }),
      ).unwrap();

      router.push("/dashboard/blogs");
    } catch (err) {
      alert(err.message);
    }
  }

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold mb-4">Edit Blog</h1>

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
            {currentImage && (
  <img
    src={currentImage}
    alt="Current"
    className="w-40 rounded border"
  />
)}
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Feature Image (optional)</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => field.onChange(e.target.files)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button>Update Blog</Button>
        </form>
      </Form>
    </div>
  );
};

export default EditBlogPage;
