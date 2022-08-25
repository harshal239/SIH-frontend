import React from 'react'
import IndexNavbar from 'Components/Navbars/IndexNavbar'
import AicteHeader from './AicteHeader'
import Profile from 'Components/Profile'
const AICTE_Profile = () => {
  return (
    <div className='wrapper'>
        <IndexNavbar/>
        <AicteHeader/>
        <Profile/>
    </div>
  )
}

export default AICTE_Profile