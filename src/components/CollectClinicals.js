import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

function CollectClinicals(props) {

    const [mounted, setMounted] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [age, setAge] = useState(0);
    const [componentName, setComponentName] = useState("");
    const [componentValue, setComponentValue] = useState("");

    if(!mounted){
        // Code for componentWillMount here
        // This code is called only one time before intial render
        axios.get("http://localhost:8088/clinicalservices/api/patients/" + props.match.params.patientId).then(res => {
            const {firstName, lastName, age} = res.data;
            setFirstName(firstName);
            setLastName(lastName);
            setAge(age);
        })
      }
    
    useEffect(() =>{
        setMounted(true)
      },[])

    const handleSubmit = event => {
        event.preventDefault();
        const data = {
            patientId: props.match.params.patientId,
            componentValue: componentValue,
            componentName: componentName,
        };
        axios.post("http://localhost:8088/clinicalservices/api/clinicals/", data).then(res => {
            toast("Patient Data Saved Successfully!", { autoClose: 2000, position: toast.POSITION.BOTTOM_CENTER })
        })
    }

    return (
        <div>
            <h2>Patient Details:</h2>
            First Name: {firstName}
            Last Name: {lastName}
            Age: {age}
            <h2>Patient Clinical Data: </h2>
            <form>
                Clinical Entry Type: 
                <select onChange={event => setComponentName(event.target.value)}>
                    <option>Select One</option>
                    <option value="bp">Blood Pressure (Sys/Dys)</option>
                    <option value="hw">Height/Weight</option>
                    <option value="heartRate">Heart Rate</option>
                </select>
                Value: <input type="text" name="componentValue" value={componentValue} onChange={event => setComponentValue(event.target.value)} />
                <button onClick={handleSubmit}>Confirm</button>
            </form>
            <Link to={'/'}>Go Back</Link>
        </div>
    );
}

export default CollectClinicals;