import Navbar from "./Componets/Navbar/Navbar"
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { BrowserRouter as Router,Routes, Route, Link  } from "react-router-dom";
import AllRoutes from './Componets/AllRoutes.jsx'
import DrwableSlid from "./Componets/LeftSlidBar/DrwableSlid.jsx";
import { useState } from "react";
import CreateChannelEdit from "./Pages/Channel/CreateChannelEdit.jsx";

function App() {
  const [EditChannelBtn, setEditChannelBtn] = useState(false)
  const [ToggleDrawSlid, setToggleDrawSlid] = useState({
    display : 'none'
  })

  const toggleDraw=() => {
    if(ToggleDrawSlid.display==="none")
      {
        setToggleDrawSlid({
          display:'flex'
        })
      }
      else
      {
        setToggleDrawSlid({
          display:'none'
        })
      }
  }

  return (
    <>
     <Router>
      {
        EditChannelBtn &&
      <CreateChannelEdit setEditChannelBtn={setEditChannelBtn} />
      }
     <Navbar setEditChannelBtn={setEditChannelBtn}  toggleDraw={toggleDraw}/> 
      <DrwableSlid toggleDraw={toggleDraw} ToggleDrawSlid={ToggleDrawSlid}/>
      <AllRoutes/>
     </Router>
    </>
  )
}

export default App
