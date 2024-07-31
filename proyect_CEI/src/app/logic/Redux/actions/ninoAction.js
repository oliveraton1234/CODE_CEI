
export const setNino = (nino) => {
    return {
        type: 'SET_NINO',
        payload: nino,
    };
};


export const setError = () => {
    return {
        type: 'SET_ERROR',
    };
};