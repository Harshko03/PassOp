import { useState } from 'react'
import Navbar from './component/Navbar'
import Manager from './component/Manager'
import Footer from './component/Footer'
function App() {
  

  return (
    <>
     <Navbar />
     <div className="bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]">
    <Manager/>
    </div>
    <Footer/>
    </>
  )
}

export default App
