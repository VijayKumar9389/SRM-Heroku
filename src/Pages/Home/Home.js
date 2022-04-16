import { useState } from 'react';

import './Home.css';
import { MdLogout } from 'react-icons/md';

import Sidebar from '../../Components/Sidebar/Sidebar';
import StakeholderTable from '../../Components/Table/StakeholderTable';
import Report from '../../Components/Reports/Report';

function Home({ Logout }) {

    const [location, setLocation] = useState({ province: '', city: '' });

    function setLocationFilter(location) {
        setLocation(location);
    }

    return (
        <div className='home-container'>
            <Sidebar setLocation={location => setLocationFilter(location)} />
            <div className='home-body'>
                <div className='home-heading'>
                    <div className='heading-wrapper'>
                        <h2>STAKEHOLDERS</h2>
                        <div className='logout-container'>
                            <div className='logout-info-container'>< MdLogout color='gray' size='3rem'/></div>
                            <div className='logout-btn-container'>
                                <li className='btn-logout' onClick={Logout}>Log Out</li>
                            </div>
                        </div>
                    </div>
                </div>
                <Report />
                <StakeholderTable Location={location} />
            </div>
        </div>
    );
}

export default Home;