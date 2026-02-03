"use client";

import Link from "next/link";
import { BookOpen, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { ModeToggle } from "./ThemeButton";
import { useEffect, useState } from "react";
import { getUser } from "@/lib/getUser";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from 'next/navigation';


const navItems = [
  { name: "Home", href: "/" },
  {name:"Blogs",href:"/blogs"},
  { name:"Dashboard",href:"/dashboard"}
];

export default function Navbar() {
  const [user , setUser ] = useState(null);
  const router = useRouter();

  useEffect(()=>{
    async function loadUser() {
      const {data:{user}} = await supabase.auth.getUser();
      setUser(user);
    }
    loadUser();
  },[])

  async function handleLogout() {
      await supabase.auth.signOut();
      window.location.href = "/login";
  }

  return (
    <nav className="w-full border-b bg-background/50 sticky top-0 backdrop-blur z-[99]" >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">

        {/* Logo */}
        <Link href="/" className="text-xl font-bold flex items-center gap-1">
        <BookOpen />
          <p>MIND</p>
        </Link>

        {/* ================= DESKTOP MENU ================= */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium transition uppercase"
            >
              {item.name}
            </Link>
          ))}

          <div className="flex items-center gap-2">
            {user && <Button variant="outline" onClick = {handleLogout}>
                  Logout
                </Button>}
            {!user && <Button variant="outline" onClick={()=>{router.push('/login')}}>Login</Button>}
            {!user && <Button variant="outline" onClick={()=>{router.push('/signup')}}>Signup</Button>}
            <ModeToggle />
          </div>
        </div>

        {/* ================= MOBILE ACTIONS ================= */}
        <div className="flex items-center gap-2 md:hidden">

          {/* Theme Toggle */}
          <ModeToggle />

          {/* Hamburger */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="px-4 pt-5">
              <SheetTitle className="text-lg font-semibold">
                Menu
              </SheetTitle>

              <div className="flex flex-col gap-6 mt-10">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-lg font-medium uppercase"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              <div className="flex flex-col gap-2 mt-6">
                {user && <Button className="w-full" variant="outline" onClick = {handleLogout}>
                  Logout
                </Button>}

                {!user && <Button className="w-full" variant="outline" onClick={()=>{router.push('/login')}}>
                  Login
                </Button>}

                {!user && <Button className="w-full" variant="outline" onClick={()=>{router.push('/signup')}}>
                  Signup
                </Button>}
              </div>
            </SheetContent>
          </Sheet>

        </div>

      </div>
    </nav>
  );
}
