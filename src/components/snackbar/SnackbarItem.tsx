
import { JSX, useCallback, useEffect, useState } from "react";

import { FaCheckCircle, FaExclamationTriangle, FaInfoCircle, FaTimesCircle } from "react-icons/fa";

import { SnackbarItem as Snack } from "../../store/slices/SnackbarSlice";

const colors: Record<string, string> = {
    success:    "#4caf50",
    error:      "#f44336",
    warning:    "#ff9800",
    info:       "#2196f3",
};

interface Props {
    snack:      Snack;
    delay?:     number;
    onClose:    () => void;
}

export const SnackbarItem = ( { snack, delay, onClose }: Props ) => {

    const iconMap: Record<string, JSX.Element> = {
        success: <FaCheckCircle />,
        error:   <FaTimesCircle />,
        warning: <FaExclamationTriangle />,
        info:    <FaInfoCircle />,
    };

    const [visible, setVisible] = useState(false);
    const [closing, setClosing] = useState(false);

    const { message, variant, duration } = snack;

     const startClose = useCallback(() => {

        setClosing(true);
        setTimeout(() => onClose(), 300);

    }, [ onClose ]);

    useEffect(() => {

        setTimeout(() => {
            setVisible(true);
        }, delay ?? 0 );

        const timer = setTimeout( startClose, duration );
        
        return () => clearTimeout( timer );

    }, [ delay, duration, startClose ]);

    return (
        <div
            style={{
                background: "#222",
                color: "white",
                minWidth: "360px",
                padding: "12px 16px",
                borderRadius: "8px",
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
                borderLeft: `8px solid ${colors[ variant ]}`,
                cursor: "default",
                transition: "opacity 0.3s ease, transform 0.3s ease",
                opacity: closing ? 0 : visible ? 1 : 0,
                transform: closing
                    ? "translateY(10px)"
                    : visible
                    ? "translateY(0)"
                    : "translateY(10px)",
            }}
        >
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    flex: 1,
                    whiteSpace: "normal",
                    wordBreak: "break-word",
                }}
            >
                { iconMap[ variant ] }
                <span style={{ textAlign: "left" }}>{ message }</span>
            </div>

            <button
                onClick={ startClose }
                style={{
                    color: "white",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "18px",
                    marginLeft: "10px",
                }}
            >
                ×
            </button>
        </div>
    );
}
