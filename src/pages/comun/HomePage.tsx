
import { useSelector } from "react-redux";

import { Layout } from "../../components/Layout";

import { RootState } from "../../store";

import { AtenderTurnoPage } from "./AtenderTurnoPage";
import { CrearTurnoPage } from "./CrearTurnoPage";

export const HomePage = () => {  

    const { rol } = useSelector( ( state: RootState ) => state.auth );
     
    return (

        <Layout footer={ true }>

            { rol?.nombre === 'VENTANILLA' && <AtenderTurnoPage /> }
           
            { rol?.nombre === 'RECEPCION' && <CrearTurnoPage /> }

        </Layout>  
        
    )
}
