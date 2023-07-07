import {
    EditOutlined,
    DeleteOutlined,
    MoreHorizIcon,
    ImageOutlined,
    MicOutlined,
    AttachFileOutlined,
    GifBoxOutlined,
    Palette,
    MoreHorizOutlined
} from '@mui/icons-material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import WidgetWrapper from 'components/WidgetWrapper';
import FlexBetween from 'components/FlexBetween';
import UserImage from 'components/UserImage';
import { Button, Divider, InputBase, useMediaQuery, useTheme } from '@mui/material';
import Dropzone from 'react-dropzone';
import {Box ,Typography,IconButton} from '@mui/material';
import { setPosts } from 'state';

const MyPostWidget = ({picturePath})=>{
    const dispatch=useDispatch()
    const [post,setPost]=useState("")
    const [image,setImage]=useState(null)
    const [isImage,setIsImage]=useState(false)
    const {_id}=useSelector((state)=>state.user)
    const token=useSelector((state)=>state.token)
    const {palette}=useTheme()
    const medium=palette.neutral.medium
    const mediumMain=palette.neutral.mediumMain
    const isNonMobileScreens=useMediaQuery("(min-width:1000px)")

    const handlePost=async ()=>{
        const formData=new FormData();
        formData.append("userId",_id)
        console.log("id",_id);
        console.log("description",post);
        formData.append("description",post)
        if(image){
            formData.append("picture",image);
            formData.append("picturePath",image.name)

        }
       
        const response=await fetch(`http://localhost:3001/posts`,{
            method:"POST",
            headers:{Authorization:`Bearer ${token}`},
            body:formData
        })
        console.log(response,"response");
        const posts=await response.json()
        console.log("posts",posts);
        dispatch(setPosts({posts}))
        setImage(null)
        setPost("")
    }
    return(
        <WidgetWrapper>
            <FlexBetween gap="1.5rem">
               <UserImage image={picturePath}/>
               <InputBase
               placeholder="what's on your mind"
               onChange={(e)=>setPost(e.target.value)}
               value={post}
               sx={{
                width:"100%",
                borderRadius:"2rem",
                backgroundColor:palette.neutral.light,
                padding:"1rem 2rem"
               }}
               />
            </FlexBetween>
            {isImage && (
                <Box
                    border={`1px solid ${medium}`}
                    borderRadius="5px"
                     mt="1rem"
                     p="1rem"
                >
                    <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles)=>
                        setImage(acceptedFiles[0])
                    }
                    >
                    {({ getRootProps,getInputProps})=>(
                       <FlexBetween>
                       <Box
                        {...getRootProps()}
                        border={`2px dashed ${palette.primary.main}`}
                        p="1rem"
                        width="100%"
                        sx={{
                            "&:hover":{cursor:"pointer"}
                        }}
                        >
                        <input {...getInputProps()}/>
                        {!image ?(
                            <p>Add photo here</p>
                        ):(
                            <FlexBetween>
                                <Typography>{image.name}</Typography>
                                <EditOutlined></EditOutlined>
                            </FlexBetween>
                        )}
                        </Box>
                        {image && (
                            <IconButton
                             onClick={()=>setImage(null)}
                             sx={{width:"15%"}}
                             >
                                <DeleteOutlined/>
                            </IconButton>
                        )

                        }
                        </FlexBetween>
                    )}
                    </Dropzone>
                </Box>
            )

            }
            <Divider
            sx={{margin:"1.25rem 0"}}
            />
            <FlexBetween>
                <FlexBetween gap="0.25rem" onClick={()=>setIsImage(!isImage)}>
                    <ImageOutlined sx={{color:mediumMain}}/>
                    <Typography
                    color={mediumMain}
                     sx={{"&:hover":{cursor:'pointer',color:medium}}}
                    >image</Typography>
                </FlexBetween>
                {isNonMobileScreens ? (
                <>
                   <FlexBetween gap="0.25rem">
                     <GifBoxOutlined sx={{color:mediumMain}}/>
                     <Typography color={mediumMain}>clip</Typography>
                   </FlexBetween>
                   <FlexBetween gap="0.25rem">
                     <AttachFileOutlined sx={{color:mediumMain}}/>
                     <Typography color={mediumMain}>clip</Typography>
                   </FlexBetween>
                   <FlexBetween gap="0.25rem">
                     <MicOutlined sx={{color:mediumMain}}/>
                     <Typography color={mediumMain}>clip</Typography>
                   </FlexBetween>
                   
                </>
                ):(<FlexBetween gap="0.25rem">
                    <MoreHorizOutlined sx={{color:mediumMain}}/>
                </FlexBetween>) }
                <Button
                  onClick={handlePost}
                  disabled={!post}
                  sx={{
                    backgroundColor:palette.primary.main,
                    color:palette.primary.alt,
                    borderRadius:"3rem"
                  }}
                  >
                        Post
                </Button>
            </FlexBetween>

            
        </WidgetWrapper>
    )
}
export default MyPostWidget