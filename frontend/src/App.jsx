import NavBar from "./Navbar";

import { Outlet } from "react-router-dom";
import ThemeContext from "./assets/ThemeContext";
import appStore from "./assets/appStore";
import {Provider} from "react-redux"

const App = () => {
  return (
    <div>
      <Provider store={appStore}> 
     <ThemeContext>
      <NavBar></NavBar>
      <Outlet></Outlet>
      </ThemeContext>
      </Provider> 
    </div>
  );
};

export default App;
