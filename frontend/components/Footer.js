import React from 'react'

const Footer = () => {
  return (
    <div>
        <div className='bg-gray-200 w-full'></div>
        <div className='bg-black text-gray-400 flex flex-col justify-center items-center p-7 text-sm text-center'>
          <p>© 2026 <span className='text-blue-500 font-bold font-serif'>TaskManager</span>. All rights reserved.</p>
          <p>Your productivity partner.Organize smarter. Work better</p>
          <p>Privacy Policy | Terms of Service | </p>
        </div>
    </div>
  )
}

export default Footer