import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {

    const [mounted, setMounted] = useState(false);
    const [patientData, setPatientData] = useState([]);

    if(!mounted){
        // Code for componentWillMount here
        // This code is called only one time before intial render
        axios.get("http://localhost:8088/clinicalservices/api/patients").then(res => {
            const patientData = res.data;
            setPatientData(patientData);
        })
      }
    
      useEffect(() =>{
        setMounted(true)
      },[])

    return (
        <div>
            <h2>Patient:</h2>
            <table align="center">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Age</th>
                    </tr>
                </thead>
                <tbody>
                    {patientData.map((patient, idx) =><RowCreator item={patient} key={idx} />)}
                </tbody>
                
            </table>
            <Link to='/addPatient'><font size="5">Register Patient</font></Link>
        </div>
    );
}

function RowCreator(props) {
    var patient = props.item;
    return (
        <tr>
            <td>{patient.id}</td>
            <td>{patient.firstName}</td>
            <td>{patient.lastName}</td>
            <td>{patient.age}</td>
            <td><Link to={'patientDetails/' + patient.id}>Add Data</Link></td>
            <td><Link to={'analyze/' + patient.id}>Analyze</Link></td>
        </tr>
    );
}

export default Home;