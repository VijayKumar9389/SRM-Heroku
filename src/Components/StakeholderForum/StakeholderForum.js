import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

import './StakeholderForum.css';


function StakeholderForum({ Stakeholder }) {

    const [newName, setNewName] = useState('');
    const [newContactStatus, setNewContactStatus] = useState('');
    const [newHomeAddress, setNewHomeAddress] = useState('');
    const [newMailingAddress, setNewMailingAddress] = useState('');
    const [newPhoneNo, setNewPhoneNo] = useState('');
    const [newContacted, setNewContacted] = useState('');
    const [newAttemptDetails, setNewAttemptDetails] = useState('');
    const [newConsultationDate, setNewConsultationDate] = useState('');
    const [newFollowUp, setNewFollowUp] = useState('');

    const navigate = useNavigate();

    const Update = (name) => {
        axios.put("https://tritonsrm-api.herokuapp.com/api/stakeholders/update",
            {
                NAME: name,
                NEWNAME: newName.trim(),
                CONTACTSTATUS: newContactStatus.trim(),
                STREET: newHomeAddress.trim(),
                MAILING: newMailingAddress.trim(),
                PHONE: newPhoneNo.trim(),
                CONTACTED: newContacted.trim(),
                ATTEMPTS: newAttemptDetails.trim(),
                CONSULTATION: newConsultationDate.trim(),
                FOLLOWUP: newFollowUp.trim()
            }, {
            headers: { "x-access-token": localStorage.getItem("x-access-token") }
        }
        ).then((response) => {
            successtoast(name);
            navigate(`/${newName}`, {
                replace: true,
                state: {
                    stakeholder: {
                        NAME: newName.trim(),
                        CONTACT: newContactStatus.trim(),
                        STREET: newHomeAddress.trim(),
                        MAILING: newMailingAddress.trim(),
                        PHONE: newPhoneNo.trim(),
                        CONTACTED: newContacted.trim(),
                        ATTEMPTS: newAttemptDetails.trim(),
                        CONSULTATION: newConsultationDate.trim(),
                        FOLLOWUP: newFollowUp.trim()
                    }
                }
            });
        });
    }

    function successtoast(name) {
        toast.success(`Successfully updated ${name}`, {
            position: toast.POSITION.TOP_RIGHT
        });
    }

    function addAttempt(){

        let date = new Date();
        let today = date.getDate() + "-"+ parseInt(date.getMonth()+1) +"-"+date.getFullYear();

        if(document.getElementById('attempt-txt').value !== ''){
            today = ", "+date.getDate() + "/"+ ('0' + (date.getMonth()+1)).slice(-2) +"/"+date.getFullYear();
        } else {
            today = date.getDate() + "/"+ ('0' + (date.getMonth()+1)).slice(-2) +"/"+date.getFullYear();
        }

        setNewAttemptDetails(document.getElementById('attempt-txt').value + today);
        document.getElementById('attempt-txt').value = document.getElementById('attempt-txt').value + today;
    }

    function stampDate(){
        let date = new Date();
        let today = date.getDate() + "/"+ ('0' + (date.getMonth()+1)).slice(-2) +"/"+date.getFullYear();

        setNewConsultationDate(today);
        document.getElementById('consultation-txt').value = today;
    }

    useEffect(() => {
        setNewName(Stakeholder.NAME);
        setNewContactStatus(Stakeholder.CONTACT);
        setNewMailingAddress(Stakeholder.MAILING);
        setNewHomeAddress(Stakeholder.STREET);
        setNewPhoneNo(Stakeholder.PHONE);
        setNewContacted(Stakeholder.CONTACTED);
        setNewAttemptDetails(Stakeholder.ATTEMPTS);
        setNewConsultationDate(Stakeholder.CONSULTATION);
        setNewFollowUp(Stakeholder.FOLLOWUP);
    }, [Stakeholder]);

    return (
        <div className='forum-container'>
            <div className='forum-header'>
                <h3>STAKEHOLDER INFORMATION</h3>
            </div>
            <div className='forum-body'>
                <div className='column'>
                    <div className='input-wrapper'>
                        <label>Name</label>
                        <textarea type="text" defaultValue={Stakeholder.NAME} onChange={(event) => setNewName(event.target.value)} ></textarea>
                    </div>
                    <div className='input-wrapper'>
                        <label>Phone No.</label>
                        <textarea type="text" defaultValue={Stakeholder.PHONE} onChange={(event) => setNewPhoneNo(event.target.value)}></textarea>
                    </div>
                    <div className='input-wrapper'>
                        <label>Home Address</label>
                        <textarea type="text" defaultValue={Stakeholder.STREET} onChange={(event) => setNewHomeAddress(event.target.value)}></textarea>
                    </div>
                    <div className="btn-container">
                        <button className="btn-save" onClick={() => { Update(Stakeholder.NAME) }}>Save</button>
                        <div></div>
                    </div>
                </div>
                <div className='column'>
                    <div className='input-wrapper'>
                        <label>Mailing Address</label>
                        <textarea type="text" defaultValue={Stakeholder.MAILING} onChange={(event) => setNewMailingAddress(event.target.value)}></textarea>
                    </div>
                    <div className='input-wrapper'>
                        
                        <div className='label-wrapper'><label>Consultation Date</label><button className='label-btn' onClick={() => stampDate()}>+ Stamp Date</button></div>
                        <textarea id='consultation-txt' type="text" defaultValue={Stakeholder.CONSULTATION} onChange={(event) => setNewConsultationDate(event.target.value)}></textarea>
                    </div>
                    <div className='input-wrapper'>
                        <label>Follow Up</label>
                        <textarea type="text" defaultValue={Stakeholder.FOLLOWUP} onChange={(event) => setNewFollowUp(event.target.value)}></textarea>
                    </div>
                </div>
                <div className='column'>
                    <div className='input-wrapper'>
                        <div className='label-wrapper'><label>Attempt Details</label><button className='label-btn' onClick={() => addAttempt()}>+ Add Attempt</button></div>
                        <textarea id='attempt-txt' type="text" defaultValue={Stakeholder.ATTEMPTS} onChange={(event) => setNewAttemptDetails(event.target.value)}></textarea>
                    </div>
                    <div className="ddl-container">
                        <div className="ddl-wrapper">
                            <label>Contact Staus</label>
                            <select defaultValue={Stakeholder.CONTACT} onChange={(event) => setNewContactStatus(event.target.value)}>
                                <option value="GREEN">GREEN</option>
                                <option value="YELLOW">YELLOW</option>
                                <option value="RED">RED</option>
                            </select>
                        </div>
                        <div className="ddl-wrapper">
                            <label>Contacted</label>
                            <select defaultValue={Stakeholder.CONTACTED} onChange={(event) => setNewContacted(event.target.value)}>
                                <option value="">N/A</option>
                                <option value="YES">YES</option>
                                <option value="NO">NO</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StakeholderForum;