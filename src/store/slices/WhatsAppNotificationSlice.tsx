import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface whatsAppNotificationState {
    phoneNumber:    string;
}

const initialState: whatsAppNotificationState = {
    phoneNumber:    '',
};

export const whatsAppNotificationSlice = createSlice({
    name: "whatsAppNotification",
    initialState,
    reducers: {
        setPhoneNumber: ( state, action: PayloadAction<{ phoneNumber: string; }> ) => {
            state.phoneNumber = action.payload.phoneNumber;
        },
    },
});

export const { setPhoneNumber } = whatsAppNotificationSlice.actions;

export default whatsAppNotificationSlice.reducer;
