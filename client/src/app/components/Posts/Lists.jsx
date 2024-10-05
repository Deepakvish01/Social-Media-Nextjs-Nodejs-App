import React, { useContext, useEffect, useRef } from "react";
import { PostsContext } from "@/app/Context/PostsContext";
import { AuthContext } from "@/app/Context/AuthContext";
import { Card } from "./Card";
import { useRouter } from "next/navigation";

export const Lists = ({ setMode, setPostToBeEdited }) => {
  const { getPosts, Posts, dispatch } = useContext(PostsContext);
  const { AuthData } = useContext(AuthContext);
  const router = useRouter();
  const ref = useRef()

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    try {
      const posts = await getPosts(AuthData);
      dispatch({
        type: "GET_POSTS",
        payload: posts
      });
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <div className="container my-5 pt-5">
      {
        Posts?.map((post) => {
          
          return <Card setMode={setMode} post={post} setPostToBeEdited={setPostToBeEdited} fetchPosts={fetchPosts} />
        })
      }
    </div>
  )
}