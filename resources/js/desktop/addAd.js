import React, {useState, useEffect} from 'react'
import {makeStyles, Container, Button} from '@material-ui/core'
import {Alert} from '@material-ui/lab'
import axios from 'axios'
import URL from "../url";
import CircularProgress from '@material-ui/core/CircularProgress'
import {Redirect} from 'react-router-dom'
import {Link} from 'react-router-dom'
import Message from "./Message";
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
// import ImagesUploader from 'react-images-uploader';


const useStyle = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: 200,
        },
    },
    filterContainer: {
        border: '1px solid #efefef',
        padding: '5px'
    },
    textBox: {
        width: '95%',
        padding: '7px 10px',
        borderRadius: '7px',
        border: '1px solid #8e8e8e',
        borderRight: '3px solid rgb(255, 145, 0)',
        fontSize: '14px',
        fontWeight: 700,
        '&:focus': {
            outline: '0',
        }
    },
    lableErr: {
        color: '#ef5662'
    },
    textFieldErr: {
        width: '95%',
        padding: '7px 10px',
        borderRadius: '7px',
        fontSize: '14px',
        fontWeight: 700,
        border: '1px solid #ef5662',
        borderRight: '3px solid #ef5662',
    },
    error: {
        color: '#ef5662',
        display: 'block',
        fontSize: '12px',
        margin: theme.spacing(0, 1, 1, 0),
        fontWeight: 700
    },
    notchedOutline: {
        borderWidth: "1px",
        borderColor: "yellow !important"
    }
}))

