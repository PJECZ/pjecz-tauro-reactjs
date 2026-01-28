import { JSX, useState } from 'react';


import { Box, Grid, MenuItem, Select, TextField, Typography } from '@mui/material';


import Flag from 'react-country-icons';


import { ClearFormatPhoneNumber, FormatPhoneNumber } from '../helpers/FormatPhoneNumber';

interface ChildProps {
  onDataChange: ( telefonoCelular:string) => void; 
}

interface CountryOption {
    code:   string;
    label:  string;
    phone:  string;
    flag:   JSX.Element;
}

type KeyValue = number | 'del';

const countries: CountryOption[] = [
    {
        code: "MX",
        label: "México",
        phone: "+52",
        flag: <Flag size={22} country='MX' />,
    },
    {
        code: "US",
        label: "Estados Unidos",
        phone: "+1",
        flag: <Flag size={22} country='US' />,
    },
];

const keyStyle = {
    height: 90,
    width: 90,
    borderRadius: '50%',
    fontSize: 26,
    fontWeight: 600,
    backgroundColor: '#f5f5f5',
    color: '#212121',
    boxShadow: '0px 5px 5px #bdbdbd',
    '&:hover': {
        backgroundColor: '#eeeeee',
    },
    '&:active': {
        boxShadow: '0 3px 0 #9e9e9e',
        transform: 'translateY(3px)',
    },
};


export const Teclado = ( {onDataChange}:ChildProps ) => {

    const [loading, setLoading] = useState( false );

    const [telefonoCelular, setTelefonoCelular] = useState( '' );
    const [codigoPais, setCodigoPais] = useState( 'MX' );
    const [numeroPais, setNumeroPais] = useState( '+52' );
    
  

    return (  
        <Box display='flex' flexDirection='column' gap={2} mt={2}>

            <Grid container spacing={1} mb={1}>

                <Grid size={{ md: 4, xs: 12 }}>
                    <Select
                        sx={{ py: 0 }}
                        fullWidth
                        value={ codigoPais }
                        onChange={ (e) => {
                            const selected = countries.find( (c) => c.code === e.target.value );
                            if ( selected ){ setCodigoPais(selected.code); setNumeroPais(selected.phone); }
                            
                        }}
                        renderValue={ ( value ) => {

                            const country = countries.find( (c) => c.code === value );

                            if( !country){ return <Box> </Box>; }

                            return <Box display="flex" alignItems="center" gap={1}>

                                { country.flag }

                                <Typography variant="body1">
                                    { country.phone }
                                </Typography>

                            </Box>;
                        }}                            
                    >
                        {
                            countries
                            .map( (option) => (
                                <MenuItem key={ option.code} value={ option.code }>

                                    <Box display="flex" alignItems="center" gap={1} my={1}>

                                        { option.flag }

                                        <Typography variant="body2">
                                            { option.label } ({ option.phone })
                                        </Typography>

                                    </Box>

                                </MenuItem>
                            ))
                        }
                    </Select>
                </Grid>
            
                <Grid size={{ md: 8, xs: 12 }}>

                    <TextField
                        fullWidth
                        label='Tel. Celular'
                        placeholder="(000) 000-0000"                                                        
                        value={ FormatPhoneNumber( telefonoCelular ) }
                        onChange={ (e) => {
                                            setTelefonoCelular(  e.target.value ?? ''  ); 
                                            if (e.target.value!='' ){
                                                onDataChange( numeroPais + ClearFormatPhoneNumber( e.target.value ?? '' ) ) 
                                            }else{
                                                onDataChange( '' ) 
                                            }
                                            
                                        } 
                                }
                        slotProps={{
                            input: {
                                sx: {
                                    textAlign: "center",
                                    fontSize: 16,
                                    letterSpacing: 6,
                                    borderRadius: 1,
                                    py: 0,
                                },
                            }
                        }}          
                    />  

                </Grid>

            </Grid>            

        </Box>
    );
}
