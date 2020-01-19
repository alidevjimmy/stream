import React, {useEffect, useState} from 'react'
import {Container, Button, makeStyles} from '@material-ui/core'
import axios from "axios";
import URL from "../url";
import Alert from '@material-ui/lab/Alert'
import CircularProgress from '@material-ui/core/CircularProgress'
import {Redirect} from 'react-router-dom'
import Message from "./Message";
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

const Verification = () => {
    const classes = useStyle()
    const [errors, setErrors] = useState('')
    const [successes, setSuccesses] = useState('')
    const [code, setCode] = useState(null)
    const [submitLoading, setSubmitLoading] = useState(false)
    const [submitLoadingAgain, setSubmitLoadingAgain] = useState(false)
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))

    let errs = []
    const HandleForm = e => {
        e.preventDefault()
        errs = []
        if (code == null) {
            setCode('')
        }
        if (code != null && code != '') {
            setSubmitLoading(true)
            axios.post(`${URL}/verification`, {
                code: code
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${JSON.parse(localStorage.getItem('user')).access_token}`
                }
            })
                .then(res => {
                    if (res.status == 200) {
                        if (res.data.status == 'success') {
                            user.active = 1
                            localStorage.setItem('user', JSON.stringify(user))
                            sessionStorage.setItem('status', 'success')
                            sessionStorage.setItem('message', 'حساب کاربری شما با موفقیت تایید شد')
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

    const sendAgain = () => {
        axios.post(`${URL}/sendcode` , {} , {
            headers : {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${JSON.parse(localStorage.getItem('user')).access_token}`
            }
        }).then(res => {
            if (res.data.status == 'success'){
                setSuccesses(res.data.message)
                setErrors('')
            }else {
                setErrors(res.data.message)
                setSuccesses('')
            }
            setSubmitLoadingAgain(false)
        }).catch(err => {
            // console.log(`err = ${err}`)
            setSubmitLoadingAgain(false)
        })
    }

    if (user != null) {
        if (user.active == 0) {
            return (
                <React.Fragment>
                    <Message/>
                    <Container className={classes.filterContainer} fixed
                               style={{marginTop: '60px', marginBottom: '10px', width: '400px'}}>
                        <h3 align='center' style={{margin: '10px 5px'}}>تایید حساب کاربری</h3>
                        <div style={{ width : '100%',height:'1px',backgroundColor : '#efefef' }}></div>
                        <br/>
                        {
                            errors.length > 0 ? <div><Alert severity="error">
                                <ul>
                                    {errors}
                                </ul>
                            </Alert><br/></div> : <div></div>
                        }
                        {
                            successes.length > 0 ? <div><Alert severity="success">
                                <ul>
                                    {successes}
                                </ul>
                            </Alert><br/></div> : <div></div>
                        }
                        <form className={classes.root} noValidate autoComplete="off">
                            <input type="number" style={{textAlign: 'center', fontSize: '18px'}}
                                   className={code != '' ? classes.textBox : classes.textFieldErr}
                                   onChange={e => {
                                       setCode(e.target.value)
                                   }} placeholder="-- -- -- --"/>
                            <small style={{ fontSize : '12px' , fontWeight : 'bold' , color : '#8e8e8e' }}>
                                کد تایید برای شماره <small style={{ fontSize : '12px' , fontWeight : 'bold' , color : '#ff6f00' }}> { JSON.parse(localStorage.getItem('user')).phone } </small> ارسال خواهد شد
                            </small>
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
                                    style={{color: 'white', width: '25px', height: '25px'}}/> : 'تایید'}
                            </Button>

                            {/*<Button*/}
                            {/*    style={{color: '#ff9100', width: '95%', marginTop: '10px', textDecoration: 'underline'}}*/}
                            {/*    color="inherit">ارسال مجدد*/}
                            {/*    onClick={sendAgain}*/}
                            {/*</Button>*/}

                            {/*/////////////////////////////////// CHANGE NUMBER ///////////////////////////////////////*/}

                        </form>
                        <br/>
                        <div style={{ width : '100%',height:'1px',backgroundColor : '#efefef' }}></div>
                        <div style={{ display : 'flex' }}>
                            <Button
                                disabled={submitLoadingAgain ? true : false}
                                onClick={() => sendAgain()}
                                style={{color: '#8e8e8e', width: '50%', marginTop: '10px' , fontWeight : 'bold',fontSize:'14px'}}
                                color="inherit">
                                {submitLoadingAgain ? <CircularProgress
                                    style={{color: '#8e8e8e', width: '25px', height: '25px'}}/> : 'درخواست کد جدید'}</Button>
                            <div style={{ width : '1px',height:'100%',backgroundColor : '#efefef' }}></div>
                            <Link to='/changephone' style={{ textDecoration : 'none',fontWeight : 'bold',fontSize:'14px', width : '50%' }}>
                                <Button style={{
                                    color: '#8e8e8e',
                                    width: '100%',
                                    marginTop: '10px',
                                    fontWeight : 'bold',fontSize:'14px'
                                }}
                                        color="inherit">تغییر شماره</Button>
                            </Link>
                        </div>
                    </Container>

                </React.Fragment>
            )
        }
        return <Redirect to={localStorage.getItem('redirect')}/>

    }
    return <Redirect to='/login'/>
}

export default Verification
