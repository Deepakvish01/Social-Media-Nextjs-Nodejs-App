"use client"
import { API } from "@/Utils/constants";
import { createContext, useReducer } from "react"

const Profile = {
  receivedRequests: [],
  sendRequests: [],
  tribe: [],
  friends:[]
}

async function sendFriendRequest(id, AuthData) {
  try {
    API.interceptors.request.use((req) => {
      req.headers.authorization = `bearer ${AuthData.token}`;
      return req;
    });
    const response = await API.put(`/user/sendFriendRequest/${id}`);
    return response?.status;
  } catch (error) {
    console.log(error);
  }
}

async function acceptFriendRequest(id, AuthData) {
  try {
    API.interceptors.request.use((req) => {
      req.headers.authorization = `bearer ${AuthData.token}`;
      return req;
    });
    const response = await API.put(`/user/acceptFriendRequest/${id}`);
    return response?.status
  } catch (error) {
    console.log(error);
  }
}

async function fetchAllUsers(AuthData) {
  try {
    API.interceptors.request.use((req) => {
      req.headers.authorization = `bearer ${AuthData.token}`;
      return req;
    });
    const response = await API.get("/user/getAllUsers");
    return response?.data?.users
  } catch (error) {
    console.log(error);
  }
}

async function getAllReceivedRequest(AuthData) {
  try {
    API.interceptors.request.use((req) => {
      req.headers.authorization = `bearer ${AuthData.token}`;
      return req;
    });
    const response = await API.get("/user/getAllReceivedRequest");
    return response?.data?.requestsReceived;
  } catch (error) {
    console.log(error);
  }
}

async function getUserById(AuthData) {
  try {
    API.interceptors.request.use((req) => {
      req.headers.authorization = `bearer ${AuthData.token}`;
      return req;
    });
    const data = await API.get(`/user/getUserById/${AuthData?.userId}`)
    return data?.data?.user
  } catch (error) {
    console.log(error);
  }
}

async function updateUserById(AuthData,body){
  try {
    API.interceptors.request.use((req) => {
      req.headers.authorization = `bearer ${AuthData.token}`;
      return req;
    });
    const response = await API.put(`/user/updateUserById/${AuthData.userId}`,body);
    return response?.status
  } catch (error) {
    console.log(error);
  }
}

async function getAllFriends(AuthData){
  try {
    API.interceptors.request.use((req) => {
      req.headers.authorization = `bearer ${AuthData.token}`;
      return req;
    });
    const response = await API.get("/user/getAllFriends");
    return response?.data?.friends
  } catch (error) {
    console.log(error);
  }
}

async function removeRequest(AuthData,id){
  try {
    API.interceptors.request.use((req) => {
      req.headers.authorization = `bearer ${AuthData.token}`;
      return req;
    });
    const response = await API.put(`/user/removeRequest/${id}`);
    return response?.status
  } catch (error) {
    console.log(error);
  }
}

async function deleteFriend(AuthData,id){
  try {
    API.interceptors.request.use((req) => {
      req.headers.authorization = `bearer ${AuthData.token}`;
      return req;
    });
    const response = await API.put(`/user/deleteFriend/${id}`);
    return response?.status;
  } catch (error) {
    console.log(error);
  }
}

async function removeDP(AuthData){
  try {
    API.interceptors.request.use((req) => {
      req.headers.authorization = `bearer ${AuthData.token}`;
      return req;
    });
    const response = await API.put(`/user/removeDP/${AuthData?.userId}`);
    return response?.status
  } catch (error) {
    console.log(error);
  }
}

export const ProfileContext = createContext();

function reducer(state, action) {
  try {
    switch (action.type) {
      case "GET_RECEIVED_REQUESTS":
        const newState = { ...state, receivedRequests: action.payload };
        return newState;
      case "GET_ALL_FRIENDS":
        const newState1 = { ...state, friends: action.payload };
        return newState1;
      default:
    }
  } catch (error) {
    console.log(error);
  }
}

export const ProfileProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, Profile)
  return (
    <ProfileContext.Provider value={{
      Profile: state,
      dispatch,
      sendFriendRequest,
      acceptFriendRequest,
      fetchAllUsers,
      getAllReceivedRequest,
      getUserById,
      getAllFriends,
      removeRequest,
      deleteFriend,
      updateUserById,
      removeDP
    }}>
      {children}
    </ProfileContext.Provider>
  )
}