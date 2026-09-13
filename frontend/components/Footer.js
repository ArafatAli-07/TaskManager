import React from 'react'

const Footer = () => {
  return (
    <footer className="w-full">
      
      <div className=" bg-gray-200 w-full"></div>


      <div className="bg-black text-gray-400 px-4 pt-8 sm:px-6 md:px-8 text-center">
        <div className="max-w-6xl mx-auto flex flex-col items-center gap-2">
          
          <p className="text-xs sm:text-sm">
            © 2026{" "}
            <span className="text-blue-500 font-bold font-serif">
              TaskManager
            </span>
            . All rights reserved.
          </p>

          <p className="text-xs sm:text-sm">
            Your productivity partner. Organize smarter. Work better.
          </p>

          <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-1 text-xs sm:text-sm mt-2">
            <a href="#" className="hover:text-blue-500 transition-colors">
              Privacy Policy
            </a>

            <span className="text-gray-600">|</span>

            <a href="#" className="hover:text-blue-500 transition-colors">
              Terms of Service
            </a>
          </div>

        </div>
      </div>
    </footer>
  )
}

export default Footer
