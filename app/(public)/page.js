
import React from 'react'
import Image from 'next/image'
import { VideoText } from "../../components/ui/video-text"


const page = () => {
  return (
    <section className="container mx-auto px-4 pt-[100px] lg:h-128 lg:flex lg:items-center lg:space-x-8">
    
          <div className="relative h-[500px] w-full overflow-hidden">
  <VideoText src="https://cdn.magicui.design/ocean-small.webm">MIND</VideoText>
</div>
    
        </section>
  )
}

export default page