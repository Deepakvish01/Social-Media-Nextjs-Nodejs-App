import { AuthContext } from '@/app/Context/AuthContext'
import { useRouter } from 'next/navigation';
import React, { useContext, useRef, useState } from 'react';

export const Signup = ({ setMode }) => {
  const { signup, dispatch } = useContext(AuthContext);
  const ref = useRef(null)
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    password: "",
    age: "",
    email: "",
    phone: "",
    gender: "",
    confirmPassword: "",
    profilePicture: ""
  });

  async function handleSubmit() {
    try {
      if (formData.firstname == "" || formData.lastname == "" || formData.age == "" || formData.phone == "" ||
        formData.gender == "" || formData.email == "" ) {
        alert("FILL OUT THE FIELDS !")
      }
      if (formData.password != formData.confirmPassword ) {
        alert("Match Your Password with Confirm Password !");
      } else {
        delete formData.confirmPassword;
        let data = await signup(formData)
        dispatch({
          type: "SIGNUP",
          payload: data
        })
        ref.current.reset();
        router.push("/Posts")
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <section class="h-100">
      <div class="container py-3 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col">
            <div class="card card-registration my-4">
              <div class="row g-0">
                <div class="col-xl-6 d-none d-xl-block">
                  <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img4.webp"
                    alt="Sample photo" class="img-fluid"
                    style={{ borderTopLeftRadius: ".25rem border-bottom-left-radius: .25rem" }} />
                </div>
                <div class="col-xl-6">
                  <div class="card-body p-md-5 text-black">
                    <h3 class="mb-5 text-uppercase fw-bold fs-1 text-center"> SignUp Form </h3>
                    <form ref={ref} >
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <div className="form-outline">
                            <label className="form-label" for="firstname">First Name</label>
                            <input type="text" id="firstname" className="form-control form-control-lg" onChange={(e) => {
                              setFormData((prev) => { return { ...prev, firstname: e.target.value } })
                            }} />
                          </div>
                        </div>
                        <div className="col-md-6 mb-3">
                          <div className="form-outline">
                            <label className="form-label" for="lastname">Last Name</label>
                            <input type="text" id="lastname" className="form-control form-control-lg" onChange={(e) => {
                              setFormData((prev) => { return { ...prev, lastname: e.target.value } })
                            }} />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6 mb-3 d-flex align-items-center">
                          <div className="form-outline datepicker w-100">
                            <label for="birthdayDate" className="form-label">Birthday</label>
                            <input type="date" className="form-control form-control-lg " onChange={(e) => {
                              let age = ""
                              const date = new Date(e.target.value)
                              const today = new Date();
                              if (today.getDate() > date.getDate()) {
                                if (today.getMonth() >= date.getMonth()) {
                                  age = today.getFullYear() - date.getFullYear();
                                } else {
                                  age = today.getFullYear() - date.getFullYear() - 1;
                                }
                              } else if (today.getDate() < date.getDate()) {
                                if (today.getMonth() >= date.getMonth()) {
                                  age = today.getFullYear() - date.getFullYear();
                                } else {
                                  age = today.getFullYear() - date.getFullYear() - 1;
                                }
                              } else {
                                if (today.getMonth() >= date.getMonth()) {
                                  age = today.getFullYear() - date.getFullYear();
                                } else {
                                  age = today.getFullYear() - date.getFullYear() - 1;
                                }
                              } if (age < 18) {
                                alert("Age should be 18")
                                ref.current.reset()
                              }
                              setFormData((prev) => { return { ...prev, age: age } })
                            }} />
                          </div>
                        </div>
                        <div className="col-md-6 mb-3">
                          <h6 className="mb-2 pb-1">Gender: </h6>

                          <div className="q" onChange={(e) => {
                            setFormData((prev) => { return { ...prev, gender: e.target.value } })
                          }} >
                            <div className="form-check form-check-inline">
                              <input className="form-check-input" type="radio" name="gender"
                                id="male" value="male" />
                              <label className="form-check-label" for="gender">Male</label>
                            </div>
                            <div className="form-check form-check-inline">
                              <input className="form-check-input" type="radio" name="gender"
                                id="female" value="female" />
                              <label className="form-check-label" for="gender">Female</label>
                            </div>
                            <div className="form-check form-check-inline">
                              <input className="form-check-input" type="radio" name="gender"
                                id="other" value="other" />
                              <label className="form-check-label" for="gender">Other</label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6 mb-3 pb-2">
                          <div className="form-outline">
                            <label className="form-label" for="email">Email</label>
                            <input type="email" id="email" className="form-control form-control-lg" onChange={(e) => {
                              setFormData((prev) => { return { ...prev, email: e.target.value } })
                            }} />
                          </div>
                        </div>
                        <div className="col-md-6 mb-3 pb-2">
                          <div className="form-outline">
                            <label className="form-label" for="phoneNumber">Phone Number</label>
                            <input type="text" id="phone" className="form-control form-control-lg" onChange={(e) => {
                              setFormData((prev) => { return { ...prev, phone: e.target.value } })
                            }} />
                          </div>
                        </div>
                        <div className="col-md-6 mb-3 pb-2">
                          <div className="form-outline">
                            <label className="form-label" for="password">Password</label>
                            <input type="password" id="password" className="form-control form-control-lg" onChange={(e) => {
                              setFormData((prev) => { return { ...prev, password: e.target.value } })
                            }} />
                          </div>
                        </div>
                        <div className="col-md-6 mb-3 pb-2">
                          <div className="form-outline">
                            <label className="form-label" for="confirmPassword">Confirm Password</label>
                            <input type="password" id="confirmPassword" className="form-control form-control-lg" onChange={(e) => {
                              setFormData((prev) => { return { ...prev, confirmPassword: e.target.value } })
                            }} />
                          </div>
                        </div>
                        <div className="col-md-6 mb-5 pb-2">
                          <div className="form-outline">
                            <input type="file" className='form-control' onChange={(e) => {
                              const profilePicture = e.target.files[0]
                              const reader = new FileReader();
                              reader.readAsDataURL(profilePicture);
                              reader.addEventListener("load", (e) => {
                                setFormData((prev) => { return { ...prev, profilePicture: e.target.result } })
                              })
                            }} />
                          </div>
                        </div>
                      </div>
                    </form>
                    <div className="d-flex justify-content-center">
                      <button className="btn btn-primary btn-lg" style={{ width: "400px" }} onClick={() => {
                        handleSubmit()
                      }}>Submit</button>
                    </div>
                    <p class="text-center text-muted mt-4 mb-0 fs-5" onClick={() => {
                      setMode("login")
                    }}> Have already an account?
                      <a class="fw-bold text-body fs-5" style={{ cursor: "pointer" }}><u> Login here</u></a></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
