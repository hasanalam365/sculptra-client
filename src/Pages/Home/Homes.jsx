import React from 'react'
import Banner from './Banner'
import About from '../About/About'
import WhyUs from './WhyUs'
import StudentReview from '../StudentReview/StudentReview'
import Form from '../Form/Form'
import CourseDetails from '../../Components/CourseDetails'
import Video from '../Video/Video'

const Homes = () => {
  return (
    <div>
        <Banner/>
        <About/>
        <CourseDetails/>
        <Video/>
        <WhyUs/>
        <StudentReview/>
        <Form/>
    </div>
  )
}

export default Homes