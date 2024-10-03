import { AuthContext } from '@/app/Context/AuthContext';
import { PostsContext } from '@/app/Context/PostsContext';
import { useSearchParams } from 'next/navigation'
import React, { useContext, useEffect, useRef, useState } from 'react'
import moment from 'moment';

const PostDetail = () => {
  const { AuthData } = useContext(AuthContext);
  const { getPostById, addComment } = useContext(PostsContext);
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
      console.log(status);

      if (status == 200) {
        ref.current.value = ""
        fetchPost();
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
            <h4>{post?.title}</h4>
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
            <form method='post'>
              <div>
                <input ref={ref} type="text" className='form-control mb-3' placeholder='Type Comment' onChange={(e) => {
                  setComment((prev) => { return { ...prev, text: e.target.value } })
                }} /> &nbsp;
                <button className='btn btn-outline-success' onClick={() => {
                  handleSubmit();
                }}>Comment</button>
              </div>
            </form>
            <div className='mx-5'>
              {
                commentList?.map((ele) => {
                  return (
                    <div className='card p-2 my-2'>
                      <div className='fw-bold mb-1 lead ml-2' style={{ fontSize: "13px" }}> {ele?.firstname} {ele?.lastname} </div>
                      {ele?.text}
                    </div>
                  )
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