import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import ContentContainer from '../../components/ContentContainer';
import { EditableSelect } from 'react-editable-select';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


const Add = () => {
    return (
        <>
            <ContentContainer>
                <h3><i class="fa fa-plus-square" aria-hidden="true"></i>{' '}Add Income </h3>
                <Form>
                    <Form.Group controlId="nameInput">
                        <Form.Label>Name of Income</Form.Label>
                        <Form.Control type="text" placeholder="eg: tissue, drinks, etc." />
                    </Form.Group>
                    <Form.Group controlId="categoryInput">
                        <Form.Label>Category</Form.Label>
                        {/* <EditableSelect
              options={options}
              value={selectedOption}
              getOptionValue={(option) => option.id}
              getOptionLabel={(option) => option.name}
              createOption={(text) => { return { id: 1, name: text } }}
            /> */}
                    </Form.Group>
                </Form>
            </ContentContainer>
        </>
    )
};

export default Add;
