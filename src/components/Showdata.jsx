import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

function Showdata() {
    // let pos= useParams()
    const [list, setlist] = useState([])
    useEffect(() => {
        // console.log(pos);
        axios.get("http://localhost:3000/user")
            .then((res) => {
                setlist(res.data)
            })
    }, [setlist])
    // console.log(list);
    

    // let remove=(id)=>{
    //     let removedata=list.filter((val,i)=>{
    //         return id!=i
    //     })
    //     setlist(removedata)     
    //      axios.delete(`http://localhost:3000/user/${id}`) 
    //     .then((res)=>{
    //         console.log("deleted" ,res.data); 
    //         let removedata=list.filter((val,i)=>{
    //            return  id!=res.data.id
    //         })
    //         setlist(removedata)
    //     }) 
    // }

    // let remove=(val,i)=>{
    //     list.map(async(value,i)=>{
    //         console.log(val.id);
    //         await axios.delete("http://localhost:3000/user/"+val.id)
    //     }) 
    //     setlist(list.filter((valu,i)=>{
    //         return val.id!=valu.id
    //     }))
    // }
    let remove=(val,i)=>{
        axios.delete("http://localhost:3000/user/"+val.id)
        setlist(list.filter((valu,i)=>{
            return val.id!=valu.id
        }))
    }

    return (
        <>
            <table align='center' className='border-2 mt-10'>
                <tr className='border-2'>
                    <th className='border-2 p-2'>Name</th>
                    <th className='border-2 p-2'>Email</th>
                    <th className='border-2 p-2'>Password</th>
                    <th className='border-2 p-2'>Actions</th>
                </tr>
                {list.map((val, i) => {
                    return (
                        <tr>
                            <td className='text-gray-600 border-2 px-3'>{val.name}</td>
                            <td className='px-3 border-2'>{val.email}</td>
                            <td className='px-3 border-2'>{val.password}</td>
                            <td className='px-3 border-2'>
                                <button onClick={()=>{remove(val,val.id)}} className='bg-red-600 px-2 py-1 rounded text-white mx-1'>delete</button>
                                <Link to={"/editdata/"+val.id} className='bg-green-600 px-2 py-1 rounded text-white mx-1'>edit data</Link>
                            </td> 
                        </tr>
                    )
                })
                } 
            </table>
            <div className='text-center mt-4 me-36'>
            <Link to={"/"} className='text-white px-3 py-2 bg-blue-800 mx-auto'>- Go Back</Link>
            </div>
        </>
    )
}

export default Showdata