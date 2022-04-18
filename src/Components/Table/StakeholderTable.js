import './Table.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { BiX } from 'react-icons/bi'
import { CgSearch } from 'react-icons/cg'
import { MdKeyboardArrowRight } from "react-icons/md";

function StakeholderTable({ Location }) {

    const nav = useNavigate();

    const [data, setData] = useState([]);
    const [btnClearSearch, setbtnClearSearch] = useState(false);
    const [search, setSearch] = useState("");
    const [contactFilter, setContactFilter] = useState('');

    useEffect(() => {
        axios.get("https://tritonsrm-api.herokuapp.com/api/stakeholders", {
            headers: {
                "x-access-token": localStorage.getItem("x-access-token"),
            },
        }).then((response) => setData(response.data));
    }, []);

    function selectStakeholder(stakeholderInfo) {
        window.scrollTo(0, 0);
        nav(`/${stakeholderInfo.NAME}`, {
            state: {
                stakeholder: stakeholderInfo
            }
        });
    }

    function handleSearch(txt) {
        setSearch(txt);
        if (txt !== "") {
            setbtnClearSearch(true);
        } else {
            setbtnClearSearch(false);
        }
    }

    function clearSearch() {
        setSearch("");
        document.getElementById("table-input").value = "";
        setbtnClearSearch(false);
    }

    function checkLocation(Address) {

        let stakeholderLocation = Address.split(',');

        if (Location.province === 'MISSING') {
            if (stakeholderLocation.length < 3){
                return true;
            }
            if (Address === '') {
                return true;
            }
        }

        let location = { province: stakeholderLocation[stakeholderLocation.length - 2], city: stakeholderLocation[stakeholderLocation.length - 3] };

        if (Location.province === '' && Location.city === '') {
            return true
        }
        if (Address !== '') {
            if (Location.province !== '' && Location.city === '') {
                if (location.province.includes(Location.province)) {
                    return true;
                }
            }
            if (Location.province !== '' && Location.city !== '') {
                if (location.province.includes(Location.province) && location.city.includes(Location.city)) {
                    return true;
                }
            }
        }

        else return false;
    }

    function checkContactStatus(contactStatus) {
        if (contactFilter === '') {
            return true;
        }
        if (contactFilter === 'YES' && contactStatus === 'YES') {
            return true;
        }
        if (contactFilter === 'NO' && contactStatus !== 'YES') {
            return true;
        }

        return false;
    }

    function Filter(stakeholder){
        if(stakeholder.NAME.toLowerCase().includes(search.toLowerCase())){
            if(checkLocation(stakeholder.MAILING)){
                if(checkContactStatus(stakeholder.CONTACTED)){
                    return true;
                }
            }
        }
        return false;
    }

    function getContactStatus(contactStatus) {
        if (contactStatus === 'YES') {
            return ({ backgroundColor: 'rgb(0,255,0, 0.5)' });
        } else {
            return ({ backgroundColor: 'rgb(255,0,0, 0.4)' });
        }
    }

    function checkMissing(location){
        if (location.length >= 3){
            return true;
        } else {
            return false;
        }
    }

    return (
        <div className='table-container'>

            <div className="input-container">
                <div className="ddl-filter">
                    <select defaultValue={contactFilter} onChange={(event) => setContactFilter(event.target.value)}>
                        <option value="">All</option>
                        <option value="YES">Contacted</option>
                        <option value="NO">No Contact</option>
                    </select>
                </div>
                <input type="text" id="table-input" defaultValue="" required onChange={(e) => handleSearch(e.target.value)} placeholder="Search Stakeholders..." />
                <div className="clearbtn-container">
                    {btnClearSearch ?
                        <div className="clear-btn-clear"><BiX size='2.5rem' cursor='pointer' color='grey' onClick={clearSearch} /></div>
                        :
                        <div className="clear-btn-search"><CgSearch size='2rem' color='grey' /></div>}
                </div>
            </div>

            <table>
                <thead>
                    <tr>
                        <th><h5>Name</h5></th>
                        <th><h5>Tracts</h5></th>
                        <th><h5>Contact Staus</h5></th>
                        <th><h5>Province</h5></th>
                        <th><h5>City</h5></th>
                        <th><h5>Attempts</h5></th>
                        <th><h5>Contacted</h5></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((stakeholder, index) => {

                        let location = stakeholder.MAILING.split(",");

                        if (Filter(stakeholder)){
                            return (
                                <tr key={index} onClick={() => selectStakeholder(stakeholder)}>
                                    <td className='td-name'>{stakeholder.NAME}</td>
                                    <td>{stakeholder.count}</td>
                                    <td>{stakeholder.CONTACT}</td>
                                    <td>{checkMissing(location) ? location[location.length - 2] : 'MISSING'}</td>
                                    <td>{checkMissing(location) ? location[location.length - 3] : 'MISSING'}</td>
                                    <td>{stakeholder.ATTEMPTS}</td>
                                    <td className='contacted-cell'><div style={getContactStatus(stakeholder.CONTACTED)} className='contacted-wrapper'>{stakeholder.CONTACTED}</div></td>
                                    <td><MdKeyboardArrowRight size='1.5rem' color='grey' /></td>
                                </tr>
                            );
                        }
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default StakeholderTable;