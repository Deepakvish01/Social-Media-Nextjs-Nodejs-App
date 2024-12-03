import { AuthContext } from '@/app/Context/AuthContext';
import { PostsContext } from '@/app/Context/PostsContext';
import { useSearchParams } from 'next/navigation'
import React, { useContext, useEffect, useRef, useState } from 'react'
import Comment from './Comment';

const PostDetail = () => {
  const { AuthData } = useContext(AuthContext);
  const { getPostById, addComment, deleteComment } = useContext(PostsContext);
  const [post, setPost] = useState();
  const [comment, setComment] = useState({ text: "" });
  const [commentList, setCommentList] = useState();
  const ref = useRef();
  const params = useSearchParams();

  useEffect(() => {
    fetchPost();
  }, [])

  async function fetchPost() {
    try {
      const data = await getPostById(AuthData, params.get("id"));
      setPost(data);
      setCommentList(data?.comments);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSubmit() {
    try {
      const status = await addComment(params.get("id"), AuthData, comment);
      if (status == 200) {
        ref.current.value = ""
        fetchPost();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleCommentDelete(Comment) {
    try {
      const status = await deleteComment(params.get("id"), AuthData,Comment._id)
      if (status == 200) {
        fetchPost()
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='container my-5'>
      {
        post && <div className="card shadow-lg p-5 mb-5">
          <div className="d-flex justify-content-between p-1">
            <h2 className='fw-bold'>{post?.title}</h2>
          </div>
          <img id={post?._id} className="my-2"
            src={post?.image} />
          <br />
          <p>{post?.caption}</p>
          <hr />
          <div>
            {post?.tags
              ?.map((tag) => {
                return <strong>#{tag}&nbsp;</strong>;
              })}
          </div>
          <div className='d-flex p-1 my-3'>
              <div>
                <input ref={ref} type="text" className='form-control mb-3' placeholder='Type Comment' onChange={(e) => {
                  setComment((prev) => { return { ...prev, text: e.target.value } })
                }} /> &nbsp;
                <button className='btn btn-outline-success' onClick={() => {
                  handleSubmit();
                }}>Comment</button>
              </div>
            <div className='mx-3'>
              {
                commentList?.map((ele) => {
                  return <Comment ele={ele} handleCommentDelete={handleCommentDelete} commentList={commentList} />
                })
              }
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default PostDetail