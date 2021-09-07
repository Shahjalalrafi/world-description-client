import React from 'react';
import { useForm } from "react-hook-form";

const MakeAdmin = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = data => {
        const formData = {
            email : data.email,
            password: data.password
        }
        console.log(formData)

        fetch("http://localhost:5000/make-admin", {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(res => res.json())
        .then(data => {
            if(data) {
                alert('admin added succesfully')
            }
        })
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="email">Email</label>
                <input className='form-control my-2' style={{ width: '300px' }} type="email" placeholder="Enter your admin email" {...register("email")} />
                <label htmlFor="password">password</label>
                <input className='form-control my-2' style={{ width: '300px' }} type="password" placeholder="Enter your admin email" {...register("password")} />

                <input type="submit" className='btn' style={{ backgroundColor: 'black', color: 'white' }} value="submit" />
            </form>
        </div>
    );
};

export default MakeAdmin;