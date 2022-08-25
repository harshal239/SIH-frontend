import React from 'react'
import CoorporateHeader from './CoorporateHeader'
import IndexNavbar from 'Components/Navbars/IndexNavbar'
import AicteProfile from 'Components/AICTE Profile/AicteProfile'
// import Profile from 'Components/Profile'
const CoorporateProfile = () => {
  return (
    <div className="wrapper">
        
        <IndexNavbar isfixed={false}/>
        <CoorporateHeader/>
        <AicteProfile/>
        {/* <Profile/> */}
    </div>
  )
}

export default CoorporateProfile
