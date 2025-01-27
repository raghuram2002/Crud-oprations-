import {useEffect, useState} from "react";
import axios from "axios";
import {Link, useParams} from "react-router-dom";

const Read = () => {

    const [read, setRead] = useState([]);
    const { id } = useParams();
    useEffect(() => {
        axios.get("http://localhost:3000/students/"+id)
            .then((response) => setRead(response.data))
            .catch((error) => console.log(error));
    },[])

    return (
        <div className='d-flex flex-column w-100 vh-100 align-items-center justify-content-center rounded bg-light border shadow p-4'>
            <h1 className='w-50 bg-primary mb-0 text-light text-center'>Student Details</h1>
            <div className='w-50 border bg-white shadow px-5 pt-3 pb-5 rounded'>
                <div className='d-flex flex-column'>
                    <strong>Name: {read.name}</strong>
                    <strong>Age: {read.age}</strong>
                    <strong>Gender: {read.gender}</strong>
                    <strong>Phone: {read.phone}</strong>
                </div>
                <div className='d-flex justify-content-end'>
                    <Link to={`/update/${id}`} className='btn btn-warning me-2'>Edit</Link>
                    <Link to='/' className='btn btn-primary'>Back</Link>
                </div>
            </div>
        </div>
    );
};
export default Read;