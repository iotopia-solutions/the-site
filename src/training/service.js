// This is a composition plan for the service that handles requests to the
// site's training
import requireText from '../requireText'
import compile from '../template/compile'
import {coursesObj} from './courses'
import trainingView from './trainingView'
import { renderToStaticMarkup} from 'react-dom/server'

// Load these early and sync, just like module dependencies.
const requireTemplate = requireText(__dirname)
const trainingPageHtml = requireTemplate('./trainingPage.html')
const coursePageHtml = requireTemplate('./coursePage.html')

// Handles a GET request
export const training
  = () => {
    const renderTraining = compile(trainingPageHtml)
    return (req, res) =>
      res.send(renderTraining({course: transformTraining(coursesObj)}))
  }

export const course
  = () => {
    const render = compile(coursePageHtml)
    return (req, res) => {
      res.send(render(transformToViewData(req.params.id)))
    }
  }

//TO-DO: create a better way to handle this data---esp for fields where data may not exist (maybe a React element)
const transformToViewData
  = (id) => ({
    courseFullName: coursesObj[id].courseFullName,
    courseBlurb: coursesObj[id].courseBlurb,
    courseDescription: coursesObj[id].courseDescription,
    courseImg: coursesObj[id].courseImg,
    courseLevel: coursesObj[id].courseLevel,
    courseSyllabusPDF: coursesObj[id].courseSyllabusPDF,
    courseSyllabusEPub: coursesObj[id].courseSyllabusEPub,
    category: coursesObj[id].category
  })

//Render React element for training courses section
const transformTraining 
  = (coursesObj) => {
      return renderToStaticMarkup(trainingView(coursesObj))
    }
