import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

function AddPatient() {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [age, setAge] = useState(0);

    const handleSubmit = event => {
        event.preventDefault();
        const data = {
            firstName: firstName,
            lastName: lastName,
            age: age,
        }
        axios.post("http://localhost:8088/clinicalservices/api/patients", data).then(res => {
            toast("Patient added successfully!", { autoClose: 2000, position: toast.POSITION.BOTTOM_CENTER });
            event.preventDefault();
        })
    };

    return (
        <div>
            <h2>Create Patient:</h2>
            <form>
                First Name: <input type="text" name="firstName" value={firstName} onChange={event => setFirstName(event.target.value)}/>
                Last Name: <input type="text" name="lastName" value={lastName} onChange={event => setLastName(event.target.value)}/>
                age: <input type="text" name="age" value={age} onChange={event => setAge(event.target.value)}/>
                <button onClick={handleSubmit}>Confirm</button>
            </form>
            <Link to={'/'}>Go Back</Link>
        </div>
    )
}

export default AddPatient;