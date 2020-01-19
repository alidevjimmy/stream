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

const ChangePhone = () => {
    const classes = useStyle()
    const [errors, setErrors] = useState('')
    const [successes, setSuccesses] = useState('')
    const [phone, setPhone] = useState(JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).phone : null)
    const [submitLoading, setSubmitLoading] = useState(false)
    const [submitLoadingAgain, setSubmitLoadingAgain] = useState(false)
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
    const [redirect , setRedirect] = useState(false)

    let errs = []
    const HandleForm = e => {
        e.preventDefault()
        errs = []
        if (phone != null && phone != '') {
            setSubmitLoading(true)
            axios.post(`${URL}/changephone`, {
                phone: phone
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${JSON.parse(localStorage.getItem('user')).access_token}`
                }
            })
                .then(res => {
                    if (res.status == 200) {
                        if (res.data.status == 'success') {
                            user.phone = phone
                            localStorage.setItem('user', JSON.stringify(user))
                            sessionStorage.setItem('status', 'success')
                            sessionStorage.setItem('message', 'شماره شما تغییر کرد و کد تایید نیز ارسال شد')
                            setRedirect(true)
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

    if (user != null) {
        if (user.active == 0) {
            return (
                <React.Fragment>
                    {redirect ? <Redirect to='/verification' /> : null}
                    <Message/>
                    <Container className={classes.filterContainer} fixed
                               style={{marginTop: '60px', marginBottom: '10px', width: '400px'}}>
                        <h3 align='center' style={{margin: '10px 5px'}}>تغییر شماره</h3>
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
                            <input type="text"
                                   className={phone != '' ? classes.textBox : classes.textFieldErr}
                                   value={phone}
                                   onChange={e => {
                                       setPhone(e.target.value)
                                   }} placeholder='شماره تلفن خود را وارد کنید'/>
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
                                    style={{color: 'white', width: '25px', height: '25px'}}/> : 'اعمال تغییر'}
                            </Button>

                        </form>
                    </Container>

                </React.Fragment>
            )
        }
        return <Redirect to={localStorage.getItem('redirect')}/>
    }
    return <Redirect to='/login'/>
}

export default ChangePhone
