import React from 'react'

const ShowAd = ({match}) => {
    return (
        <>
            <h1>{match.params.id}</h1>
        </>
    )
}

export default ShowAd
