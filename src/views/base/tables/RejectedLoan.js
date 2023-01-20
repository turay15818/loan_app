/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaEye } from 'react-icons/fa';
import { HiViewGridAdd } from 'react-icons/hi';
import { BiEdit } from 'react-icons/bi';
import {
    CButtonGroup,
    CButton,
    CCol,
    CRow,

} from '@coreui/react'
import { MdPendingActions } from 'react-icons/md';
import { FiLoader } from 'react-icons/fi';
import { MdSendToMobile } from 'react-icons/md';
import { BsCheckCircleFill } from 'react-icons/bs';
import { FiExternalLink } from 'react-icons/fi';
import moment from "moment"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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


const RejectedLoan = () => {
    const { user } = useSelector((state) => state.auth);

    const [approvedLoan, setApprovedLoan] = useState([]);

    useEffect(() => {
        getApprovedLoan();
    }, []);

    const getApprovedLoan = async () => {
        // const response = await axios.get("http://172.25.164.15:3667/rejectedLoan");
        const response = await axios.get("http://localhost:3667/rejectedLoan");
        setApprovedLoan(response.data);
        console.log(response)
    };

    $(document).ready(function () {
        setTimeout(function () {
            $('#table').DataTable(
                {
                    pagingType: 'full_numbers',
                    pageLength: 5,
                    processing: true,
                    //   scrollY: 200,
                    //   scrollX: true,
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

    const [visible, setVisible] = useState(false)


    return (
        <CRow>
            <CButtonGroup role="group" aria-label="Basic example" style={{ marginBottom: "5px", borderRadius: '25px' }}>
                <CButton color="dark" style={{ border: "solid 2px orange", margin: '2px', borderRadius: '15px' }} onClick={() => setVisible(!visible)}>
                    <HiViewGridAdd style={{ color: "orange" }} />  New Complain
                </CButton>

                <CButton color="dark" style={{ border: "solid 2px orange", margin: '2px', borderRadius: '15px' }}>
                    <Link to="/base/approvedLoan" style={{ color: "white", textDecoration: "none", fontWeight: 700 }}>
                        <MdPendingActions style={{ color: "orange" }} />  Approved Loan
                    </Link>
                </CButton>

                <CButton color="dark" style={{ border: "solid 2px orange", margin: '2px', borderRadius: '15px' }}>
                    <Link to="/base/rejectedLoan" style={{ color: "white", textDecoration: "none", fontWeight: 700 }}>
                        <FiLoader style={{ color: "orange" }} />  Rejected Loan
                    </Link>
                </CButton>

            </CButtonGroup>



            <CCol xs={12}>

                <table className="table is-striped is-fullwidth" id="table">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Requestor Name</th>
                            <th>Requesting For</th>
                            <th>Amount</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {approvedLoan.map((approvedLoan, index) => (
                            <tr key={approvedLoan.uid}>
                                <td>{index + 1}</td>
                                <td>{approvedLoan.name}</td>
                                <td>{approvedLoan.requestingFor}</td>
                                <td>{approvedLoan.amount}</td>
                                <td>{approvedLoan.date}</td>
                                <td>{approvedLoan.status}</td>
                                <td>
                                    <CButton color="warning">
                                        <Link style={{ color: "black", textDecoration: "none", fontWeight: 700 }}
                                            to={`/base/loanList/${approvedLoan.uid}`}
                                            className="is-info"
                                        >
                                            <FaEye style={{ color: "white", textDecoration: "none", fontWeight: 700 }} />   View
                                        </Link>
                                    </CButton>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </CCol>


        </CRow>
    );
};

export default RejectedLoan;
