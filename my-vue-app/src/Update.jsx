import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

const Update = () => {
    const [values, setValues] = useState({
        name:'',
        age: '',
        gender:'',
        phone:''
    });

    // const [read, setRead] = useState([]);
    const { id } = useParams();
    useEffect(() => {
        axios.get("http://localhost:3000/students/"+id)
            .then((response) => setValues(response.data))
            .catch((error) => console.log(error));
    },[])

    const naviGate = useNavigate();

    const handleUpdate = (e) =>{
        e.preventDefault();
        axios.put(`http://localhost:3000/students/`+id, values)
        .then((response) => {
            console.log(response)
            naviGate('/');
        })
        .catch((error) => console.log(error));
    }

    return (
        <div className='d-flex w-100 vh-100 align-items-center justify-content-center rounded bg-light border shadow p-4'>
            <div className='w-50 border bg-white shadow px-5 pt-3 pb-5 rounded'>
                <h1>Update the Student</h1>
                <form onSubmit={handleUpdate}>
                    <div>
                        <label htmlFor="name">Name</label>
                        <input type="text" name='name' className='form-control' placeholder='Enter Name' value={values.name}
                        onChange={(e)=>setValues({...values,name:e.target.value})}/>
                    </div>
                    <div>
                        <label htmlFor="age">Age</label>
                        <input type="text" name='age' className='form-control' placeholder='Enter Age' value={values.age}
                        onChange={(e)=>setValues({...values,age:e.target.value})}/>
                    </div>
                    <div>
                        <label htmlFor="gender">Gender</label>
                        <input className='form-control' name='gender' value={values.gender}
                                onChange={(e)=>setValues({...values,gender:e.target.value})} placeholder="Enter Gender">
                        </input>
                    </div>
                    <div>
                        <label htmlFor="phone">Phone</label>
                        <input type="text" name='phone' className='form-control' placeholder='Enter Phone' value={values.phone}
                        onChange={(e)=>setValues({...values,phone:e.target.value})}/>
                    </div>
                    <div className="d-flex justify-content-end mt-2">
                        <button className='btn btn-success'>Update</button>
                        <Link to='/' className='btn btn-primary ms-3'>Back</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Update;