import React, {useState, useEffect} from 'react'
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import '../styles/style.css'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import IndexSkeleton from "./skeletons/IndexSkeleton";
import FilterBox from "./FilterBox";
import axios from 'axios'
import Refresh from '@material-ui/icons/Refresh'
import CardActions from '@material-ui/core/CardActions';
import BookmarkBorder from '@material-ui/icons/BookmarkBorder';
import Bookmark from '@material-ui/icons/Bookmark';
import '../styles/style.css'
import URL from "../url";
import { Link } from 'react-router-dom'
import Message from "./Message";


const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: '100%',
        boxShadow: '0 0 0 #fff',
        border: '1px solid #efefef',
        borderRadius: 0,
        '&:hover': {
            boxShadow: '0 2px 17px 0 #ccc',
        },
    },
    media: {
        height: 190,
    },
}));


const BookMarkButton = (props) => {
    const classes = useStyles()
    const [selected, setSelected] = useState(false)

    const handleFilterClick = () => {
        setSelected(!selected);
    }

    return (
        <IconButton onClick={() => handleFilterClick()} aria-label="نشانه گذاری" className='on_focus'>
            {!selected ? <BookmarkBorder/> : <Bookmark style={{color: 'rgb(255, 145, 0)'}}/>}
        </IconButton>
    )
}

const Index = () => {
    const classes = useStyles()
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true)
    const [failed, setFailed] = useState(false)

    useEffect(() => {
        axios.get(`${URL}/advertisings`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (res.data.status == 'success') {
                    setItems(res.data.data.data)
                } else {
                    setFailed(true)
                }
                setLoading(false)
            })
            .catch(err => {
                setFailed(true)
            })
    }, [])

    if (loading) {
        return (
            <Container fixed className='content_margin' style={{paddingRight: 0, paddingLeft: 0}}>
                <FilterBox/>
                <IndexSkeleton/>
            </Container>
        )
    } else if (failed) {
        return (
            <Container fixed className='content_margin' style={{paddingRight: 0, paddingLeft: 0}}>
                <FilterBox/>
                <br/>t
                <center>
                    <IconButton style={{backgroundColor: '#ff9100', color: 'white'}} color="inherit">
                        <Refresh/>
                    </IconButton>
                </center>
            </Container>
        )
    } else {
        return (
                <Container fixed className='content_margin' style={{paddingRight: 0, paddingLeft: 0}}>
                    <FilterBox/>
                    <Message />
                    <Grid container className={classes.root} spacing={0}>

                        {items.map(item => {
                                return (
                                   <Grid key={item.id} item xs={12} md={3} sm={6}>
                                            <Card className={classes.card}>
                                                <Link to={`/advertisings/${item.id}`} style={{ textDecoration: 'none' }}>
                                                    <CardHeader
                                                        title={
                                                            <Typography variant='h6' component='h6' className='title_color'
                                                                        style={{fontWeight: 700, fontSize: '16px'}}>
                                                                {item.title.substring(0, 21) + '...'}
                                                            </Typography>
                                                        }
                                                        subheader={
                                                            <Typography component='span'
                                                                        style={{
                                                                            fontWeight: 500,
                                                                            fontSize: '12px',
                                                                            color: '#8e8e8e'
                                                                        }}>
                                                                دقیقه پیش{item.created_at}
                                                            </Typography>
                                                        }
                                                        className='my_font'
                                                    />
                                                    <CardMedia
                                                        style={{ backgroundPosition : 'unset' }}
                                                        className={classes.media}
                                                        image={`/image/${item.images[0]}`}
                                                        title={item.title}
                                                    />
                                                </Link>
                                                <CardContent>
                                                    {item.type == 'فروشی' ? ` ${item.price} هزار تومان ` : ` ${item.type}`}
                                                </CardContent>
                                                <CardActions disableSpacing>
                                                    <div style={{
                                                        width: '100%',
                                                        backgroundColor: '#e8e8e8',
                                                        height: '1px',
                                                    }}></div>

                                                    <BookMarkButton data={item}/>

                                                </CardActions>
                                            </Card>
                                        </Grid>
                                )
                            }
                        )}
                    </Grid>
                    <br/>
                </Container>
        )
    }
}

export default Index
