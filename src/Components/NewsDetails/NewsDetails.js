import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import LayOut from '../../Shared/LayOut/LayOut';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing(0, 1),
        marginTop: "100px",
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    }
}))

const NewsDetails = () => {
    const classes = useStyles()
    const id = useParams()
    console.log(id)

    const [readNews, setReadNews] = useState([])

    useEffect(() => {
        fetch('https://dry-eyrie-42597.herokuapp.com/news')
            .then(res => res.json())
            .then(data => {
                const news = data.find(pd => {
                    return pd._id === id.id
                })
                setReadNews(news)
            })
    }, [])

    return (
        <LayOut>
            <section className={classes.toolbar}>
               <Grid container spacing={0}>
                    <Grid item xs = {9}>
                        <img src={readNews.image} style = {{width: '100%'}} alt={readNews.title} />
                        <Typography variant="h3">
                            {readNews.title}
                        </Typography>
                        <Typography>
                            {
                                readNews.description
                            }
                        </Typography>
                        <Typography>
                            {
                                readNews.author
                            }
                        </Typography>
                
                    </Grid>
               </Grid>
            </section>
        </LayOut>
    );
};

export default NewsDetails;