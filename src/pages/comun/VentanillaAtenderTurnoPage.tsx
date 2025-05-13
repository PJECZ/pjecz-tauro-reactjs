import { useState } from "react";
import { useNavigate } from "react-router";

import { Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Grid, InputLabel, MenuItem, OutlinedInput, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import Modal from '@mui/material/Modal';
import { Theme, useTheme } from "@mui/material/styles";

import { Layout } from "../../components/Layout";

import { SelectChangeEvent } from "@mui/material/Select";

import { button_blue_ligth, button_blue_ligth_small, button_green_small, button_yellow_small } from "../../styles/ButtonsStyle";
import { table_padding, table_tbody, table_thead, table_ventanilla } from "../../styles/TableStyle";


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  textAlign: 'center',
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Normal',
  'Urgente',
  'Con cita',
];

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight: personName.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

export const VentanillaAtenderTurnoPage = () => {  

    const navigate = useNavigate();

    const generarTurno = () => {
        // Simular la generación de un nuevo turno
        const nuevoTurno = Math.floor(Math.random() * 100).toString().padStart(3, '0');
        setTurno(nuevoTurno);
        setIsDisabled(true);
    }

    const [turno, setTurno] = useState('');

    const [ventanilla, setVentanilla] = useState('0');

    const [isDisabled, setIsDisabled] = useState(false);
    
    const handleChangeVentanilla = (event: SelectChangeEvent) => {
        setVentanilla(event.target.value);
        localStorage.setItem('ventanilla', JSON.stringify(event.target.value));
    };

    const handleCancelar = () => {
        setCancelar(true);
    }     

    const [open, setOpen] = useState(ventanilla === '0' ? true : false);
    const [ cancelar, setCancelar ] = useState(false);
    
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleCloseCancelar = () => {
        setCancelar(false);
        setTurno('');
        setIsDisabled(false);
    }

    const theme = useTheme();
    const [personName, setPersonName] = useState<string[]>([]);

    const handleChange = (event: SelectChangeEvent<typeof personName>) => {
        const {
        target: { value },
        } = event;
        setPersonName(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (

        <Layout>

            <Grid container spacing={3}>

                <Grid size={{ xs: 12, md: 12 }}>               
                
                    <Box bgcolor={'#003366'} sx={{ opacity:0.6}}>
                        
                        <Typography variant="h4" color="white" textAlign={'center'} p={1}>
                            Oficialía Común de Partes
                        </Typography>
                            
                    </Box>                      

                </Grid>

                <Grid size={{ xs: 12, md: 12 }} sx={ { display: 'flex', justifyContent: 'center', margin:'auto' } } >
                    <Button disabled={ isDisabled } sx={{ ...button_blue_ligth, opacity:.8 }} variant="contained" onClick={ generarTurno }> 
                        Tomar Turno
                    </Button>
                        
                </Grid>


                <Grid size={{ xs: 12, md: 6 }} sx={ { display: 'flex', justifyContent: 'center', margin:'auto' } } >

                    <TableContainer component={ Paper } variant="outlined" sx={{ borderRadius: 2 }}>

                        <Table>

                            <TableHead sx={{ ...table_thead }}>

                                <TableRow>   
                                    <TableCell sx={{ ...table_padding, ...table_thead, width: '2%', textAlign: 'center', fontSize:'50px', paddingY:'30px' }}>Turno</TableCell>
                                </TableRow>

                            </TableHead>

                            <TableBody>

                                <TableRow style={{...table_tbody }}>
                                    <TableCell sx={{ ...table_padding, fontSize: 200, textAlign: 'center', fontWeight: 'bold', height:'25vh', maxHeight:'25vh' }}>{turno}</TableCell>
                                </TableRow>
                                <TableRow style={{...table_tbody }}>
                                    <TableCell sx={{ ...table_padding, fontSize: 18, textAlign: 'center' }}>

                                        { turno !== '' &&   
                                        <Table>
                                            <TableRow>
                                                <TableCell sx={{textAlign: 'center'}}>
                                                    <Button sx={{ ...button_green_small }} variant="contained" onClick={ () => {setTurno(''); setIsDisabled(false); } }> 
                                                        Concluir
                                                    </Button>
                                                </TableCell>
                                                <TableCell sx={{textAlign: 'center'}}>
                                                    <Button sx={{ ...button_yellow_small }} variant="contained" onClick={ () => handleCancelar() }> 
                                                        Cancelar
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        </Table>
                                        }

                                    </TableCell>

                                </TableRow>
                            
                            </TableBody>

                        </Table>

                    </TableContainer>

                </Grid>

            </Grid>     


            <Dialog
                open={cancelar}
                onClose={handleCancelar}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                {"Confirmar"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    ¿ Desea cancelar el turno ?   
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleCloseCancelar}>No</Button>
                <Button onClick={handleCloseCancelar} autoFocus>
                    Si, Cancelar Turno
                </Button>
                </DialogActions>
            </Dialog>     


            <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2" sx={{textAlign:'left'}}>
                                1.- Seleccione la ventanilla que desea atender
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                <Select sx={{ width: '100%', height: 40, margin: 'auto', display: 'flex', justifyContent: 'center' }}
                                    labelId="select-ventanilla-label"
                                    id="select-ventanilla"
                                    value={ventanilla}
                                    label="Ventanilla"
                                    onChange={handleChangeVentanilla}
                                >
                                    <MenuItem value={1}>1</MenuItem>
                                    <MenuItem value={2}>2</MenuItem>
                                    <MenuItem value={3}>3</MenuItem>
                                </Select>
                            </Typography>

                            <Typography id="modal-modal-title" variant="h6" component="h2" sx={{textAlign:'left', marginTop: 2}}>
                                2.- Seleccione los tipos de turno
                            </Typography>
                            
                            <FormControl sx={{ m: 1, width: '100%' }}>
                                <InputLabel id="multiple-turno-label">Tipo de Turno</InputLabel>
                                <Select
                                labelId="multiple-turno-label"
                                id="multiple-demo"
                                multiple
                                value={personName}
                                onChange={handleChange}
                                input={<OutlinedInput id="select-multiple-turno" label="Tipo de Turno" />}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map((value) => (
                                        <Chip key={value} label={value} />
                                    ))}
                                    </Box>
                                )}
                                MenuProps={MenuProps}
                                >
                                {names.map((name) => (
                                    <MenuItem
                                    key={name}
                                    value={name}
                                    style={getStyles(name, personName, theme)}
                                    >
                                    {name}
                                    </MenuItem>
                                ))}
                                </Select>
                            </FormControl>   

                            <Button sx={{ ...button_blue_ligth_small }} variant="contained" onClick={ () => handleClose() }> 
                                Seleccionar
                            </Button>


                        </Box>

            </Modal>
        
        
        </Layout>
        

        
    )
}
