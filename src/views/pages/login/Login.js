/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { LoginUser, reset } from '../../../features/authSlice'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CModalHeader,
  CModal,
  CContainer,
  CModalTitle,
  CModalBody,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'

const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user, isError, isSuccess, isLoading, message } = useSelector((state) => state.auth)

  useEffect(() => {
    if (user || isSuccess) {
      navigate('/dashboard')
    }
    dispatch(reset())
  }, [user, isSuccess, dispatch, navigate])

  const Auth = (e) => {
    e.preventDefault()
    dispatch(LoginUser({ email, password }))
  }




  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        {isError && <p className="has-text-centered">
          <CModal
            className="show d-block position-static"
            backdrop={false}
            keyboard={false}
            portal={false}
            visible
          >
            <CModalHeader>
              <CModalTitle>Login Fail Due To</CModalTitle>
            </CModalHeader>
            <CModalBody>{message}</CModalBody>
          </CModal>



        </p>}




        <CRow className="justify-content-center">
          <CCol md={4}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={Auth}>
                    <h1 className="title is-2" style={{ textAlign: "center" }}>Login</h1>
                    <p className="text-medium-emphasis" style={{ textAlign: "center" }}>Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        required
                        id="email"
                        className="input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        // label="Email address"
                        placeholder="name@example.com"
                        aria-describedby="exampleFormControlInputHelpInline"
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">

                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>

                      <CFormInput
                        required
                        id="password"
                        minLength={8}
                        type="password"
                        className="input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="******"
                        //  label="Password"
                        aria-describedby="exampleFormControlInputHelpInline"
                      />
                    </CInputGroup>

                    <CRow>
                      <CCol xs={6}>
                        <hr />

                        <div className="d-grid gap-2">
                          <CButton id="login" style={{ backgroundColor: '#ff6600', border: 'solid 2px #ff6600' }} type="submit">{isLoading ? "Loading..." : "Login"}</CButton>
                        </div>

                      </CCol>

                    </CRow>

                  </CForm>
                </CCardBody>
              </CCard>



              {/* <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard> */}
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
