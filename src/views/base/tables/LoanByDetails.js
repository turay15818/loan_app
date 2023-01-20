/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {
    CCard,
    CListGroup,
    CListGroupItem,
    CCardHeader,
    CCol,
    CContainer,
    CRow,
} from '@coreui/react'


const LoanByDetails = () => {
    const [name, setName] = useState("");
    const [requestingFor, setRequestingFor] = useState("");
    const [amount, setAmount] = useState([]);
    const [amountInWords, setAmountInWords] = useState([]);
    const [date, setDate] = useState([]);
    const [status, setStatus] = useState([]);
    const [userId, setUserId] = useState([]);
    const [url, setUrl] = useState([]);
    const [fullName, setFullName] = useState([]);
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();
    const { uid } = useParams();

    useEffect(() => {
        const getComplainById = async () => {
            try {
                // const response = await axios.get(`http://172.25.164.15:3667/loan/${uid}`);
                const response = await axios.get(`http://localhost:3667/loan/${uid}`);
                setName(response.data.name);
                setRequestingFor(response.data.requestingFor);
                setAmount(response.data.amount);
                setAmountInWords(response.data.amountInWords);
                setDate(response.data.date);
                setStatus(response.data.status);
                setUserId(response.data.userId);
                setUrl(response.data.url);
                setFullName(response.data.fullName);
                console.log(response)

            } catch (error) {
                if (error.response) {
                    setMsg(error.response.data.msg);
                }
            }
        };
        getComplainById();
    }, [uid]);

    return (



        <CRow>
            <CCol xs={12}>
                <CContainer sm>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 offset-md-3">
                                <CCard style={{ width: '35rem', }}>
                                    <CCardHeader>Complain By Details</CCardHeader>
                                    <h4 style={{ textAlign: "center" }}>Welcome to Orange Sierra Leone</h4>
                                    <CListGroup flush>

                                        <CListGroupItem style={{ paddingLeft: '15px' }}>
                                            <div className="element">
                                                <h5>Requestor Name: <span style={{ color: "#FF6600" }}>{name}</span></h5>
                                            </div>
                                        </CListGroupItem>

                                        <CListGroupItem>
                                            <div className="element">
                                                <h5>Requesting For: <span style={{ color: "#FF6600" }}>{requestingFor}</span></h5>
                                            </div>
                                        </CListGroupItem>


                                        <CListGroupItem>
                                            <div className="element">
                                                <h5>Amount: <span style={{ color: "#FF6600" }}>{amount}</span></h5>
                                            </div>
                                        </CListGroupItem>


                                        <CListGroupItem>
                                            <div className="element">
                                                <h5>Amount In Words: <span style={{ color: "#FF6600" }}>{amountInWords}</span></h5>
                                            </div>
                                        </CListGroupItem>


                                        <CListGroupItem>
                                            <div className="element">
                                                <h5>Date: <span style={{ color: "#FF6600" }}>{date}</span></h5>
                                            </div>
                                        </CListGroupItem>


                                        <CListGroupItem>
                                            <div className="element">
                                                <h5>Status: <span style={{ color: "#FF6600" }}>{status}</span></h5>
                                            </div>
                                        </CListGroupItem>

                                        <CListGroupItem>
                                            <div className="element">
                                                <h5>User Id: <span style={{ color: "#FF6600" }}>{userId}</span></h5>
                                            </div>
                                        </CListGroupItem>
                                        <CListGroupItem>
                                            <div className="element">
                                                <h5>Signature:  <figure className="image is-4by3">

                                                    <img src={url} alt="Signature" style={{ size: "100px" }} />

                                                </figure></h5>
                                            </div>
                                        </CListGroupItem>

                                    </CListGroup>
                                </CCard>


                            </div>
                        </div>
                    </div>
                </CContainer>
            </CCol>
        </CRow>
    )
};

export default LoanByDetails;
