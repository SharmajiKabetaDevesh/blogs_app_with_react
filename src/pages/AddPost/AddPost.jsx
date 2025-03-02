import PostForm from "../../components/PostForm/PostForm";

import Container from "../../components/Container/Container";
import React from 'react'

const AddPost = () => {
  return (
    <div className="py-8">
        <Container>
            <PostForm/>
        </Container>
    </div>
  )
}

export default AddPost