const AddAd = () => {
    const classes = useStyle()
    const [title, setTitle] = useState(null)
    const [description, setDescription] = useState(null)
    const [category_id, setCategory_id] = useState(null)
    const [address, setAddress] = useState(null)
    const [price, setPrice] = useState(null)
    const [images, setImages] = useState([])
    const [errors, setErrors] = useState([])
    ///////////////////////////////////////regist////////////////
    const [open, setOpen] = useState('');
    const [options, setOptions] = useState([]);
    const [submitLoading, setSubmitLoading] = useState(false)
    const loading = open && options.length === 0;
    const [checked, setChecked] = React.useState(false);
    let errs = [];

    const handleChange = event => {
        setChecked(event.target.checked);
    };

    const HandleForm = e => {
        e.preventDefault()
        errs = []
        if (title == null) {
            setTitle('')
        }
        if (description == null) {
            setDescription('')
        }
        if (category_id == null) {
            setCategory_id('')
        }
        if (address == null) {
            setAddress('')
        }
        if (price == null) {
            setPrice('')
        }
        if (title != null && title != '' &&
            description != null && description != '' &&
            price != null && price != '' &&
            category_id != null && category_id != '' &&
            address != null && address != ''
        ) {
            setSubmitLoading(true)
            axios.post(`${URL}/addAd`, {
                title: title,
                description: description,
                category_id: category_id,
                address: address,
                price: checked ? '' : price,
                type: checked ? 'توافقی' : 'فروشی',
                images: images
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then(res => {
                    if (res.status == 200) {
                        if (res.data.status == 'success') {
                            sessionStorage.setItem('status', 'success')
                            sessionStorage.setItem('message', 'آگهی ارسال شد و پس از تایید نمایش داده می شود')
                        } else {
                            setErrors(res.data.message)
                        }
                    }
                    setSubmitLoading(false)
                })
                .catch(err => {
                    for (let key in err.response.data.errors) {
                        errs.push(err.response.data.errors[key][0])
                    }
                    setErrors(errs)
                    setSubmitLoading(false)
                })

        }
    }

    React.useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    if (localStorage.getItem('user')) {
        if (JSON.parse(localStorage.getItem('user')).active == 1) {
            return (
                <React.Fragment>
                    <Message/>
                    <Container fixed
                               style={{marginTop: '60px', marginBottom: '10px'}}>
                        <Grid container spacing={2}>
                            <Grid className={classes.filterContainer} item lg>
                                <h3 align='center' style={{margin: '10px 5px'}}>مشخصات</h3>
                                <div style={{width: '100%', height: '1px', backgroundColor: '#efefef'}}></div>
                                <br/>
                                {
                                    errors.length > 0 ? <div><Alert severity="error">
                                        <ul>
                                            {errors}
                                        </ul>
                                    </Alert><br/></div> : <div></div>
                                }
                                <form className={classes.root} noValidate autoComplete="off">
                                    <span style={title != '' ? {color: '#8e8e8e'} : {color: '#ef5662'}}>عنوان</span>
                                    <input type="text" className={title != '' ? classes.textBox : classes.textFieldErr}
                                           onChange={e => {
                                               setTitle(e.target.value)
                                           }} placeholder="عنوان را وارد کنید..."/>
                                    <div style={{display: 'flex'}}>
                                        <span style={{color: '#8e8e8e', marginTop: '10px'}}>قیمت : </span>
                                        <Checkbox
                                            checked={checked}
                                            onChange={handleChange}
                                            value="primary"
                                            style={{color: '#ff9100'}}
                                            color='default'
                                        />
                                        <span style={{color: '#333', fontSize: '12px', marginTop: '14px'}}>توافقی</span>
                                    </div>
                                    {!checked ? <input type="number"
                                                       className={price != '' ? classes.textBox : classes.textFieldErr}
                                                       onChange={e => {
                                                           setPrice(e.target.value)
                                                       }} placeholder="قیمت را وارد کنید..."/> : null}
                                    <span
                                        style={description != '' ? {color: '#8e8e8e'} : {color: '#ef5662'}}>توضیحات</span>
                                    <textarea rows='5'
                                              className={description != '' ? classes.textBox : classes.textFieldErr}
                                              onChange={e => {
                                                  setDescription(e.target.value)
                                              }} placeholder="توضیحات را وارد کنید...">
                    </textarea>
                                    <Button
                                        onClick={e => HandleForm(e)}
                                        type='submit'
                                        disabled={submitLoading ? true : false}
                                        style={{
                                            backgroundColor: '#ff9100',
                                            color: 'white',
                                            fontWeight: 700,
                                            width: '95%'
                                        }}>
                                        {submitLoading ? <CircularProgress
                                            style={{color: 'white', width: '25px', height: '25px'}}/> : 'ثبت آگهی'}
                                    </Button>
                                </form>
                            </Grid>
                            <Grid className={classes.filterContainer} item lg>
                                <h3 align='center' style={{margin: '10px 5px'}}>افزودن تصویر</h3>
                                <div style={{width: '100%', height: '1px', backgroundColor: '#efefef'}}></div>
                            </Grid>
                        </Grid>
                    </Container>
                </React.Fragment>
            )
        }
        return (
            <React.Fragment>
                <Message/>
                <Container className={classes.filterContainer} fixed
                           style={{marginTop: '60px', marginBottom: '10px', width: '400px'}}>
                    <h3 align='center' style={{margin: '10px 5px'}}>ثبت آگهی</h3>
                    <div style={{ width : '100%',height:'1px',backgroundColor : '#efefef' }}></div>
                    <br/>
                    {
                        errors.length > 0 ? <div><Alert severity="error">
                            <ul>
                                {errors}
                            </ul>
                        </Alert><br/></div> : <div></div>
                    }
                    <Link to='/verification' style={{textDecoration: 'none'}}>
                        <Button
                            onClick={localStorage.setItem('redirect', '/addadvertising')}
                            type='submit'
                            disabled={submitLoading ? true : false}
                            style={{
                                backgroundColor: '#ff9100',
                                color: 'white',
                                fontWeight: 700,
                                width: '95%',
                            }}>
                            {submitLoading ? <CircularProgress
                                style={{color: 'white', width: '25px', height: '25px'}}/> : 'برای ثبت آگهی باید حساب کاربری خود را فعال کنید'}
                        </Button>
                    </Link>
                </Container>
            </React.Fragment>
        )
    }
    return (
        <React.Fragment>
            <Message/>
            <Container className={classes.filterContainer} fixed
                       style={{marginTop: '60px', marginBottom: '10px', width: '400px'}}>
                <h3 align='center' style={{margin: '10px 5px'}}>ثبت آگهی</h3>
                <div style={{ width : '100%',height:'1px',backgroundColor : '#efefef' }}></div>
                <br/>
                {
                    errors.length > 0 ? <div><Alert severity="error">
                        <ul>
                            {errors}
                        </ul>
                    </Alert><br/></div> : <div></div>
                }
                <Link to='/login' style={{textDecoration: 'none'}}>
                    <Button
                        onClick={localStorage.setItem('redirect', '/addadvertising')}
                        type='submit'
                        disabled={submitLoading ? true : false}
                        style={{
                            backgroundColor: '#ff9100',
                            color: 'white',
                            fontWeight: 700,
                            width: '95%',
                        }}>
                        {submitLoading ? <CircularProgress
                            style={{color: 'white', width: '25px', height: '25px'}}/> : 'برای ثبت آگهی باید وارد شوید'}
                    </Button>
                </Link>
            </Container>
        </React.Fragment>
    )
    }

    export default AddAd
