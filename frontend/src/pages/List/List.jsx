import React, { useState, useEffect } from 'react'
import './List.css'
import axios from 'axios';
import { toast } from 'react-toastify';

const List = ({ url }) => {

    // let url = "http://127.0.0.8:4080"; It's passing through props from App.jsx component
    const [list, setList] = useState([]);

    const fetchList = async () => {
        const response = await axios.get(`${url}/api/file/list`)
        console.log(response.data);
        if (response.data.success) {
            setList(response.data.data)
        } else {
            toast.error("Error")
        }
    }

    const removeFile = async (foodId) => {
        // console.log(foodId);
        const response = await axios.post(`${url}/api/file/remove`, { id: foodId })
        await fetchList();
        if (response.data.success) {
            toast.success(response.data.message);
        } else {
            toast.error("Error")
        }
    }

    useEffect(() => {
        fetchList()
    }, [])

    return (
        <div className='list add flex-col'>
            <p>All Files List</p>
            <div className="list-table">
                <div className="list-table-formate title">
                    <b>Image</b>
                    <b>Name</b>
                    <b>File Type</b>
                    <b>Action</b>
                </div>
                {list.map((item, index) => {
                    return (
                        <div key={index} className='list-table-formate' >
                            <img src={`${url}/files/` + item.file} alt="" />
                            <p>{item.name}</p>
                            <p>{item.type}</p>
                            <p onClick={() => removeFile(item._id)} className='cursor'>x</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default List