
import { useState } from 'react';

interface Props {
    page: number, 
    rowsPerPage: number,
    handleChangePage: (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => void, 
    handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void, 
    resetPage: () => void,
}

export const usePages = ( initialPerPage: number = 10 ): Props => {
    
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState( initialPerPage );
  
    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
        setPage(newPage);
    };
  
    const handleChangeRowsPerPage = ( event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
        setRowsPerPage( parseInt( event.target.value, 10 ) );
        setPage(0);
    };

    const resetPage = () =>{
        setPage(0);
    }

    return { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage, resetPage };
}