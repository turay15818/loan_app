/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { getMe } from "src/features/authSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
    CDropdown,
    CDropdownMenu,
    CModalBody,
    CModalTitle,
    CModalHeader,
    CModal,
    CCol,
    CButton,
    CForm,
    CContainer,
    CDropdownItem,
    CRow,
    CFormInput,
} from '@coreui/react'



const EditUser = () => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const { isError } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(getMe());
    }, [dispatch]);

    useEffect(() => {
        if (isError) {
            navigate("/");
        }
    }, [isError, navigate]);





    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");
    const [role, setRole] = useState("");
    const [msg, setMsg] = useState("");
    const { uid } = useParams();

    useEffect(() => {
        const getUserById = async () => {
            try {
                // const response = await axios.get(`http://172.25.164.15:3667/users/${uid}`);
                const response = await axios.get(`http://localhost:3667/users/${uid}`);
                setFullName(response.data.fullName);
                setEmail(response.data.email);
                setRole(response.data.role);
            } catch (error) {
                if (error.response) {
                    setMsg(error.response.data.msg);
                }
            }
        };
        getUserById();
    }, [uid]);

    const updateUser = async (e) => {
        e.preventDefault();
        try {
            //   await axios.patch(`http://172.25.164.15:3333/users/${uid}`, {
            await axios.patch(`http://localhost:3667/users/${uid}`, {
                fullName: fullName,
                email: email,
                password: password,
                confPassword: confPassword,
                role: role,
            });
            navigate("/base/userList");
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    };
    return (

        <CRow>
            <CCol xs={12}>

                <CContainer sm>

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
                            <CModalBody>{msg}</CModalBody>
                        </CModal>



                    </p>}

                    <div className="container text-left">
                        <div className="row">
                            <div className="col-md-6 offset-md-3">

                                <CForm onSubmit={updateUser}>
                                    <CFormInput
                                        className="input"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        placeholder="Name"
                                        type="text"
                                        id="exampleFormControlInput1"
                                        label="Staff Name"
                                        aria-describedby="exampleFormControlInputHelpInline"
                                    />
                                    <CFormInput
                                        required
                                        id="email"
                                        className="input"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        type="email"
                                        label="Email address"
                                        placeholder="name@example.com"
                                        aria-describedby="exampleFormControlInputHelpInline"
                                    />
                                    <CFormInput
                                        required
                                        id="password"
                                        minLength={8}
                                        type="password"
                                        className="input"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="******"
                                        label="Password"
                                        aria-describedby="exampleFormControlInputHelpInline"
                                    />
                                    <CFormInput
                                        required
                                        id="confPassword"
                                        minLength={8}
                                        type="password"
                                        className="input"
                                        value={confPassword}
                                        onChange={(e) => setConfPassword(e.target.value)}
                                        placeholder="******"
                                        label="Confirm Password"
                                        aria-describedby="exampleFormControlInputHelpInline"
                                    />

                                    <CDropdown alignment={{ xs: 'end', lg: 'start' }}
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                    >
                                        <CDropdownMenu
                                            value={role}
                                            onChange={(e) => setRole(e.target.value)}
                                        >
                                            <CDropdownItem value="">***Select***</CDropdownItem>
                                            <CDropdownItem value="admin" id="admin">CEO</CDropdownItem>
                                            <CDropdownItem value="director" id="director">Director</CDropdownItem>
                                            <CDropdownItem value="manager" id="manager">Manager</CDropdownItem>
                                            <CDropdownItem value="user" id="user">User</CDropdownItem>
                                        </CDropdownMenu>
                                    </CDropdown>

                                    <div className="d-grid gap-2">

                                        <select
                                            value={role}
                                            onChange={(e) => setRole(e.target.value)}
                                        >
                                            <option value="">***Select***</option>
                                            {/* <option value="admin" id="adminRole">Admin</option> */}
                                            <option value="director" id="userRole">Director</option>
                                            <option value="accountant" id="TCM">Accountant</option>
                                            <option value="user" id="TCM">User</option>
                                        </select>

                                    </div>
                                    {/* <CButton color="primary" size="lg" type="submit">Primary button</CButton> */}
                                    <hr />
                                    <div className="d-grid gap-2">
                                        <CButton color="primary" type="submit">Button</CButton>
                                    </div>

                                </CForm>

                            </div>
                        </div>
                    </div>

                </CContainer>

            </CCol>
        </CRow>

    );
};

export default EditUser;


