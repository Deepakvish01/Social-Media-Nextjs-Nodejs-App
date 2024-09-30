import React, { useContext, useEffect, useRef, useState } from 'react'
import { Form } from './Form'
import { PostsContext } from '@/app/Context/PostsContext';
import { AuthContext } from '@/app/Context/AuthContext';

export const EditPost = ({ postToBeEdited, setMode }) => {
  // console.log(postToBeEdited);
  const { getPostById, updatePost } = useContext(PostsContext);
  const { AuthData } = useContext(AuthContext);
  const ref = useRef();
  const [formData, setFormData] = useState(
    { title: "", caption: "", image: "", tags: [] }
  );
  useEffect(() => {
    fetchPostById();
  }, [])

  async function fetchPostById() {
    try {
      const result = await getPostById(AuthData, postToBeEdited);
      setFormData({...result,tags:result.tags.join(",")});
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSubmit() {
    try {
      const result = await updatePost(postToBeEdited, AuthData, formData);
      setMode("view");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div> <Form formData={formData} setFormData={setFormData} ref={ref} handleSubmit={handleSubmit} edit={true} /> </div>
  )
}
