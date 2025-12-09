import { useEffect, useMemo, useState } from 'react';

import { connect } from 'socket.io-client';

export const useSocket = ( ) => {

    const serverPath = process.env.REACT_APP_URL_BASE_SOCKET ?? '';

    const socket = useMemo( () => connect( serverPath, { path: '/socket.io/', transports: ['websocket', "polling"] } ), [ serverPath ] );
    const [ online, setOnline ] = useState(false);

    useEffect(() => {
        setOnline( socket.connected );
    }, [ socket ])

    useEffect( () => {
        socket.on('connect', () => {
            setOnline( true );
        })

    }, [ socket ])

    useEffect( () => {

        socket.on('disconnect', () => {
            setOnline( false );
        })

    }, [ socket ])

    return {
        socket,
        online
    }
}