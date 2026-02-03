"use client";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { useState } from "react";
import { useRedirectIfAuth } from "@/lib/useRedirectIfAuth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { HyperText } from "@/components/ui/hyper-text";
import { MagicCard } from "@/components/ui/magic-card";

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
import { Spinner } from "@/components/ui/spinner";
import { useTheme } from "next-themes";

const schema = yup.object({
  fullName: yup.string().required("Full name required"),
  age: yup.number().required(),
  phone: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
  image: yup.mixed().required(),
});

const SignupPage = () => {
  const { theme } = useTheme();
  const checking = useRedirectIfAuth();

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleNavigation = (e) => {
    e.preventDefault();
    router.push("/login");
  };

  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      fullName: "",
      age: "",
      phone: "",
      email: "",
      password: "",
      image: null,
    },
  });

  const onSubmit = async (values) => {
    try {
      setLoading(true);
      // 1. Create auth user



      const { data, error: authError } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            name: values.fullName,
          },
        },
      });

      if (authError) throw authError;

      const user = data.user;

      // 2. Upload Avatar

      const file = values.image[0];
      const path = `${user.id} - ${file.name}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(path, file);
      if (uploadError) throw uploadError;

      const { data: img } = supabase.storage.from("avatars").getPublicUrl(path);

      // 3. Insert Profile row

      const { error: profileError } = await supabase.from("profiles").insert({
        user_id: user.id,
        full_name: values.fullName,
        age: values.age,
        phone: values.phone,
        profile_image: img.publicUrl,
      });

      if (profileError) throw profileError;

      alert("Account Created");
      setLoading(false);

      router.push("/login");
    } catch (error) {
      setLoading(false);
      alert(error.message);
    }
  };
  if (checking) return <>Loading...</>;
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <MagicCard
        gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
        className="p-4 rounded-xl flex flex-col items-center"
      >
        <Form {...form}>
          <form
            className="w-96 space-y-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <HyperText className="text-center">Sign Up</HyperText>
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} autoComplete/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profile Image</FormLabel>
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
            <Button className="w-full" type="submit" disabled={loading}>
              {loading ? "Creating Account..." : "Sign Up"}
            </Button>
          </form>
        </Form>
        <Button className="mt-4 w-full" onClick={handleNavigation}>
          Aleready have account ? Log In
        </Button>
      </MagicCard>
    </div>
  );
};

export default SignupPage;
