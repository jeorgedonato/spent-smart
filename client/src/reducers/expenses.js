import {
  GET_EXPENSES,
  EXPENSE_ERROR,
  ADD_EXPENSE,
  UPDATE_EXPENSE,
  DELETE_EXPENSE,
  GET_EXPENSE
} from '../actions/types';

const initialState = {
  expenses: [],
  expense: null,
  loading: true,
  error: {}
};

export default function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case GET_EXPENSES:
			return {
				...state,
				expenses: payload,
				loading: false,
			};
		case GET_EXPENSE:
			return {
				...state,
				expense: payload,
				loading: false,
			};
		case ADD_EXPENSE:
			return {
				...state,
				expenses: [payload, ...state.expenses],
				loading: false,
			};
		case DELETE_EXPENSE:
			return {
				...state,
				expenses: state.expenses.filter((expense) => expense._id !== payload),
				loading: false,
			};
		case EXPENSE_ERROR:
			return {
				...state,
				error: payload,
				loading: false,
			};
		case UPDATE_EXPENSE:
			return {
				...state,
				expenses: state.expenses.map((expense) =>
					expense._id === payload._id ? { ...expense, payload } : expense
				),
				loading: false,
			};

		default:
			return state;
	}
}