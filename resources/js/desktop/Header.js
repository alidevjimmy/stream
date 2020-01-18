import React from 'react'
import '../styles/style.css'
import {
    makeStyles,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Container,
} from '@material-ui/core'
import {MoreHoriz} from '@material-ui/icons';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Box from '@material-ui/core/Box';
import Slide from '@material-ui/core/Slide';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import {PersonOutline, AddOutlined} from '@material-ui/icons'
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import {Link} from 'react-router-dom'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        fontFamily: 'IRANSans'
    },
    menuButton: {
        marginRight: theme.spacing(0),
    },
    title: {
        marginRight: theme.spacing(3),
        fontFamily: 'IRANSans',
        fontWeight: 700,
        color: 'black'
    },
    header: {
        background: 'white',
        boxShadow: '0 0px 0px #cccccc',
        borderBottom: '1px solid #efefef',
    },
    headContent: {
        paddingRight: theme.spacing(0),
    },
    search: {
        flexGrow: 1,
        marginRight: theme.spacing(3),
        position: 'relative',
        borderRadius: '8px',
        backgroundColor: "#efefef",
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: "#8e8e8e"
    },
    inputRoot: {
        color: 'inherit',
        width: '100%'
    },
    inputInput: {
        flexGrow: 1,
        padding: theme.spacing(1.7, 7, 1.7, 1),
        float: 'right',
        transition: theme.transitions.create('width'),
        width: '100%',
        color: "#333",
        fontWeight: 700,
        fontSize: "14px",
    },
    paperStyle: {
        backgroundColor: "white",
        border: '1px solid rgb(239, 239, 239)',
        boxShadow: '0 3px 6px rgba(0,0,0,.18)',
        borderRadius: '7px',
        outline: 'none',
    }
}));


function HideOnScroll(props) {
    const {children, window} = props;
    const trigger = useScrollTrigger({target: window ? window() : undefined});

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

HideOnScroll.propTypes = {
    children: PropTypes.element.isRequired,
    window: PropTypes.func,
};

const MoreHorizon = () => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const handleToggle = () => {
        setOpen(prevOpen => !prevOpen);
    };
    const handleClose = event => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }

    const prevOpen = React.useRef(open);

    React.useEffect(() => {

        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    return (
        <React.Fragment>
            <IconButton edge="start" className={[classes.menuButton, 'on_focus'].join(' ')} aria-label="menu"
                        ref={anchorRef}
                        aria-controls={open ? 'menu-list-grow' : undefined}
                        aria-haspopup="true"
                        onClick={handleToggle}>
                <MoreHoriz className="prim_color"/>
            </IconButton>
            <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                {({TransitionProps, placement}) => (
                    <Grow
                        {...TransitionProps}
                        style={{transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'}}>
                        <Paper className={[classes.paperStyle, 'no_padding'].join(' ')}>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}
                                          className='no_padding'>

                                    <MenuItem onClick={handleClose} className={['my_font', 'items'].join(' ')}
                                              style={{borderBottom: '1px solid rgb(239, 239, 239)'}}>دانلود
                                        اپلیکیشن</MenuItem>

                                    <MenuItem onClick={handleClose} className={['my_font', 'items'].join(' ')}
                                              style={{borderBottom: '1px solid rgb(239, 239, 239)'}}>ایتم دوم</MenuItem>
                                    <MenuItem onClick={handleClose} className={['my_font', 'items'].join(' ')}>مورد سوم</MenuItem>
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </React.Fragment>
    );
}

const LoginPaper = () => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const handleToggle = () => {
        setOpen(prevOpen => !prevOpen);
    };
    const handleClose = event => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }

    const prevOpen = React.useRef(open);

    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    return (

        <React.Fragment>
            <IconButton edge="start" className={[classes.menuButton, 'on_focus'].join(' ')} aria-label="menu"
                        ref={anchorRef}
                        aria-controls={open ? 'menu-list-grow' : undefined}
                        aria-haspopup="true"
                        onClick={handleToggle}>
                <PersonOutline className="prim_color"/>
            </IconButton>
            <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                {({TransitionProps, placement}) => (
                    <Grow
                        {...TransitionProps}
                        style={{transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'}}
                    >
                        <Paper className={[classes.paperStyle, 'no_padding'].join(' ')}>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}
                                          className='no_padding'>

                                    {localStorage.getItem('user') !== null ? <div>
                                        <MenuItem onClick={handleClose} className={['my_font', 'items'].join(' ')}
                                                  style={{borderBottom: '1px solid rgb(239, 239, 239)'}}>استریم
                                            من</MenuItem>
                                        <MenuItem onClick={() => {
                                            localStorage.removeItem('user')
                                            setOpen(false);
                                            sessionStorage.setItem('status' , 'success')
                                            sessionStorage.setItem('message' , 'خروج موفقیت آمیز بود')
                                            location.reload()
                                        }} className={['my_font', 'items'].join(' ')}>خروج</MenuItem>
                                    </div> :
                                        <div>
                                            <Link to='/register' style={{
                                                color: '#333',
                                                weight: '100%',
                                                height: '100%',
                                                textDecoration: 'none'
                                            }}>
                                                <MenuItem onClick={handleClose} className={['my_font', 'items'].join(' ')}
                                                          style={{borderBottom: '1px solid rgb(239, 239, 239)'}}>
                                                    ثبت نام
                                                </MenuItem>
                                            </Link>

                                            <Link to='/login' style={{
                                                color: '#333',
                                                weight: '100%',
                                                height: '100%',
                                                textDecoration: 'none'
                                            }}>
                                                <MenuItem onClick={handleClose} className={['my_font', 'items'].join(' ')}
                                                          style={{borderBottom: '1px solid rgb(239, 239, 239)'}}>
                                                    ورود
                                                </MenuItem>
                                            </Link>
                                    </div>}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </React.Fragment>
    );
}

const Header = (props) => {
    const classes = useStyles();

    return (
        <React.Fragment>
            <CssBaseline/>
            <HideOnScroll {...props}>
                <AppBar className={classes.header}>
                    <Container fixed className={classes.headContent} style={{paddingLeft: '0'}}>
                        <Toolbar style={{paddingRight: '0', paddingLeft: '0'}}>
                            <MoreHorizon/>
                            <Typography className={classes.title}>
                                <Link to='/' style={{color: 'black', textDecoration: 'none'}}>
                                    <IconButton>
                                        <img src="/images/photo_2020-01-12_00-46-00.png" alt="استریم"
                                             style={{height: '36px', verticalAlign: 'bottom'}} className='on_focus'/>
                                    </IconButton>
                                </Link>
                            </Typography>
                            <div className={[classes.search, "on_focus"].join(' ')}>
                                <div className={classes.searchIcon}>
                                    <SearchIcon/>
                                </div>
                                <InputBase
                                    placeholder="جستوجو در میان آگهی ها..."
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                    className="my_font"
                                    inputProps={{'aria-label': 'search'}}
                                />
                            </div>
                            <Link to='addadvertising'>
                                <IconButton className='on_focus'>
                                    <AddOutlined className="prim_color"/>
                                </IconButton>
                            </Link>
                            <LoginPaper/>
                        </Toolbar>
                    </Container>
                </AppBar>
            </HideOnScroll>
            <br/>
        </React.Fragment>
    );
}

export default Header
