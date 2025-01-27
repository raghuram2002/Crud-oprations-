import {BrowserRouter, Route, Routes} from "react-router-dom";
import Create from "./Create.jsx";

import 'bootstrap/dist/css/bootstrap.min.css'
import Update from "./Update.jsx";
import Read from "./Read.jsx";
import Home from "./Home.jsx";

let App =()=>{

  return(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={ <Home /> } />
            <Route path='/create' element={ <Create/>} />
            <Route path='/update/:id' element={ <Update/>} />
            <Route path='/read/:id' element={ <Read/> } />
        </Routes>
    </BrowserRouter>
  )
}

export default App;