import React, {useState, useEffect} from 'react'
import {makeStyles, Container, Button} from '@material-ui/core'
import {Alert} from '@material-ui/lab'
import axios from 'axios'
import URL from "../url";
import CircularProgress from '@material-ui/core/CircularProgress'
import {Redirect} from 'react-router-dom'
import {Link} from 'react-router-dom'

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

const Login = () => {
    const classes = useStyle()
    const [stuNumber, setStuNumber] = useState(null)
    const [password, setPassword] = useState(null)
    const [errors, setErrors] = useState([])
    ///////////////////////////////////////////////////////
    const [open, setOpen] = useState('');
    const [options, setOptions] = useState([]);
    const [redirect, setRedirect] = useState(false)
    const [submitLoading , setSubmitLoading] = useState(false)
    const loading = open && options.length === 0;
    let errs = [];
    const HandleForm = e => {
        e.preventDefault()
        errs = []
        if (stuNumber == null) {
            setStuNumber('')
        }
        if (password == null) {
            setPassword('')
        }
        if (stuNumber != null && stuNumber != '' &&
            password != null && password != ''
        ) {
            setSubmitLoading(true)
            axios.post(`${URL}/login`, {
                stu_number: stuNumber,
                password: password,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then(res => {
                    if (res.status == 200) {
                        if (res.data.status == 'success') {
                            res.data.user['access_token'] = res.data.access_token
                            localStorage.setItem('user', JSON.stringify(res.data.user));
                            if (res.data.user.active == 1){
                                sessionStorage.setItem('status' , 'success')
                                sessionStorage.setItem('message' , 'شما با موفقیت وارد شدید')
                            }
                            else {
                                sessionStorage.setItem('status' , 'success')
                                sessionStorage.setItem('message' , 'کد فعالسازی برای شما ارسال شد')
                            }
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

    const onChange = () => {
        console.log('recaptcha changed')
    }

    return (
        <React.Fragment>
            {JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).active == 1 ? <Redirect to={localStorage.getItem('redirect')}/> : <Redirect to='/verification'/> : null}
            <Container className={classes.filterContainer} fixed
                       style={{marginTop: '60px', marginBottom: '5px', width: '400px'}}>
                <h3 align='center' style={{margin: '10px 5px'}}>ورود</h3>
                <div style={{ width : '100%',height:'1px',backgroundColor : '#efefef' }}></div>
                <br/>
                {
                    errors.length > 0 ? <div><Alert severity="error">
                        <ul>
                            {errors}
                        </ul>
                    </Alert><br/></div> : <div></div>
                }
                <form className={classes.root} noValidate autoComplete="off">
                    <span style={stuNumber != '' ? {color: '#8e8e8e'} : {color: '#ef5662'}}>شماره دانشجویی</span>
                    <input type="text" className={stuNumber != '' ? classes.textBox : classes.textFieldErr}
                           onChange={e => {
                               setStuNumber(e.target.value)
                           }} placeholder="شماره دانشجویی خود را وارد کنید..."/>
                    <span style={password != '' ? {color: '#8e8e8e'} : {color: '#ef5662'}}>رمز</span>
                    <input type="password" className={password != '' ? classes.textBox : classes.textFieldErr}
                           onChange={e => {
                               setPassword(e.target.value)
                           }} placeholder="رمز خود را وارد کنید..."/>
                    {/*<ReCAPTCHA*/}
                    {/*    sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"*/}
                    {/*    onChange={onChange}*/}
                    {/*/>*/}
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
                        {submitLoading ? <CircularProgress style={{ color : 'white' , width : '25px' , height : '25px'}} /> : 'ورود'}
                    </Button>
                    <br/>
                    <div style={{ width : '100%',height:'1px',backgroundColor : '#efefef' }}></div>
                    <div style={{ width : '95%' }}>
                        <Link to='/register' style={{ textDecoration : 'none',fontWeight : 'bold',fontSize:'14px', width : '100%' }}>
                            <Button style={{
                                color: '#8e8e8e',
                                width: '100%',
                                marginTop: '10px',
                                fontWeight : 'bold',fontSize:'14px'
                            }}
                                    color="inherit">حساب کاربری ندارید؟ ثبت نام کنید</Button>
                        </Link>
                    </div>
                </form>
            </Container>
        </React.Fragment>
    )
}

export default Login
