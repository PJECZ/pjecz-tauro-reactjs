import { CSSProperties } from "react"

export const login_layout: CSSProperties = {
    display: "flex", 
    height: "100vh", 
    width: "100vw", 
    background: "#f8f9fa", 
    alignItems: "center", 
    justifyContent: "center", 
    overflow: "hidden",
}

export const login_row: CSSProperties = {
    width: "100%", 
    height: "100%", 
    background: "#fff", 
    borderRadius: 8, 
    boxShadow: "0 4px 10px rgba(116, 16, 16, 0.1)"
}

export const login_col: CSSProperties = {
    width: "100%", 
    display: "flex", 
    alignItems: "center", 
    marginBottom: '1em'
}

export const login_text: CSSProperties = {
    fontSize: "0.8em", 
    textAlign: "center", 
    color: "#6c757d", 
    marginTop: 10, 
    marginBottom: 10, 
    paddingLeft: 65, 
    paddingRight: 65
}