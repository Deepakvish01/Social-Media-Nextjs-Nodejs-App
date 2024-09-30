import React from 'react'

export const Form = ({ formData, setFormData, handleSubmit, ref, edit }) => {
  return (
    <>
      {
        edit == false ? (
          <div className="wrapper">
            <form ref={ref} >
              <div className="form-outline">
                <label className="form-label" for="">Add Title :</label>
                <input type="text" id="title" className="form-control" onChange={(e) => {
                  setFormData((prev) => { return { ...prev, title: e.target.value } })
                }} />
              </div>
              <div className="form-outline">
                <label className="form-label" for="">Add Caption :</label>
                <input type="text" id="caption" className="form-control" onChange={(e) => {
                  setFormData((prev) => { return { ...prev, caption: e.target.value } })
                }} />
              </div>
              <div className="form-outline">
                <label className="form-label" for="">Add Profile Image :</label>
                <input type="file" id="image" className="form-control"
                  onChange={(e) => {
                    const image = e.target.files[0]
                    const reader = new FileReader();
                    reader.readAsDataURL(image);
                    reader.addEventListener("load", (e) => {
                      setFormData((prev) => { return { ...prev, image: e.target.result } })
                    })
                  }} />
              </div>
              <div className="form-outline">
                <label className="form-label" for="">Add Tags :</label>
                <input type="text" id="tags" className="form-control" onChange={(e) => {
                  setFormData((prev) => { return { ...prev, tags: e.target.value.split(",") } })
                }} />
              </div>
              <img className='mt-3' src={formData.image} alt="Upload An Image"
                style={{ height: "50%", width: "100%", borderRadius: "10px" }} />
            </form>
            <button className="btn btn-primary mt-3" id="submitBtn" onClick={() => { handleSubmit(); }}> Submit </button>
          </div>
        )
          :
          <>
            <div class="wrapper">
              <form ref={ref}>
                <div className="form-outline">
                  <label className="form-label" for="">Add Title :</label>
                  <input type="text" id="title" value={formData.title} className="form-control" onChange={(e) => {
                    setFormData((prev) => { return { ...prev, title: e.target.value } })
                  }} />
                </div>
                <div className="form-outline mt-2">
                  <label className="form-label" for="">Add Caption :</label>
                  <input type="text" id="caption" value={formData.caption} className="form-control" onChange={(e) => {
                    setFormData((prev) => { return { ...prev, caption: e.target.value } })
                  }} />
                </div>
                <div className="form-outline mt-2">
                  <label className="form-label" for="">Add Profile Image :</label>
                  <input type="file" id="image" className="form-control"
                    onChange={(e) => {
                      const image = e.target.files[0]
                      const reader = new FileReader();
                      reader.readAsDataURL(image);
                      reader.addEventListener("load", (e) => {
                        setFormData((prev) => { return { ...prev, image: e.target.result } })
                      })
                    }}
                  />
                </div>
                <div className="form-outline">
                  <label className="form-label mt-2" for="">Add Tags :</label>
                  <input type="text" id="tags" value={formData.tags} className="form-control" onChange={(e) => {
                    setFormData((prev) => { return { ...prev, tags: e.target.value.split(",") } })
                  }} />
                </div>
                <img className='mt-3' src={formData.image} alt="Upload An Image"
                  style={{ height: "50%", width: "100%", borderRadius: "10px" }} />
              </form>
              <button className="btn btn-primary mt-3" id="submitBtn" onClick={() => { handleSubmit() }}> Submit </button>
            </div>
          </>
      }
    </>
  )
}
