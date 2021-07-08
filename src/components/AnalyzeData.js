import axios from 'axios';
import React, { useState, useEffect } from 'react';

function AnalyzeData(props) {
    
    const [mounted, setMounted] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [id, setId] = useState(props.match.params.patientId);
    const [lastName, setLastName] = useState("");
    const [age, setAge] = useState(0);
    const [clinicalData, setClinicalData] = useState([]);

    if(!mounted){
        // Code for componentWillMount here
        // This code is called only one time before intial render
        axios.get("http://localhost:8088/clinicalservices/api/patients/analyze/" + props.match.params.patientId).then(res => {
            const {id, firstName, lastName, age, clinicalData} = res.data;
            setId(id);
            setFirstName(firstName);
            setLastName(lastName);
            setAge(age);
            setClinicalData(clinicalData);
        })
      }
    
    useEffect(() =>{
        setMounted(true)
      },[])


    return (
        <div>
            <h2>Patient Details:</h2>            
            First Name: {firstName}
            Last Name: {lastName}
            Age: {age}
            <h2>Clinical Reports: </h2>
            {clinicalData.map((eachEntry, idx) => <RowCreator item={eachEntry} patientId={id} key={idx} />)}
        </div>
    );
}

function RowCreator(props) {
    var eachEntry = props.item;
    // var patientId = props.patientId;
    return (
        <div>
            <table>
                <tr><td><b>{eachEntry.componentName}</b></td></tr>
                <tr><td>{eachEntry.componentName}</td></tr>
                <tr><td>{eachEntry.componentValue}</td></tr>
                <tr><td>{eachEntry.measuredDateTime}</td></tr>
            </table>
        </div>
    )
}

export default AnalyzeData;