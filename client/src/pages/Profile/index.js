import React, { useEffect, useState } from 'react';
import { Modal, Button, Badge, Popover, OverlayTrigger } from 'react-bootstrap';
import styled from 'styled-components';
import { connect } from 'react-redux'
import ContentContainer from '../../components/ContentContainer';
import { profileUpdate } from '../../actions/auth';
import PropTypes from 'prop-types';

const FlexContainer = styled.div`
  display: flex;
`;

const ButtonInfo = styled.button`
    text-align : right;
    color: #fff;
    background-color: #007bff;
    border-color: #007bff;
    border: 1px solid transparent;
    padding: .375rem .75rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: .25rem;
    transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
`

const Profile = ({ auth, profileUpdate }) => {
    const [formInput, setFormInput] = useState({
        firstname: "",
        lastname: "",
        budget_threshold: "",
    })


    return (
        <>
            <ContentContainer>
                <FlexContainer>
                    <h2 style={{ width: '50%' }}>Profile</h2>
                    <ButtonInfo><i className="fa fa-pencil-square" aria-hidden="true"></i> Edit</ButtonInfo>
                </FlexContainer>
            </ContentContainer>
        </>
    )
}

Profile.propTypes = {
    profileUpdate: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { profileUpdate })(Profile);