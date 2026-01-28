import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type SnackbarVariant = "success" | "error" | "warning" | "info";

export interface SnackbarItem {
    id:         string;
    message:    string;
    variant:    SnackbarVariant;
    duration:   number;
}

interface SnackbarState {
    list:       SnackbarItem[];
}

const initialState: SnackbarState = {
    list: [],
};

export const snackbarSlice = createSlice({
    name: "snackbar",
    initialState,
    reducers: {
        openSnackbar: ( state, action: PayloadAction<{ message: string; variant?: SnackbarVariant; duration?: number; }> ) => {
            const id = crypto.randomUUID();
            state.list.push({
                id,
                message: action.payload.message,
                variant: action.payload.variant ?? "info",
                duration: action.payload.duration ?? 4000,
            });
        },
        closeSnackbar: ( state, action: PayloadAction<string> ) => {
            state.list = state.list.filter((snack) => snack.id !== action.payload);
        },
    },
});

export const { openSnackbar, closeSnackbar } = snackbarSlice.actions;

export default snackbarSlice.reducer;
