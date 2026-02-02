import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

export default function AuthLayout ({children}){
    return(
        <>
              <AnimatedThemeToggler duration={400} className="absolute right-4 top-5"/>
        {children}
        
        </>
      
    )
}