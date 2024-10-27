import axios from 'axios'
import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
// import { toast } from 'react-toastify'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Form() {
    const [data, setdata] = useState({})
    let navigate = useNavigate()
    const [error, seterror] = useState({})

    let setinput = (e) => {
        let name = e.target.name
        let value = e.target.value
        setdata({ ...data, [name]: value })

    }
    let validateData = () => {
        let err = {}
        if (!data.name) {
            err.name = "enter name"
        }
        if (!data.email) {
            err.email = "enter email"
        }
        if (!data.password) {
            err.password = "enter password"
        }
        return err
    }
    // console.log(data);
    let handlesubmit = (e) => {
        e.preventDefault()
        let validation = validateData()
        if (Object.keys(validation).length > 0) {
            let newerr = validation
            seterror(newerr)
            console.log(newerr);
            {
                newerr.name &&
                toast.error(`${newerr.name}`)
            }
            {
                newerr.email &&
                toast.error(`${newerr.email}`)
            }
            {
                newerr.password &&
                toast.error(`${newerr.password}`)
            }
        }
        else {
            axios.post("http://localhost:3000/user", data)
                .then((res) => {
                    if (res) {
                        toast.success("data submitted successfuly")
                        setTimeout(() => {
                            navigate("/showdata")
                        }, 2000)
                    }
                }).catch((err) => {
                    console.log(err);
                })
            setdata({})
        }

    }

    return (
        <>

            <div className="bg-white rounded-lg shadow-md p-8 w-full mx-auto my-16 max-w-md">
            <h1 className='text-2xl mb-4'>Add Data</h1>
            <div style={{ textAlign: 'center' }}>
                <Link style={{ textAlign: "center" }} to={"/showdata"} className='bg-blue-300 rounded text-white px-2 py-1'>Show data</Link>
            </div>
                <form method='post' onSubmit={(e) => { handlesubmit(e) }}>
                    <div className="mb-4">
                        <label for="name" className="block text-sm font-medium text-gray-600">Name</label>
                        <input type="text" className="mt-1 p-2 w-full border rounded-md text-gray-800" name='name' value={data.name ? data.name : ""} onChange={(e) => { setinput(e) }} />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-600">Email</label>
                        <input type="email" className="mt-1 p-2 w-full border rounded-md text-gray-800" name='email' value={data.email ? data.email : ""} onChange={(e) => { setinput(e) }}  />
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-600">Password</label>
                        <input type="password"  className="mt-1 p-2 w-full border rounded-md text-gray-800" name='password' value={data.password ? data.password : ""} onChange={(e) => { setinput(e) }}/>
                    </div>
                    <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Submit</button>
                </form>
            </div>
            <ToastContainer />
        </>
    )
}

export default Form