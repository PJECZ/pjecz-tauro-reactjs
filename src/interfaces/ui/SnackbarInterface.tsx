
type ColorPaletteProp = 'error' | 'success' | 'warning';

export interface SnackbarProps {
    type: ColorPaletteProp;
    open: boolean;
    message: string;
}   