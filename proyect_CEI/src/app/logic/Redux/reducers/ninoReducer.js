const initialState = {
    nino: null,
    error: false
};

const ninoReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_NINO':
            return {
                ...state,
                nino: action.payload,
                error: false
            };
            case 'SET_ERROR':
                return {
                    ...state,
                    error: true,
                    nino: null 
                };
        default:
            return state;
    }
};

export default ninoReducer;
