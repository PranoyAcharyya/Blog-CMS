import React from 'react'
import Image from 'next/image'
const page = () => {
  return (
    <section className="container mx-auto px-4 pt-[100px] lg:h-128 lg:flex lg:items-center lg:space-x-8">
    
          {/* Left Content */}
          <div className="w-full text-center lg:text-left lg:w-1/2 lg:-mt-8">
    
            <h1 className="text-3xl md:text-4xl leading-snug text-gray-800 dark:text-gray-200">
              A <span className="font-semibold">free repository</span> for community
              <br className="hidden lg:block" />
              components using{" "}
              <span className="font-semibold underline decoration-primary">
                Tailwind CSS
              </span>
            </h1>
    
            <p className="mt-4 text-lg text-gray-500 dark:text-gray-300">
              Open source Tailwind UI components and templates to
              <br className="hidden lg:block" />
              bootstrap your new apps, projects or landing sites!
            </p>
    
            
           
          </div>
    
          {/* Right Image */}
          <div className="w-full mt-4 lg:mt-0 lg:w-1/2">
            <Image
      src="https://www.creative-tim.com/twcomponents/svg/website-designer-bro-purple.svg"
      width={500}
      height={500}
      alt="tailwind css components"
      className="mx-auto"
    />
    
          </div>
    
        </section>
  )
}

export default page