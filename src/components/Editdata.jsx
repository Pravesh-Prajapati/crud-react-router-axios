import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';

function Editdata() {
    let pos = useParams()
    let navigate = useNavigate()
    const [input, setinput] = useState({})

    useEffect(() => {
        console.log(pos.id);
        axios.get("http://localhost:3000/user/" + pos.id,)
            .then((res) => {
                setinput(res.data)
            })
    }, [setinput])

    let changeinput = (e) => {
        let name = e.target.name;
        let value = e.target.value
        setinput({ ...input, [name]: value })
    }

    let submitdata = (e) => {
        e.preventDefault()
        axios.put("http://localhost:3000/user/" + pos.id, input)
            .then((res) => {    
                if (res.data) {
                    toast.success("Updated successfully")
                    setTimeout(() => {
                        navigate("/showdata")
                    }, 2000);
                   
                    setinput({})
                }
            }).catch(() => {
                console.log("error");
                toast.error("Something Went Wrong")
            })
    }

    return (
        <>
            <div className="bg-white rounded-lg shadow-md p-8 w-full mx-auto my-16 max-w-md">
            <h1 className='text-2xl mb-4'>Edit Data</h1>
            <div style={{ textAlign: 'center' }}>
                <Link style={{ textAlign: "center" }} to={"/showdata"}>Show data</Link>
            
            </div>
                <form method='post' onSubmit={(e) => { submitdata(e) }}>
                    <div className="mb-4">
                        <label for="name" className="block text-sm font-medium text-gray-600">Name</label>
                        <input type="text" className="mt-1 p-2 w-full border rounded-md text-gray-800" name='name' value={input.name ? input.name : ""} onChange={(e) => { changeinput(e) }}  />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-600">Email</label>
                        <input type="email" className="mt-1 p-2 w-full border rounded-md text-gray-800" name='email' value={input.email ? input.email : ""} onChange={(e) => { changeinput(e) }} />
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-600">Password</label>
                        <input type="password"  className="mt-1 p-2 w-full border rounded-md text-gray-800" name='password' value={input.password ? input.password : ""} onChange={(e) => { changeinput(e) }}/>
                    </div>
                    <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Submit</button>
                </form>
            </div>
            <ToastContainer/>
        </>
    )
}

export default Editdata