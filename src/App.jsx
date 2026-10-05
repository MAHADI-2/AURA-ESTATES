import  {Route, Routes} from "react-router-dom";
import Home from "./page/Home.jsx";

const App = () => {
  return (
    <Routes>
      
       <Route path="/" element={<Home />} />
        
    </Routes>
     
   
  );
};

export default App;