"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { useRedirectIfAuth } from "@/lib/useRedirectIfAuth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Spinner } from "@/components/ui/spinner";
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
import { useTheme } from "next-themes";

const schema = yup.object({
  email: yup.string().email().required("Email required"),
  password: yup.string().required("Password required"),
});

export default function LoginPage() {
  const { theme } = useTheme()
  // ✅ ALL HOOKS FIRST
  const checking = useRedirectIfAuth();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
   const handleNavigation = () => {
    router.push('/signup');
  };

  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // ✅ BLOCK RENDER UNTIL CHECK FINISHES
  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  async function onSubmit(values) {
    setLoading(true);

    const { error } =
      await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

    if (error) {
      setLoading(false);
      alert(error.message);
    } else {
      setLoading(false);
      window.location.href = "/dashboard";
    }
  }


  return (
    <div className="min-h-screen flex justify-center items-center flex-col p-5 w-full">
      <MagicCard gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
        className="p-4 rounded-xl flex flex-col items-center">

        <Form {...form} className="w-full">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full md:w-96 space-y-4"
        >
          <HyperText className='text-center'>Login</HyperText>

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
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            className="w-full"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </Form>
      <Button className="mt-4 w-full" onClick={handleNavigation}>Not registered yet? Sign up</Button>

      </MagicCard>
      
    </div>
  );
}
