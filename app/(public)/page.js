
import React from 'react'
import { VideoText } from "../../components/ui/video-text"
import { AuroraText } from '@/components/ui/aurora-text'
import { ScrollVelocityContainer, ScrollVelocityRow } from '@/components/ui/scroll-based-velocity'


const page = () => {
  return (<>

    <section className=" flex flex-col container mx-auto px-4 pt-[100px] lg:h-128 lg:flex lg:items-center lg:space-x-8">
    
          <div className="relative h-[200px] md:h-[500px] w-full overflow-hidden">
  <VideoText src="https://cdn.magicui.design/ocean-small.webm">MIND</VideoText>
</div>
<h1 className="text-4xl text-center font-bold tracking-tighter md:text-5xl lg:text-7xl text-capitalize">
      Write <AuroraText className="capitalize">Whatever In your mind</AuroraText>
    </h1>
    
        </section>
        <section className='py-20'>
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      <ScrollVelocityContainer className="text-4xl font-bold tracking-[-0.02em] md:text-7xl md:leading-[5rem]">
        <ScrollVelocityRow baseVelocity={20} direction={1}>
          Developent Blogs 
        </ScrollVelocityRow>
        <ScrollVelocityRow baseVelocity={20} direction={-1}>
          Blogs
        </ScrollVelocityRow>
      </ScrollVelocityContainer>
      <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r"></div>
      <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l"></div>
    </div>
        </section>

        
</>
         )
         
}

export default page