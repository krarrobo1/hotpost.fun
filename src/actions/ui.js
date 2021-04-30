import { types } from "../types/types";

export const setError = (err) => ({
    type: types.uiSetError,
    payload: err
});

export const removeError = () => ({
    type: types.uiSetError
});

export const startLoading = () => ({
    type: types.uiStartLoading
})
export const endLoading = () => ({
    type: types.uiFinishLoading
})
