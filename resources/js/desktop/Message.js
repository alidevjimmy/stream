import React, {useState} from "react";
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Message = () => {
    const [open, setOpen] = React.useState(false);
    const [clear, setClear] = useState(false)
    React.useEffect(() => {
        if (sessionStorage.getItem('status') && sessionStorage.getItem('message')) {
            setOpen(true)
        }
        if (clear){
            sessionStorage.clear()
        }
        else{
            setClear(true)
        }
    }, [clear])

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    if (sessionStorage.getItem('status') == 'success') {
        return (
            <>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} style={{direction: 'ltr'}}>
                    <Alert onClose={handleClose} severity="success"
                           style={{direction: 'ltr'}}>{sessionStorage.getItem('message')}</Alert>
                </Snackbar>
            </>
        )
    } else if (sessionStorage.getItem('status') == 'error') {
        return (
            <>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} style={{direction: 'ltr'}}>
                    <Alert onClose={handleClose} severity="error"
                           style={{direction: 'ltr'}}>{sessionStorage.getItem('message')}</Alert>
                </Snackbar>
            </>
        )
    } else if (sessionStorage.getItem('status') == 'warning') {
        return (
            <>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} style={{direction: 'ltr'}}>
                    <Alert onClose={handleClose} severity="warning"
                           style={{direction: 'ltr'}}>{sessionStorage.getItem('message')}</Alert>
                </Snackbar>
            </>
        )
    }
    return null;
}

export default Message
