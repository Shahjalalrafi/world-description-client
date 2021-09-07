import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";

const AddService = () => {

    const [image, setImage] = useState(null)
    const history = useHistory()

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => {
        const formData = {
            title: data.title,
            description: data.description,
            author: data.author,
            category: data.category,
            image: image
        }
        console.log(formData)

        fetch('http://localhost:5000/news', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(res => {
            alert('service added succes')
            history.push('/')

        })
    };

    const handleFile = (e) => {
        console.log(e.target.files[0])
        const imageData = new FormData()
        imageData.set('key', 'e5e7c3fd0f17a3470da9a5f0de336257')
        imageData.append('image', e.target.files[0])

        axios.post('https://api.imgbb.com/1/upload', imageData)
            .then(response => {
                console.log(response)
                setImage(response.data.data.display_url);
            })
            .catch(err => console.log(err))
    }


    return (
        <section>
            <div>
                <h2>Add your service</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input placeholder="Title" {...register("title")} />
                    <input placeholder="Description" {...register("description")} />
                    <input placeholder="Author Name" {...register("author")} />
                    <input placeholder="Category" {...register("category")} />
                    <div >
                        <label name="file" >File</label>
                        <input type="file" name="file" {...register("image")} onChange={handleFile} />
                    </div>

                    <input style={{backgroundColor: 'black', color:'white'}} type="submit" />
                </form>
               
            </div>
        </section>
    );
};

export default AddService;