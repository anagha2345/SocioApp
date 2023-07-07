import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { setPosts } from "state"
import { useEffect, useState } from "react"
import PostWidget from "./PostWidget"

const PostsWidget=({userId,isProfile=false})=>{
    const dispatch=useDispatch()
    const posts=useSelector((state)=>state.posts)
    const token=useSelector((state)=>state.token)
   
    const getPosts=async()=>{
        const response=await fetch("http://localhost:3001/posts",{
            method:"GET",
            headers:{Authorization:`Bearer ${token}`}
        })
        const data=await response.json()
        dispatch(setPosts({posts:data}))
    }
    const getUserPosts=async()=>{
        const response=await fetch(`http://localhost:3001/posts/${userId}/posts`,{
            method:"GET",
            headers:{Authorization:`Bearer ${token}`}
        })
        const data=await response.json()
        dispatch(setPosts({posts:data}))
    }
    useEffect(()=>{
      if(isProfile){
          getUserPosts()
      }else{
        getPosts()
      }
    },[])

    return(
        <>
         
          {posts.map(
            ({
             _id,
             userId,
             firstName,
             lastName,
             description,
             location,
             picturePath,
             userPicturePath,
             comments,
             likes

          })=>(
            <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
           name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            comments={comments}
            likes={likes}
            />
          ))}
        
        </>
    )
}
export default PostsWidget