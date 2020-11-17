// // import { Store, Dispatch } from "../reducers/types";
// import React, { useState, useEffect } from 'react';
// import { Container, Jumbotron, Button } from 'react-bootstrap';
// import { connect } from 'react-redux';

// const SAVE_INCOME = "SAVE_INCOME";
// const ENTRY_INCOME = "ENTRY_INCOME";

// const INCOME_INITIAL_STATE = [{
//     id: "",
//     dateId: "",
//     income: 0
// }];

// const saveIncomePrivate = function saveIncomePrivate(dateId: string, amount: number) {
//     return {
//         type: SAVE_INCOME,
//         payload: {
//             dateId,
//             amount
//         }
//     }
// }
// const entryIncomePrivate = function entryIncomePrivate(income: array) {
//     return {
//         type: ENTRY_INCOME,
//         payload: {
//             income
//         }
//     };
// }

// function saveIncome(amount: number) {
//     return (dispatch: Dispatch, store: Store) => {
//         dispatch(saveIncomePrivate(store().date.id, amount));
//     }
// }
// function entryIncome(income: array) {
//     return (dispatch: Dispatch) => {
//         dispatch(entryIncomePrivate(income));
//     }
// }

// //Exporting and connecting to our store
// export default Income;