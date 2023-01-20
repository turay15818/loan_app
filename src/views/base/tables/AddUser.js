/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getMe } from "src/features/authSlice";
import {
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CCol,
    CButton,
    CForm,
    CContainer,
    CRow,
    CFormInput,
} from '@coreui/react'
import { useDispatch, useSelector } from "react-redux";

const AddUser = () => {
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



    const [staffId, setStaffId] = useState("");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [department, setDepartment] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [address, setAddress] = useState("");
    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");
    const [role, setRole] = useState("");
    const [msg, setMsg] = useState("");

    const saveUser = async (e) => {
        e.preventDefault();
        try {
            //   await axios.post("http://172.25.164.15:3333/users", {
            await axios.post("http://localhost:3667/users", {
                staffId: staffId,
                fullName: fullName,
                email: email,
                phoneNo: phoneNo,
                department: department,
                address: address,
                password: password,
                confPassword: confPassword,
                role: role,
            });
            navigate("/dashboard");
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
                            <div className="">

                                <CForm onSubmit={saveUser}>
                                    <CFormInput
                                        value={staffId}
                                        onChange={(e) => setStaffId(e.target.value)}
                                        placeholder="OSL_20ITN_190"
                                        required
                                        type="text"
                                        className="input"
                                        id="exampleFormControlInput1"
                                        label="Staff ID"
                                        aria-describedby="exampleFormControlInputHelpInline"
                                    />

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
                                        id="phoneNumber"
                                        minLength={8}
                                        maxLength={13}
                                        type="number"
                                        className="input"
                                        value={phoneNo}
                                        onChange={(e) => setPhoneNo(e.target.value)}
                                        placeholder="23279366751"
                                        label="Phone Number"
                                        aria-describedby="exampleFormControlInputHelpInline"
                                    />


                                    <CFormInput
                                        required
                                        id="department"
                                        className="input"
                                        value={department}
                                        onChange={(e) => setDepartment(e.target.value)}
                                        type="text"
                                        label="Department"
                                        placeholder="Networking"

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
                                        id="address"
                                        className="input"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        type="text"
                                        label="Address"
                                        placeholder="Hill Station"
                                        aria-describedby=""
                                    />


                                    <div className="d-grid gap-2">

                                        <select
                                            value={role}
                                            onChange={(e) => setRole(e.target.value)}
                                        >
                                            <option value="">***Select***</option>
                                            {/* <option value="admin" id="adminRole">Admin</option> */}
                                            <option value="director" id="director">Director</option>
                                            <option value="accountant" id="accountant">Accountant</option>
                                            <option value="user" id="user">User</option>
                                        </select>

                                    </div>


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




                                    {/* <CButton color="primary" size="lg" type="submit">Primary button</CButton> */}
                                    <hr />
                                    <div className="d-grid gap-2">
                                        <CButton color="primary" type="submit">Save User</CButton>
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

export default AddUser;




