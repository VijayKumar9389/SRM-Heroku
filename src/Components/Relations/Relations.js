import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import './Relations.css';

import { FaHome } from 'react-icons/fa';
import { FaPhone } from 'react-icons/fa';
import { MdMail } from 'react-icons/md';


function Relations({ Stakeholder }) {

    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get("https://tritonsrm.com/api/stakeholders/connections/" + Stakeholder, {
            headers: {
                "x-access-token": localStorage.getItem("x-access-token"),
            },
        }).then((response) => setData(response.data));
    }, [Stakeholder]);


    return (
        <div className='relations-container'>
            <div className='forum-header'>
                <h3>RELATIONS</h3>
            </div>
            <ul>
                {data.map((record, index) => {
                    return (
                        <Link key={index} className='relation-link' to={`/${record.stakeholder.NAME}`} state={{ stakeholder: record.stakeholder }}>
                            <li>
                                <h3>{record.stakeholder.NAME}</h3>
                                <div className='info-wrapper'>
                                    <FaPhone size='1.2rem' />
                                    {record.phone ? <a>{record.stakeholder.PHONE}</a> : <a></a>}
                                </div>
                                <div className='info-wrapper'>
                                    <MdMail size='1.2rem' />
                                    {record.address ? <a>{record.stakeholder.MAILING}</a> : <a></a>}
                                </div>
                                <div className='info-wrapper'>
                                    <FaHome size='1.2rem' />
                                    {record.street ? <a>{record.stakeholder.STREET}</a> : <a></a>}
                                </div>
                            </li>
                        </Link>
                    );
                })}
            </ul>
        </div>
    );
}

export default Relations;