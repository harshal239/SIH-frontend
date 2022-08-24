import React from 'react'
import CoorporateHeader from './CoorporateHeader'
import IndexNavbar from 'Components/Navbars/IndexNavbar'
import Profile from 'Components/Profile'
const CoorporateProfile = () => {
  return (
    <div className="wrapper">
        
        <IndexNavbar isfixed={false}/>
        <CoorporateHeader/>
        <Profile/>
    </div>
  )
}

export default CoorporateProfile
