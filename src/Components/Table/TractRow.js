import './Table.css';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { FaRegSave } from 'react-icons/fa';
import { BiRightArrowAlt } from 'react-icons/bi';
import { CgSearch } from 'react-icons/cg';

function TractRow({ Stakeholder, stakeholderProfile, Search }) {

    const nav = useNavigate();

    const [newStructure, setNewnewStructure] = useState(Stakeholder.STRUCTURE_TYPE);
    const [newStatus, setNewStatus] = useState(Stakeholder.INTEREST);
    const [newOccupants, setNewOccupants] = useState(Stakeholder.OCCUPANTS);
    const [newWorksLand, setnewWorksLand] = useState(Stakeholder.WORKED);
    const [newComments, setNewComments] = useState(Stakeholder.COMMENTS);

    const pin = Stakeholder.PIN.split("/");

    const Update = (id) => {
        axios.put("https://tritonsrm-api.herokuapp.com/api/tracts/update",
            {
                ID: id,
                STRUCTURE_TYPE: newStructure,
                INTEREST: newStatus,
                OCCUPANTS: newOccupants,
                WORKED: newWorksLand,
                COMMENTS: newComments
            },{
                headers: { "x-access-token": localStorage.getItem("x-access-token") }
            })
            .then(
                (response) => {
                    successtoast("Successfully Updated Tract " + Stakeholder.TRACT + " for " + Stakeholder.NAME);
                }
            );
    }

    function successtoast(name) {
        toast.success(name, {
            position: toast.POSITION.TOP_RIGHT
        });
    }

    function selectStakeholder(stakeholderInfo) {
        window.scrollTo(0, 0);
        nav(`/${stakeholderInfo.NAME}`, {
            state: {
                stakeholder: stakeholderInfo
            }
        });
    }

    return (
        <tr>
            <td className='tract-cell'>
                <a><h2>{Stakeholder.TRACT}</h2></a>
                <a>{pin[1]}</a>
            </td>
            <td><textarea className='tract-input' defaultValue={Stakeholder.STRUCTURE_TYPE} onChange={(event) => setNewnewStructure(event.target.value)}></textarea></td>
            <td className='name-cell'>{Search ? <CgSearch size='2rem' color='#68bd45'/> : <></>}{Stakeholder.NAME}</td>
            <td>{Stakeholder.INTEREST}</td>
            <td><textarea className='tract-input' defaultValue={Stakeholder.OCCUPANTS} onChange={(event) => setNewOccupants(event.target.value)}></textarea></td>
            <td className='ddl-cell'>
                <select className="table-ddl" defaultValue={Stakeholder.WORKED} onChange={(event) => setnewWorksLand(event.target.value)}>
                    <option value="">N/A</option>
                    <option value="YES">YES</option>
                    <option value="NO">NO</option>
                </select>
            </td>
            <td>{Stakeholder.COMMODITY}</td>
            <td>{Stakeholder.PIPLINESTATUS}</td>
            <td><textarea className='comment-input' defaultValue={Stakeholder.COMMENTS} onChange={(event) => setNewComments(event.target.value)}></textarea></td>
            <td className='btn-cell' onClick={() => Update(Stakeholder.ID)}><FaRegSave size='2rem'/></td>
            {stakeholderProfile ? <td></td> : <td className='btn-cell' onClick={() => selectStakeholder(Stakeholder)}><BiRightArrowAlt size='2rem'/></td>}
        </tr>
    );
}

export default TractRow;