import React, {useEffect, useState} from 'react'
import {Container, Button, makeStyles} from '@material-ui/core'
import axios from "axios";
import URL from "../url";
import Alert from '@material-ui/lab/Alert'
import CircularProgress from '@material-ui/core/CircularProgress'

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
    const [code, setCode] = useState(null)
    const [submitLoading , setSubmitLoading] = useState(false)
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
                code : code
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization" : `Bearer ${JSON.parse(localStorage.getItem('user')).access_token}`
                }
            })
                .then(res => {
                    if (res.status == 200) {
                        if (res.data.status == 'success') {
                            localStorage.setItem('user', JSON.stringify(res.data.user));
                        }
                        else{
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
    return (
        <React.Fragment>
            <Container className={classes.filterContainer} fixed
                       style={{marginTop: '60px', marginBottom: '10px', width: '400px'}}>
                <h3 align='center' style={{margin: '10px 5px'}}>تایید حساب کاربری</h3>
                {
                    errors.length > 0 ? <div><Alert severity="error">
                        <ul>
                            {errors}
                        </ul>
                    </Alert><br/></div> : <div></div>
                }
                <form className={classes.root} noValidate autoComplete="off">
                    <input type="number" style={{ textAlign : 'center' , fontSize : '18px' }} className={code != '' ? classes.textBox : classes.textFieldErr}
                           onChange={e => {
                               setCode(e.target.value)
                           }} placeholder="کد تایید را وارد کنید"/>
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
                        {submitLoading ? <CircularProgress style={{ color : 'white' , width : '25px' , height : '25px'}} /> : 'تایید'}
                    </Button>

                </form>
            </Container>
        </React.Fragment>
    )
}

export default Verification
