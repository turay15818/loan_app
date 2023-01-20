/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {
  CCol,
  CButton,
  CForm,
  CContainer,
  CRow,
} from '@coreui/react'



const EditLoan = () => {
    const navigate = useNavigate();
  const [status, setStatus] = useState("");
  const [msg, setMsg] = useState("");
  const { uid } = useParams();

  useEffect(() => {
    const getLoanById = async () => {

      try {
        const response = await axios.get(
        //   `http://172.25.164.15:3667/loan/${uid}`
          `http://localhost:3667/loan/${uid}`
        );
        setStatus(response.data.status);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getLoanById();
  }, [uid]);

  const updateLoan = async (e) => {
    e.preventDefault();
    try {
    //   await axios.patch(`http://172.25.164.15:3667/loan/${uid}`, {
      await axios.patch(`http://localhost:3667/loan/${uid}`, {
        status: status,
       
      }); 
      navigate("/base/loanList");


    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  }


  return (
    <>
      <CRow>
          <CCol xs={12}>
            <CContainer sm>
              <div className="container text-left">
                <h4>Change Loan Status</h4>
                <div className="row">
                  <div className="col-md-6 offset-md-3">

                    <CForm onSubmit={updateLoan} id="form1">
                      <p className="has-text-centered">{msg}</p>
                      <hr />
                      <div className="d-grid gap-2">
                        <p>Loan Status</p>
                        <select
                          required
                          value={status}
                          onChange={(e) => setStatus(e.target.value)}
                        >
                          <option value="">***Select***</option>
                         
                          <option value="Approved">Approve</option>
                          <option value="Rejected">Reject</option>
                        </select>
                      </div>
                      <hr />
                      <div className="d-grid gap-2">
                        <CButton color="primary" type="submit" >
                          Update
                        </CButton>
                      </div>
                    </CForm>
                  </div>
                </div>
              </div>
            </CContainer>
          </CCol>
      </CRow>
    </>
  );
};
export default EditLoan;
