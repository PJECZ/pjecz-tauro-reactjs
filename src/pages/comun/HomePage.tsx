
import { useSelector } from "react-redux";

import { Layout } from "../../components/Layout"

import { RootState } from "../../store";

import { AtenderTurnoPage } from "./AtenderTurnoPage";
import { CrearTurnoPage } from "./CrearTurnoPage";

export const HomePage = () => {  

    const { tipoUsuario } = useSelector( ( state: RootState ) => state.auth );
     
    return (

        <Layout footer={ true }>

            { tipoUsuario === 'Ventanilla' && <AtenderTurnoPage /> }
           
            { tipoUsuario === 'Recepcionista' && <CrearTurnoPage /> }

        </Layout>  
        
    )
}
