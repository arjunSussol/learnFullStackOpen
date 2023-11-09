import React from "react";

export const Notification = ({message}: {message: string}) => {
    if(!message) return null;

    return(
        <div style={errorStyle}>{message}</div>
    )
}

const errorStyle: React.CSSProperties = {
    backgroundColor: 'lightgrey',
    color: 'green',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
};