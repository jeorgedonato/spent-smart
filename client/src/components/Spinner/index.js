import React from 'react';
import styled from 'styled-components';
import SpinnerImg from '../spinner.gif';
const SpinnerStyle = styled.img`
    width: 200px;
    margin: auto;
    display: block;
`
const Spinner = () => {
    return (
        <>
            <SpinnerStyle src={SpinnerImg} alt="Loading..." />
        </>
    )
}

export default Spinner;