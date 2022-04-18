import './Table.css';

import axios from 'axios';
import { useEffect, useState } from 'react';

import { BiX } from 'react-icons/bi';
import { CgSearch } from 'react-icons/cg';

import TractRow from './TractRow';

function TractTable({ Stakeholder }) {

    const [data, setData] = useState([]);
    const [allStakeholders, setAllStakeholders] = useState([]);
    const [search, setSearch] = useState("");
    const [btnClearSearch, setbtnClearSearch] = useState(false);

    useEffect(() => {
        axios.get('https://tritonsrm-api.herokuapp.com/api/tracts/cluster/' + Stakeholder, {
            headers: {
                "x-access-token": localStorage.getItem("x-access-token"),
            },
        }).then((response) => setData(response.data));
        axios.get("https://tritonsrm-api.herokuapp.com/api/tracts/", {
            headers: {
                "x-access-token": localStorage.getItem("x-access-token"),
            },
        }).then((response) => setAllStakeholders(response.data));
    }, [Stakeholder]);

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

    function checkStakeholder(name){
        if(Stakeholder === name){
            return true;
        } else {
            return false;
        }
    }

    return (
        <div className='table-container'>
            <div className='table-heading'>
                <h2>AFFILIATED TRACTS</h2>
            </div>
            <div className="input-container">
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
                        <th><h5>Tract</h5></th>
                        <th><h5>Structure</h5></th>
                        <th><h5>Name</h5></th>
                        <th><h5>Status</h5></th>
                        <th><h5>Occupants</h5></th>
                        <th><h5>Works Land</h5></th>
                        <th><h5>Commodity</h5></th>
                        <th><h5>Pipeline Status</h5></th>
                        <th><h5>Comment</h5></th>
                        <th>Save</th>
                        <th>View</th>
                    </tr>
                </thead>
                <tbody>
                    {allStakeholders.map((stakeholder, index) => {
                        if (search !== '' & stakeholder.NAME.toLowerCase().includes(search.toLowerCase())) {
                            return (
                                <TractRow Stakeholder={stakeholder} stakeholderProfile={checkStakeholder(stakeholder.NAME)} Search={true}/>
                            );
                        }
                    })}
                    {data.map((stakeholder, index) => {
                        return (
                            <TractRow Stakeholder={stakeholder} stakeholderProfile={checkStakeholder(stakeholder.NAME)} Search={false}/>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );

}

export default TractTable;