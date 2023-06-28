import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "scenes/homePage";
import ProfilePage from "scenes/profilePage";
import LoginPage from "scenes/loginPage";
import {useMemo} from "react"
import { UseSelector, useSelector } from "react-redux/es/hooks/useSelector";
import { CssBaseline, createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { themeSetting } from "./theme";


function App() {
  const mode=useSelector((state)=>state.mode)
  const theme=useMemo(()=>createTheme(themeSetting(mode)),[mode])
  return (
    <div className="App">
     <BrowserRouter>

     <ThemeProvider theme={theme}>
      <CssBaseline/>
       <Routes>
        <Route path="/" element={<LoginPage/>}/>
        <Route path="/home" element={<HomePage/>}/>
        <Route path="/profile/:useId" element={<ProfilePage/>}/>
       </Routes>
     </ThemeProvider>
     
     </BrowserRouter>
    </div>
  );
}

export default App;
