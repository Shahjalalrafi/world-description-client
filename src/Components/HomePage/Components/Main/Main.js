import React, { useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },

    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    image: {
        height: "200px"
    },
    title: {
        color: "#495057"
    },
    card: {
        backgroundColor: "#f1f3f5"
    },
    btn: {
        backgroundColor: '#22b8cf',
        color: 'white',
        margin: '0 auto 20px',
        '&:hover': {
            background: "#1098ad",
        }
    },
    description: {
        display: "-webkit-box",
        boxOrient: "vertical",
        lineClamp: 2,
        wordBreak: "break-all",
        overflow: "hidden"
    }
}));

const Main = () => {
    const classes = useStyles();
    const [news, setNews] = useState([])

    useEffect(() => {
        fetch('http://localhost:5000/news')
        .then(res => res.json())
        .then(data => setNews(data))
    }, [])
    console.log(news)

    return (
        <>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Grid container spacing={2}>
                    {
                        news.map(data => (
                            <Grid key= {data._id} item xs={12} md={3}>
                                <Card className={classes.card}>
                                    <CardActionArea>
                                        <CardMedia
                                            className={classes.image}
                                            component="img"
                                            alt="Contemplative Reptile"
                                            height="140"
                                            image={data.image}
                                            title="Contemplative Reptile"
                                        />
                                        <CardContent>
                                            <Typography className={classes.title} gutterBottom variant="h5" component="h2">
                                                {data.title}
                                            </Typography>
                                            <Typography className={classes.description} variant="body2" color="textSecondary" component="p">
                                                {data.description}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions>
                                        <Button className={classes.btn} variant="contained" >
                                            view more
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))
                    }

                </Grid>
            </main>
        </>
    );
};

export default Main;