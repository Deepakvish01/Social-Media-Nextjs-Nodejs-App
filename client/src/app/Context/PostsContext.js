"use client";
import { API } from "@/Utils/constants";
import { createContext, useReducer } from "react";

let Posts = [];

export const PostsContext = createContext();

async function getPosts(AuthData) {
  try {
    API.interceptors.request.use((req) => {
      req.headers.authorization = `bearer ${AuthData.token}`;
      return req;
    });
    const data = await API.get("/posts/getPosts");
    return data?.data?.posts
  } catch (error) {
    console.log(error);
  }
}

async function getPostById(AuthData, id) {
  try {
    API.interceptors.request.use((req) => {
      req.headers.authorization = `bearer ${AuthData.token}`;
      return req;
    });
    const data = await API.get(`/posts/getPostById/${id}`);
    return data?.data?.post;
  } catch (error) {
    console.log(error);
  }
}

async function createPost(body, AuthData) {
  try {
    API.interceptors.request.use((req) => {
      req.headers.authorization = `bearer ${AuthData.token}`;
      return req;
    });
    const data = await API.post("/posts/createPost", body);
    return data?.data;
  } catch (error) {
    console.log(error);
  }
}

async function likePost(id, AuthData) {
  try {
    API.interceptors.request.use((req) => {
      req.headers.authorization = `bearer ${AuthData.token}`;
      return req;
    });
    const response = await API.put(`/posts/likePost/${id}`);
    return response.status;
  } catch (error) {
    console.log(error);
  }
}

async function updatePost(id, AuthData, body) {
  try {
    API.interceptors.request.use((req) => {
      req.headers.authorization = `bearer ${AuthData.token}`;
      return req;
    });
    const data = await API.put(`/posts/updatePost/${id}`, body);
    return data?.status;
  } catch (error) {
    console.log(error);
  }
}

async function deletePost(id, AuthData) {
  try {
    API.interceptors.request.use((req) => {
      req.headers.authorization = `bearer ${AuthData.token}`;
      return req;
    });
    const response = await API.delete(`/posts/deletePost/${id}`);
    return response?.status;
  } catch (error) {
    console.log(error);
  }
}

async function addComment(id, AuthData, body) {
  try {
    API.interceptors.request.use((req) => {
      req.headers.authorization = `bearer ${AuthData.token}`;
      return req;
    });
    const response = await API.put(`/posts/addComment/${id}`, body);
    // console.log(response);
    return response?.status;
  } catch (error) {
    console.log(error);
  }
}

function reducer(state, action) {
  try {

    switch (action.type) {
      case "GET_POSTS":
        return action.payload;
      default:
        return state;
    }
  } catch (error) {
    console.log(error);
  }
}

export const PostsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, Posts);
  return (
    <PostsContext.Provider
      value={{
        Posts: state,
        dispatch,
        getPosts,
        createPost,
        updatePost,
        deletePost,
        getPostById,
        likePost,
        addComment
      }}>
      {children}
    </PostsContext.Provider>
  );
};