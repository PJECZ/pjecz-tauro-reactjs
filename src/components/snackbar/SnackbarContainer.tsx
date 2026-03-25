
import { useSelector, useDispatch } from "react-redux";

import { RootState } from "../../store";

import { closeSnackbar } from "../../store/slices/SnackbarSlice";

import { SnackbarItem } from "./SnackbarItem";

export const SnackbarContainer = () => {

    const dispatch = useDispatch();

    const snacks = useSelector((state: RootState) => state.snackbar.list);  

    return (
        <div
            style={{
                position: "fixed",
                bottom: 20,
                right: 20,
                display: "flex",
                flexDirection: "column-reverse",
                gap: "10px",
                zIndex: 9999,
            }}
        >
            {
                snacks.map(( snack, index ) => (
                    <SnackbarItem
                        key={snack.id}
                        snack={snack}
                        delay={ index * 120}
                        onClose={ () => dispatch( closeSnackbar( snack.id ) ) }
                    />
                ))
            }
        </div>
    );
}