import { useEffect, useState } from 'react';
import axios from 'axios';

import './Sidebar.css';

import { BiArrowToLeft } from "react-icons/bi";
import { SiCivicrm } from "react-icons/si";

function Sidebar({ setLocation }) {

    const [data, setData] = useState([]);
    const [province, setProvince] = useState(null);
    const [city, setCity] = useState('');

    useEffect(() => {
        axios.get("https://tritonsrm.com/api/stakeholders/sidebar/locations", {
            headers: {
                "x-access-token": localStorage.getItem("x-access-token"),
            },
        }).then((response) => setData(response.data));
    }, []);

    function selectProvince(location) {
        setLocation({ province: location.province, city: '' });
        setProvince(location);
        window.scrollTo(0, 0);
    }

    function selectCity(city) {
        if (city) {
            setLocation({ province: province.province, city: city });
        } else {
            setLocation({ province: '', city: '' });
            setProvince(null);
            setCity('')
        }
        setCity(city);
        window.scrollTo(0, 0);
    }

    function checkActive(cityName) {
        if (city === cityName) {
            return {backgroundColor: '#68bd45', color: '#fff'};
        } else {
            return {backgroundColor: ''};
        }
    }

    function printProvinceList() {
        return (
            <ul>
                {data.map((location, index) => {
                    return (
                        <li key={index} onClick={() => selectProvince(location)}>
                            <a>{location.province}</a><a>({location.count})</a>
                        </li>
                    );
                })}
            </ul>
        );
    }

    function printCityList() {
        return (
            <ul>
                <li className='li-exit' onClick={() => selectCity(null)}><BiArrowToLeft size='2rem' /><a>{province.province}</a></li>
                {province.cities.map((city, index) => {
                    return (
                        <li key={index} style={checkActive(city.name)} onClick={() => selectCity(city.name)}>
                            <a>{city.name}</a><a>({city.count})</a>
                        </li>
                    );
                })}
            </ul>
        );
    }

    return (
        <div className='sidebar-container'>
            <div className='sidebar-heading'>
                <SiCivicrm size="3rem" color='#68bd45' />
                <p>Triton</p>
                <h1>SRM</h1>
            </div>
            <div className='sidebar-body'>
                {province ? printCityList() : printProvinceList()}
            </div>
        </div>
    );
}

export default Sidebar;