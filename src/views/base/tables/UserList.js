/* eslint-disable prettier/prettier */
import React, { useState, useEffect} from "react";
import { getMe } from "src/features/authSlice";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AddUser from "./AddUser";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import {
    CModalTitle,
    CModal,
    CModalHeader,
    CModalBody,
    CModalFooter,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CButton
} from '@coreui/react'
import { FaUserPlus } from 'react-icons/fa';
import { FiDelete } from 'react-icons/fi';
import { BiEdit } from 'react-icons/bi';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import "datatables.net-buttons/js/dataTables.buttons.js"
import "datatables.net-buttons/js/buttons.colVis.js"
import "datatables.net-buttons/js/buttons.flash.js"
import "datatables.net-buttons/js/buttons.html5.js"
import "datatables.net-buttons/js/buttons.print.js"
import 'datatables.net-buttons/js/buttons.flash.min.js'
import * as jzip from 'jszip';
import 'pdfmake';
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
window.JSZip = jzip;

const UserList = () => {
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


    $(document).ready(function () {
        setTimeout(function () {
            $('#userlist').DataTable(
                {
                    pagingType: 'full_numbers',
                    pageLength: 5,
                    processing: true,
                    scrollY: 200,
                    scrollX: true,
                    dom: 'Bfrtip',
                    destroy: true,
                    buttons: ['copy', 'csv', 'excel', 'pdf', 'print'
                    ]
                }
            );
        },
            1000
        );
    });



    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        // const response = await axios.get("http://172.25.164.15:3667/users");
        const response = await axios.get("http://localhost:3667/users");
        setUsers(response.data);
    };

    const deleteUser = async (userId) => {
        // await axios.delete(`http://172.25.164.15:3667/users/${userId}`);
        await axios.delete(`http://localhost:3667/users/${userId}`);
        getUsers();
    };
    const [visible, setVisible] = useState(false)
    const [visibleLg, setVisibleLg] = useState(false)





    return (
        <>
            <CRow>
                {user && user.role === 'ceo' && (
                    <><CButton color="dark" onClick={() => setVisibleLg(!visibleLg)} style={{ fontWeight: 700, }}><FaUserPlus style={{ color: "orange", fontSize: "30px", marginRight: "20px" }} /> Add User</CButton>
                        <CModal visible={visibleLg} onClose={() => setVisibleLg(false)}>
                            <CModalHeader>
                                <CModalTitle>Add User</CModalTitle>
                            </CModalHeader>
                            <CModalBody>
                                <AddUser />
                            </CModalBody>
                        </CModal></>
                )}

                {user && user.role === 'ceo' && (
                    <CCol xs={12}>
                        <CCard className="mb-4">
                            <CCardHeader>
                                <strong>Users Table</strong>
                            </CCardHeader>
                            <CCardBody>
                                <table className="table is-striped is-fullwidth" id="userlist">
                                    <thead>
                                        <tr>
                                            <th>No</th>
                                            <th>Staff Id</th>
                                            <th>Name</th>
                                            <th>Department</th>
                                            <th>Email</th>
                                            <th>Phone Number</th>
                                            <th>Address</th>
                                            <th>Role</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map((user, index) => (
                                            <tr key={user.uuid}>
                                                <td>{index + 1}</td>
                                                <td>{user.staffId}</td>
                                                <td>{user.fullName}</td>
                                                <td>{user.department}</td>
                                                <td>{user.email}</td>
                                                <td>{user.phoneNo}</td>
                                                <td>{user.address}</td>
                                                <td>{user.role}</td>
                                                <td>




                                                    <CButton color="warning" style={{ marginRight: "4px" }} id="editUsers">
                                                        <Link id="editUsers" style={{ textDecoration: "none", fontWeight: 700, color: 'white' }}
                                                            to={`/base/users/edit/${user.uid}`}

                                                        >
                                                            < BiEdit style={{ color: "black" }} />  Edit     </Link>
                                                    </CButton>


                                                    <CButton onClick={() => setVisible(!visible)} color="danger" style={{ fontWeight: 700, }}><FiDelete style={{ color: "orange" }} id="deleteButton" /> Delete</CButton>
                                                    <CModal visible={visible} onClose={() => setVisible(false)}>
                                                        <CModalHeader onClose={() => setVisible(false)}>
                                                            <CModalTitle>Delete</CModalTitle>
                                                        </CModalHeader>
                                                        <CModalBody>Are you sure you want to delete this user!</CModalBody>
                                                        <CModalFooter>
                                                            <CButton color="secondary" onClick={() => setVisible(false)}>
                                                                Cancel
                                                            </CButton>
                                                            <CButton color="danger" onClick={() => deleteUser(user.uid)}>Confirm Delete</CButton>
                                                        </CModalFooter>
                                                    </CModal>



                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </CCardBody>
                        </CCard>
                    </CCol>

                )}

                <h5>Staff Name:{" "}<span style={{ color: "#FF6600" }}>{user && user.name}</span></h5>
                <h5>Staff Id:{" "}<span style={{ color: "#FF6600" }}>{user && user.staffId}</span></h5>
                <h5>Email:{" "}<span style={{ color: "#FF6600" }}>{user && user.email}</span></h5>
                <h5>Phone No:{" "}<span style={{ color: "#FF6600" }}>{user && user.phoneNumber}</span></h5>
                <h5>Role:{" "}<span style={{ color: "#FF6600" }}>{user && user.role}</span></h5>

            </CRow>
        </>
    )
}

export default UserList
