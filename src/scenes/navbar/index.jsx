import { useState } from "react"
import { Box,
   IconButton,
   Typography,
   Select,
   MenuItem,
   InputBase,
   useTheme,
   FormControl,
   useMediaQuery
} from "@mui/material";
import {
   Search,
   Message,
   DarkMode,
   LightMode,
   Notifications,
   Help,
   Menu,
   Close
} from "@mui/icons-material"
import { useDispatch,useSelector } from "react-redux";
import { setMode,setLogout } from "state";
import flexBetween from "components/flexBetween";
import { useNavigate } from "react-router-dom";

const Navbar=()=>{
   const[isMobileMenuToggled,setIsMobileMenuToggled]=useState(false);
   const dispatch=useDispatch;
   const navigate=useNavigate()
   const isNonMobileScreens=useMediaQuery("(min-width:1000px)")
   const user=useSelector((state)=>state.user)
   const theme=useTheme();
   const neutralLight=theme.palette.neutral.light;
   const dark=theme.palette.neutral.dark;
   const background=theme.palette.background.default;
   const primaryLight=theme.palette.primary.light;
   const alt=theme.palette.background.alt;

   const fullName=`${user.firstName} ${user.lastName}`;

   return( 
   <flexBetween padding="1rem 6%" backgroundColor={alt}>
      <flexBetween gap="1.7rem">
         <Typography
          fontWeight="bold"
          fontSize="clamp(1rem,2rem,2.25rem)"
          color="primary"
          onClick={()=>navigate("/home")}
          sx={{
           "&:hover":{
            color:primaryLight,
            cursor:"pointer"
           },
          }}
          >
            Sociopedia
         </Typography>
         {isNonMobileScreens && (
            <flexBetween backgroundColor={neutralLight} borderRadius="9px" gap="3rem" padding="0.1rem 1.5rem">
               <inputBase placeholder="Search..."></inputBase>
               <IconButton>
                  <Search/>
               </IconButton>
            </flexBetween>
         

         // Desktop nav
         
         )}
      </flexBetween>
   </flexBetween>
   )
}
export default Navbar