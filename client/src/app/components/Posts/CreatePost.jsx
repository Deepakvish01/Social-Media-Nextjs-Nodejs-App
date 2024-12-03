import React, { useContext, useRef, useState } from 'react'
import { Form } from './Form';
import { AuthContext } from '@/app/Context/AuthContext';
import { PostsContext } from '@/app/Context/PostsContext';
import { useRouter } from 'next/navigation';

export const CreatePost = () => {
  const { createPost } = useContext(PostsContext);
  const { AuthData } = useContext(AuthContext);
  const router = useRouter();
  const ref = useRef();
  const [formData, setFormData] = useState({
    title: "",
    caption: "",
    image: "",
    tags: []
  });

  async function handleSubmit() {
    try {
      const result = await createPost(formData, AuthData);
      router.push("/Posts")
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <Form formData={formData} setFormData={setFormData} handleSubmit={handleSubmit} ref={ref} edit={false} />
    </>
  )
}
