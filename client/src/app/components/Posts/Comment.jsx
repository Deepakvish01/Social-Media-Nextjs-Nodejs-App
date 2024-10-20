import React, { useState } from 'react'

const Comment = ({ ele, handleCommentDelete, AuthData,post }) => {
  const [showCard, setShowCard] = useState(false);

  const CardModel = ({ setShowCard, handleCommentDelete }) => {
    return (
      <div className='card p-2 shadow' style={{ width: "100px" }}>
        <div className=''></div>
        <button className='btn btn-danger my-2' onClick={() => {
          handleCommentDelete(ele);
        }}> Delete </button>
        <button className='btn btn-info' onClick={() => {
          setShowCard(prev => !prev)
        }}>Cancel</button>
      </div>
    )
  }

  return (
    <div className='card p-2 mb-3'>
      <div className='d-flex justify-content-between fw-bold mb-1 lead ml-2' style={{ fontSize: "13px" }}> {ele?.creator}
        {
          AuthData?.userId === post?.creator
            ?
            <svg xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-three-dots-vertical"
              viewBox="0 0 16 16"
              id={`${ele?._id}`}
              onClick={() => {
                setShowCard(prev => !prev)
              }}>
              <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
            </svg>:""
        }
      </div>
      {ele?.text}
      {
        showCard && (
          <div className='' style={{ position: "absolute", left: "101%", bottom: "1px", top: "1px" }} >
            <CardModel setShowCard={setShowCard} handleCommentDelete={handleCommentDelete} />
          </div>
        )
      }
    </div>
  )
}

export default Comment