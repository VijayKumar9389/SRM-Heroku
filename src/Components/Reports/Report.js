import './Report.css';
import { useEffect, useState } from 'react';
import Axios from 'axios';
import { BsFillPersonFill } from 'react-icons/bs';
import { BsFillPersonCheckFill } from 'react-icons/bs';
import { BsPersonXFill } from 'react-icons/bs';
import { BsFillPersonDashFill } from 'react-icons/bs';
import { BsFillPersonPlusFill } from 'react-icons/bs';

function Report() {
    const [data, setData] = useState([]);

    useEffect(() => {
        Axios.get("https://tritonsrm.com/api/tracts/report", {
            headers: {
                "x-access-token": localStorage.getItem("x-access-token"),
            },
        }).then((response) => setData(response.data));
    }, []);

    return (
        <div id='report-container'>
            <div className='report-item'>
                <div className='report-item-wrapper'>
                    <a><BsFillPersonCheckFill size='3rem' /></a>
                    <p>CONTACTED</p>
                    <h1>{data.contacted}</h1>
                </div>
            </div>
            <div className='report-item'>
                <div className='report-item-wrapper'>
                    <a><BsPersonXFill size='3rem' /></a>
                    <p>REMAINING</p>
                    <h1>{data.remaining}</h1>
                </div>
            </div>
            <div className='report-item'>
                <div className='report-item-wrapper'>
                    <a><BsFillPersonFill size='3rem' /></a>
                    <p>TOTAL</p>
                    <h1>{data.total}</h1>
                </div>
            </div>
            <div className='report-item'>
                <div className='report-item-wrapper'>
                    <a><BsFillPersonDashFill size='3rem' /></a>
                    <p>SINGLE-TRACT</p>
                    <h1>{data.single}</h1>
                </div>
            </div>
            <div className='report-item-nb'>
                <div className='report-item-wrapper'>
                    <a><BsFillPersonPlusFill size='3rem' /></a>
                    <p>MULTI-TRACT</p>
                    <h1>{data.multi}</h1>
                </div>
            </div>
        </div>
    );
}

export default Report;