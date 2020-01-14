import React, {useState, useEffect} from 'react'
import {Container, makeStyles} from '@material-ui/core'
import ToggleButton from '@material-ui/lab/ToggleButton';
import axios from 'axios'
import URL from "../url";
import CategorySkeleton from './skeletons/CategorySkeleton'
import Refresh from '@material-ui/icons/Refresh'
import IconButton from '@material-ui/core/IconButton'

const useStyles = makeStyles(theme => ({
    filterContainer: {
        border: '1px solid #efefef',
        padding: '5px'
    },
    toggleButton: {
        borderRadius: '50px',
        paddingRight: theme.spacing(5),
        paddingLeft: theme.spacing(5),
        paddingTop: theme.spacing(0),
        border: '0',
        fontSize: '12px',
        transition: '.3s all',
        height: '31px',
    }
}))

const FilterButton = (props) => {
    const classes = useStyles()
    const [selected, setSelected] = useState(false);
    const handleFilterClick = () => {
        setSelected(!selected);
    }
    return (
        <ToggleButton
            value="check"
            selected={selected}
            onChange={() => handleFilterClick()}
            className={classes.toggleButton}
            style={!selected ? {backgroundColor: '#efefef', color: '#333',} : {
                backgroundColor: '#ff9100',
                color: 'white'
            }}
            key={props.data.id}
        >
            {props.data.title}
        </ToggleButton>
    )
}

const FilterBox = () => {
    const classes = useStyles()
    const [loading, setLoading] = useState(true)
    const [failed, setFailed] = useState(false)
    const [items, setItems] = useState([])

    useEffect(() => {
        axios.get(`${URL}/category`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (res.data.status == 'success') {
                    setItems(res.data.data)
                } else {
                    setFailed(true)
                }
                setLoading(false)
            })
            .catch(err => {

            })
    }, [])
    if (loading) {
        return (
            <Container className={classes.filterContainer} fixed style={{marginTop: '60px', marginBottom: '10px'}}>
                <h4 style={{margin: '10px 5px'}}>فیلتر سریع</h4>
                <CategorySkeleton/>
            </Container>
        )
    } else if (failed) {
        return (
            <Container className={classes.filterContainer} fixed style={{marginTop: '60px', marginBottom: '10px'}}>
                <h4 style={{margin: '10px 5px'}}>فیلتر سریع</h4>
                <center>
                    <IconButton style={{backgroundColor: '#ff9100', color: 'white'}} color="inherit">
                        <Refresh/>
                    </IconButton>
                </center>
                <br/>
            </Container>
        )
    } else {
        return (
            <div>
                <Container className={classes.filterContainer} fixed style={{marginTop: '60px', marginBottom: '10px'}}>
                    <h4 style={{margin: '10px 5px'}}>فیلتر سریع</h4>
                    <div style={{display: 'flex'}}>
                        {items.map(item => {
                            return (
                                <FilterButton data={item}/>
                            )
                        })}
                    </div>
                </Container>
            </div>
        )
    }

}

export default FilterBox
