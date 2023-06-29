import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "scenes/homePage";
import ProfilePage from "scenes/profilePage";
import LoginPage from "scenes/loginPage";
import {useMemo} from "react"
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
// import { ThemeProvider } from "@emotion/react";
import { themeSettings } from "./theme";
import { createTheme }from "@mui/material/styles";

function App() {
  const mode=useSelector((state)=>state.mode)
  const theme=useMemo(()=>createTheme(themeSettings(mode)),[mode])
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
