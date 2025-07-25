import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import UserProfileCard from './pr-1/UserProfileCard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="card-container">
      <UserProfileCard
        name="Harry Potter"
        email="harry@example.com"
        profilePicture="https://img.buzzfeed.com/buzzfeed-static/static/2015-04/13/17/enhanced/webdr13/original-grid-image-27652-1428961640-16.jpg"
        phone="+91-9876543210"
        address="Rajkot, Gujarat"
        skills="React, JavaScript, CSS"
        bio="A wizard with a knack for web development."
      />

      <UserProfileCard
        name="John Doe"
        email="eVc4o@example.com"        
        profilePicture="https://www.looper.com/img/gallery/the-marvel-movie-jensen-ackles-almost-starred-in-its-not-captain-america/l-intro-1692884421.jpg"
        phone="+91-9876543210"
        address="Delhi, Gujarat"
        skills="Python, Django, JavaScript"    
        bio="A software engineer with a passion for coding."   
      />

      <UserProfileCard 
        name="Jane Smith"
        email="1Pw0u@example.com"        
        profilePicture="https://i.pinimg.com/736x/75/0a/53/750a5361541dbcb2f202ecaecff67b77.jpg"
        phone="+91-9876543210"
        address="Jaipur, Gujarat"
        skills="Java, Spring Boot, MySQL"
        bio="A backend developer who loves building scalable applications."
      />

      <UserProfileCard 
        name="Alice Johnson"
        email="6bNlI@example.com"        
        profilePicture="https://i.pinimg.com/736x/63/17/50/63175079f7f196f3cab4ea1189adb587.jpg"
        phone="+91-9876543210"
        address="Brisbene, Australia"
        skills="HTML, CSS, JavaScript"
        bio="A frontend developer with a flair for design."
      />

      <UserProfileCard 
        name="Kevin Jones"
        email="7bNlI@example.com"        
        profilePicture="https://i.pinimg.com/originals/40/e6/e2/40e6e2f13b332ce8779ede0514dfff3e.jpg"
        phone="+91-99876543210"
        address="Ahmedabad, Gujarat"
        skills="Node.js, Express, MongoDB"
        bio="A full-stack developer who enjoys building web applications."
      />

      <UserProfileCard 
        name="David Brown"
        email="10bNlI@example.com"        
        profilePicture="https://img.wattpad.com/4ef48e71fa259449dc116a4f47a483ceffd09456/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f6242625f485145434756653244773d3d2d313135313031363432392e313662363365646463656166623366363139383134323733383033352e6a7067?s=fit&w=720&h=720"
        phone="+91-91234567890"
        address="Mumbai, Gujarat"
        skills="TypeScript, Angular, RxJS"
        bio="A software architect with expertise in TypeScript and Angular."
      />
    </div>
  )
}

export default App
