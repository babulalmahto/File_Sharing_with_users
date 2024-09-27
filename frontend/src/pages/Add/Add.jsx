import React, { useEffect, useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from "axios"
import { toast } from 'react-toastify'

const Add = ({ url }) => {
    // const url = "http://127.0.0.8:4080";
    const [file, setFile] = useState(false);
    const [data, setData] = useState({
        name: "",
        type: "JPG"
    });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }))
    }

    // useEffect(() => {
    //     console.log(data)
    // }, [data])

    // api call
    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("type", data.type);
        formData.append("file", file)

        // axios
        const response = await axios.post(`${url}/api/file/upload`, formData);
        if (response.data.success) {
            setData({
                name: "",
                type: "Salad"
            })
            setFile(false);
            toast.success(response.data.message)
        } else {
            toast.error(response.data.message);
        }
    }
    console.log(file)

    return (
        <div className='add'>
            <form className='flex-col' onSubmit={onSubmitHandler}>
                <div className="add-image-upload flex-col">
                    <p>Upload Image</p>
                    <label htmlFor="image">
                        <img src={file ? URL.createObjectURL(file) : assets.upload_area} alt="" />
                    </label>
                    <input onChange={(e) => setFile(e.target.files[0])} type="file" id='image' hidden required />
                </div>
                <div className="add-product-name flex-col">
                    <p>Product Name</p>
                    <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type here' />
                </div>
                <div className="add-category-price">
                    <div className="add-category flex-col">
                        <p>File Type</p>
                        <select onChange={onChangeHandler} name="type">
                            <option value="JPG">JPG</option>
                            <option value="PDF">PDF</option>
                            <option value="GIF">GIF</option>
                            <option value="PNG">PNG</option>
                            <option value="TXT">TXT</option>
                            <option value="DOCX">DOCX</option>
                            <option value="DIF">DIF</option>
                        </select>
                    </div>
                </div>
                <button type='submit' className='add-btn'>Upload</button>
            </form>
        </div>
    )
}

export default Add