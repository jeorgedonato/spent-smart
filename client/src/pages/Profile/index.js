import React, { useEffect, useState } from 'react';
import { Form, InputGroup, Row, Col, Button } from 'react-bootstrap';
import styled from 'styled-components';
import { connect } from 'react-redux'
import ContentContainer from '../../components/ContentContainer';
import { profileUpdate } from '../../actions/auth';
import PropTypes from 'prop-types';

const FlexContainer = styled.div`
  display: flex;

`;

const AnchorTag = styled.button`
    color: #fff;
    background-color: #0069d9;
    border-color: #0062cc;
    &:hover {
    text-decoration : none;
    }
    font-size : 1.5rem;
    text-align: center;
    vertical-align: middle;
    border: 1px solid transparent;
    padding: .375rem .75rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: .25rem;
    transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    float: right;
    @media (max-width: 768px){
    font-size : 1rem;
    margin-top: 15px
    }
`;

const Profile = ({ auth, profileUpdate }) => {
    const [isEdit, setIsEdit] = useState(false);

    

    const [formInput, setFormInput] = useState({
        firstname: "",
        lastname: "",
        budget_threshold: "",
    })
    const {firstname, lastname, budget_threshold} = formInput;

    useEffect(() => {
        setFormInput({ ...setFormInput, ["firstname"]: auth.user ? auth.user.firstname : "", ["lastname"]: auth.user ? auth.user.lastname : "", ["budget_threshold"]: auth.user && auth.user.hasOwnProperty('budget_threshold') ? auth.user.budget_threshold : ""});
    },[auth.loading])

    return (
        <>
            <ContentContainer>
                <FlexContainer>
                    <h2 style={{ width: '50%' }}>Profile</h2>
                    <span style={{width : '50%'}}>
                        <AnchorTag onClick={() => { setIsEdit(isEdit ? false : true) }} >
                            {!isEdit ? 
                            <span><i className="fa fa-pencil-square" aria-hidden="true"></i> Edit</span>
                            : <span><i className="fa fa-ban" aria-hidden="true"></i> Cancel</span> }
                            
                        </AnchorTag>
                    </span>
                </FlexContainer>
                 <Form style={{marginLeft: '1rem', marginTop : '1rem'}}>
                    <Form.Group as={Row} controlId="firstname">
                        <Form.Label column sm="2">
                        Firstname
                        </Form.Label>
                        <Col sm="5">
                        <Form.Control readOnly={!isEdit ? true : false} value={firstname} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="lastname">
                        <Form.Label column sm="2">
                        Lastname
                        </Form.Label>
                        <Col sm="5">
                        <Form.Control readOnly={!isEdit ? true : false}  value={lastname} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="threshold">
                        <Form.Label column sm="2">
                        Monthly Threshold
                        </Form.Label>
                        <Col sm="5">
                        <Form.Control readOnly={!isEdit ? true : false} type="number" value={budget_threshold} />
                        </Col>
                    </Form.Group>
                    <Button type="submit" style={{display : !isEdit ? "none" : "block", float: 'right'}}><i class="fa fa-floppy-o" aria-hidden="true"></i> Save</Button>
                 </Form>


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