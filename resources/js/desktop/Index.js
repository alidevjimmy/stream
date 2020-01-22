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
import {Link} from 'react-router-dom'
import Message from "./Message";
import CircularProgress from '@material-ui/core/CircularProgress'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';


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

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const BookMarkButton = (props) => {
    const classes = useStyles()
    const [selected, setSelected] = useState(props.selected)
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleFilterClick = () => {
        if (localStorage.getItem('user')) {
            setLoading(true);
            if (!selected) {
                axios.post(`${URL}/bookmark`, {
                    ad_id: props.data.id
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${JSON.parse(localStorage.getItem('user')).access_token}`
                    }
                })
                    .then(res => {
                        if (res.data.status == 'success') {
                            setLoading(false)
                            setSelected(true)
                        }
                        // else{
                        //     setLoading(false)
                        //     sessionStorage.setItem('status' , 'success')
                        //     sessionStorage.setItem('message' , 'خطای')
                        // }
                    })
                    .catch(err => {
                        setLoading(false)
                        console.log('error')
                    })
            }
            else{
                axios.post(`${URL}/unBookmark`, {
                    ad_id: props.data.id
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${JSON.parse(localStorage.getItem('user')).access_token}`
                    }
                })
                    .then(res => {
                        if (res.data.status == 'success') {
                            setLoading(false)
                            setSelected(false)
                        }
                    })
                    .catch(err => {
                        setLoading(false)
                        console.log('error')
                    })
            }
        } else {
            handleClickOpen()
            localStorage.setItem('redirect', '/')
        }

    }

    return (
        <>
            <IconButton onClick={() => handleFilterClick()} aria-label="نشانه گذاری" className='on_focus'>
                {loading ? <CircularProgress style={{width: '23px', height: '23px', color: '#8e8e8e'}}/> : selected ?
                    <Bookmark style={{color: 'rgb(255, 145, 0)'}}/> : <BookmarkBorder/>}
            </IconButton>
            <div>
                <Dialog
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={() => setOpen(false)}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title">{"نشانه گذاری آگهی"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            برای نشانه گذاری آگهی باید <Link to='/login' className='orange_color'>وارد
                            شوید</Link> یا <Link to='/register' className='orange_color'>ثبت نام </Link> کنید.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpen(false)} color="inherit" className='orange_color'
                                style={{fontWeight: 'bold', color: '#ff9100'}}>
                            بستن
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </>
    )
}

const Index = () => {
    const classes = useStyles()
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true)
    const [failed, setFailed] = useState(false)
    const [bookMarked, setBookmarked] = useState([])

    useEffect(() => {
        if (localStorage.getItem('user')) {
            axios.get(`${URL}/advertisingsAuth`, {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${JSON.parse(localStorage.getItem('user')).access_token}`
                }
            })
                .then(res => {
                    if (res.data.status == 'success') {
                        setItems(res.data.data.data)
                        setBookmarked(res.data.bookMarked)
                    } else {
                        setFailed(true)
                    }
                    setLoading(false)
                })
                .catch(err => {
                    setFailed(true)
                })
        } else {
            axios.get(`${URL}/advertisings`, {
                headers: {
                    'Content-Type': 'application/json',
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
        }
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
                <br/>
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
                {/*<LoginAlert/>*/}
                <FilterBox/>
                <Message/>
                <Grid container className={classes.root} spacing={0}>

                    {items.map(item => {
                            return (
                                <Grid key={item.id} item xs={12} md={3} sm={6}>
                                    <Card className={classes.card}>
                                        <Link to={`/advertisings/${item.id}`} style={{textDecoration: 'none'}}>
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
                                                        {item.date} پیش
                                                    </Typography>
                                                }
                                                className='my_font'
                                            />
                                            <CardMedia
                                                style={{backgroundPosition: 'unset'}}
                                                className={classes.media}
                                                image={item.images.length > 0 ? `/image/${item.images[0]}` : '/images/photo_2020-01-12_00-46-00.png'}
                                                title={item.title}
                                            />
                                        </Link>
                                        <CardContent>
                                            {item.type == 'فروشی' ? ` ${item.price} تومان ` : ` ${item.type}`}
                                        </CardContent>
                                        <CardActions disableSpacing>
                                            <div style={{
                                                width: '100%',
                                                backgroundColor: '#e8e8e8',
                                                height: '1px',
                                            }}></div>

                                            <BookMarkButton data={item}
                                                            selected={bookMarked.includes(item.id) ? true : false}/>

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
