const initialState = {
    doner: null,
    error: false
};

const donerReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_DONER':
            return {
                ...state,
                doner: action.payload,
                error: action.error
            };
        default:
            return state;
    }
};

export default donerReducer;
