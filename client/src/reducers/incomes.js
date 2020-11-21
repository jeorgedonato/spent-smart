import {
    GET_INCOMES,
    INCOME_ERROR,
    ADD_INCOME,
    UPDATE_INCOME,
    DELETE_INCOME,
    GET_INCOME,
    GET_MONTHLY_INCOME
} from '../actions/types';

const initialState = {
    incomes: [],
    income: null,
    loading: true,
    error: {},
	monthlySum: null
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_INCOMES:
            return {
                ...state,
                incomes: payload,
                loading: false,
            };
        case GET_INCOME:
            return {
                ...state,
                income: payload,
                loading: false,
            };
        case ADD_INCOME:
            return {
                ...state,
                incomes: [payload, ...state.incomes],
                loading: false,
            };
        case DELETE_INCOME:
            return {
                ...state,
                incomes: state.incomes.filter((income) => income._id !== payload),
                loading: false,
            };
        case GET_MONTHLY_INCOME:
			return {
				...state,
				monthlySum: payload[0].sum,
				loading: false,
			};
        case INCOME_ERROR:
            return {
                ...state,
                error: payload,
                loading: false,
            };
        case UPDATE_INCOME:
            return {
                ...state,
                incomes: state.incomes.map((income) =>
                    income._id === payload._id ? { ...income, payload } : income
                ),
                loading: false,
            };

        default:
            return state;
    }
}