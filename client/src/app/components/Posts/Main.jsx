import React, { useState } from 'react'
import {EditPost} from './EditPost';
import { Lists } from './Lists';

const Main = () => {
  const [mode, setMode] = useState("view");
  const [postToBeEdited, setPostToBeEdited] = useState("");
  return (
    <div>
      {
        mode == "view" ? <Lists setMode={setMode} setPostToBeEdited={setPostToBeEdited} />
          : <EditPost postToBeEdited={postToBeEdited} setMode={setMode} />
      }
    </div>
  )
}

export default Main