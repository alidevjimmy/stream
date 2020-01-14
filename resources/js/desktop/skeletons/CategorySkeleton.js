import React from 'react'
import Skeleton from '@material-ui/lab/Skeleton'

const CategorySkeleton = () => {
    return (
        <div>
            <div style={{display: 'flex'}}>
                <Skeleton variant='text' style={{borderRadius: '40px', height: '45px', width: '150px'}}/>
                <div style={{width: '5px'}}></div>
                <Skeleton variant='text' style={{borderRadius: '40px', height: '45px', width: '100px'}}/>
                <div style={{width: '5px'}}></div>
                <Skeleton variant='text' style={{borderRadius: '40px', height: '45px', width: '95px'}}/>
                <div style={{width: '5px'}}></div>
                <Skeleton variant='text' style={{borderRadius: '40px', height: '45px', width: '170px'}}/>
            </div>
            <div style={{display: 'flex'}}>
                <Skeleton variant='text' style={{borderRadius: '40px', height: '45px', width: '70px'}}/>
                <div style={{width: '5px'}}></div>
                <Skeleton variant='text' style={{borderRadius: '40px', height: '45px', width: '180px'}}/>
            </div>
        </div>
    )
}

export default CategorySkeleton
