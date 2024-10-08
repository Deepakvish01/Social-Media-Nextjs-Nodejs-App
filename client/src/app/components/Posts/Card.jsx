import { AuthContext } from '@/app/Context/AuthContext';
import { PostsContext } from '@/app/Context/PostsContext';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react'

const CardModel = ({ setShowCard, handleDelete }) => {
  return (
    <div className='card p-3 shadow bg-danger-subtle'>
      <div className='d-flex justify-content-center fs-3'>😫</div>
      Do You Want to Delete Post ?
      <br />
      <br />
      <button className='btn btn-danger my-2' onClick={() => {
        handleDelete();
      }}> ! Delete </button>
      <button className='btn btn-info' onClick={() => {
        setShowCard(prev => !prev)
      }}>Cancel</button>
    </div>
  )
}

export const Card = ({ post, setMode, setPostToBeEdited, fetchPosts }) => {
  const { AuthData } = useContext(AuthContext);
  const { deletePost, likePost, removeLike } = useContext(PostsContext);
  const [showCard, setShowCard] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    try {
      await deletePost(post._id, AuthData);
      await fetchPosts();
      // setShowCard(prev => !prev);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleLikes() {
    try {
      await likePost(post._id, AuthData);
      await fetchPosts();
    } catch (error) {
      console.log(error);
    }
  }

  async function handleRemoveLike(){
    try {
      await removeLike(post._id,AuthData);
      await fetchPosts()
    } catch (error) {
      console.log(error);
    }
  }

  async function postDetailRedirect() {
    try {
      router.push(`/Posts/PostDetail/?id=${post._id}`)
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div className="card shadow-lg p-5 mb-5">
      <div className="d-flex justify-content-between p-1">
        <h2 className='fw-bold'>{post.title}</h2>
        <div>
          {
            AuthData?.userId === post.creator
              ?
              <>
                <svg xmlns="http://www.w3.org/2000/svg"
                  style={{ margin: "0px 5px" }}
                  id={post._id}
                  width="26"
                  height="26"
                  fill="green"
                  class="bi bi-pencil-square" viewBox="0 0 16 16" onClick={() => {
                    setPostToBeEdited(post._id)
                    setMode("edit")
                  }}>
                  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                </svg>
                &nbsp;
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="26"
                  fill="red"
                  className="bi bi-trash3-fill"
                  viewBox="0 0 16 16"
                  id={post._id}
                  onClick={() => {
                    setShowCard(prev => !prev)
                  }}>
                  <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                </svg>
              </>
              : ""
          }
        </div>
      </div>
      <img id={post._id} className="my-2"
        src={post.image} onClick={() => {
          postDetailRedirect();
        }} />
      <br />
      <p>{post.caption}</p>
      <div style={{ cursor: "pointer", width: "50px" }}>
        {post.likes.find((post) => {
          if (post === AuthData.userId) {
            return true;
          }
        })
          ?
          <>
            <svg xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="red"
              className="bi bi-heart-fill"
              viewBox="0 0 16 16"
              onClick={()=>{
                handleRemoveLike();
              }}>
              <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
            </svg> &nbsp; {post.likes.length}
          </>
          :
          <>
            <svg xmlns="http://www.w3.org/2000/svg"
              id={post._id}
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-heart"
              viewBox="0 0 16 16"
              onClick={() => {
                handleLikes();
              }}>
              <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
            </svg> &nbsp; {post.likes.length}
          </>
        }
      </div>
      <hr />
      <div>
        {post.tags
          .map((tag) => {
            return <strong> # {tag}&nbsp;</strong>;
          })}
      </div>
      {
        showCard && (
          <div className='p-2' style={{ position: "absolute", right: "40px", top: "102px" }} >
            <CardModel setShowCard={setShowCard} handleDelete={handleDelete} />
          </div>
        )
      }
    </div>
  )
}