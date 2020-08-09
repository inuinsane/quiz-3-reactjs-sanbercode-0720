import React from 'react';
import './About.css';

const About = () => {
    return (
        <div className="about">
            <h3>Data Peserta Sanbercode Bootcamp ReactJS</h3>
            {/* <ol style={{ listStyle:"none" }}> */}
                <li><strong>Nama: </strong> Abdullah Ibnu Hasan</li>
                <li><strong>Email: </strong> abdullah.ibnu.h@gmail.com</li>
                <li><strong>Sistem Operasi yang digunakan: </strong> <a href="https://support.apple.com/kb/DL2048?locale=id_ID" target="_blank" rel="noopener noreferrer">macOS 10.15.6</a> </li>
                <li><strong>Akun Github: </strong> <a href="http://github.com/inuinsane" target="_blank" rel="noopener noreferrer">inuinsane</a> </li>
                <li><strong>Akun Telegram: </strong> @abdullahibnuhasan</li>
            {/* </ol> */}
        </div>
    )
}


export default About;