import { createContext, useState } from "react";
import React from "react";

export const ThemeData = createContext(null);

const ThemeContext = ({ children }) => {
  let prevousTheme = localStorage.getItem("Theme");
  let [theme, setTheme] = useState(prevousTheme==undefined?"light":prevousTheme);

  return (
   
    <div>
      <ThemeData.Provider value={{ theme, setTheme }}>
        {children}
      </ThemeData.Provider>
    </div>
  );
};

export default ThemeContext;


// <ThemeData children={prop}> 
   // children (they are also prop )
//</ThemeData>
