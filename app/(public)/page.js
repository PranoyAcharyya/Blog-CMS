
import React from 'react'
import { VideoText } from "../../components/ui/video-text"
import { AuroraText } from '@/components/ui/aurora-text'
import { ToastContainer } from 'react-toastify'
// import videobg from "../../public/textbg.mp4"


const page = () => {
  return (<>
  
    <section className="relative flex flex-col container mx-auto px-4 pt-[100px] lg:h-128 lg:flex lg:items-center lg:space-x-8">
         
          <div className="relative h-[200px] md:h-[500px] w-full overflow-hidden">
  <VideoText src="/textbg2.mp4">MIND</VideoText>
</div>
<h1 className="text-4xl text-center font-bold tracking-tighter md:text-5xl lg:text-7xl text-capitalize">
      Write <AuroraText className="capitalize">Whatever In your mind</AuroraText>
    </h1>
    
        </section>
        <section className='py-20'>
        
        </section>

        
</>
         )
         
}

export default page