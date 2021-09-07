import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { Grid } from '@material-ui/core';

const useStyles = makeStyles({
    heading: {
        fontSize: "28px",
        fontWeight: "700",
        textTransform: "uppercase",
        color: "#22b8cf",
        marginLeft: "10px"
    },
    inputField: {
        width: '90%',
        padding: '15px 10px',
        margin: '10px 20px',
        borderRadious: '9px',
        border: '1px solid #22b8cf'
    },
    btn: {
        backgroundColor: "#22b8cf",
        color: 'white',
        border: 'none',
        padding: '12px 28px',
        marginLeft: "10px",
        borderRadius: "9px",
        cursor: "pointer" 
    },
    fileField: {
        marginLeft: "10px",
    },
    imageField: {
        color: 'white',
        backgroundColor: "#22b8cf"
    }
})

const AddService = () => {
    const classes = useStyles()
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

        fetch('https://dry-eyrie-42597.herokuapp.com/news', {
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
        <section style = {{marginTop: "100px"}}>
            <div>
                <h2 className ={classes.heading}>Add Another News</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container>
                        <Grid xs={12}>
                            <div className={classes.fileField} >
                                <label name="file" >File</label>
                                <input className={classes.imageField} type="file" name="file" {...register("image")} onChange={handleFile} />
                            </div>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <input className={classes.inputField} placeholder="Title" {...register("title")} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <input className={classes.inputField} placeholder="Description" {...register("description")} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <input className={classes.inputField} placeholder="Author Name" {...register("author")} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <input className={classes.inputField} placeholder="Category" {...register("category")} />
                        </Grid>
                    </Grid>
                    <input className={classes.btn} type="submit" />
                </form>

            </div>
        </section>
    );
};

export default AddService;