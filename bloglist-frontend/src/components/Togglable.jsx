import { useState } from "react"

export const Togglable = (props) => {
    const[visible, setVisibility] = useState(false)
    const hideWhenVisible = {display: visible ? 'none' : ''}
    const shownWhenVisible = {display: visible ? '' : 'none'}

    const toggleVisibility = () => {
        setVisibility(!visible)
    }

    return(
        <>
            <div style={hideWhenVisible}>
                <button onClick={toggleVisibility}>{props.buttonLabel}</button>
            </div>
            <div style={shownWhenVisible}>
                {props.children}
                <button onClick={toggleVisibility}>Cancel</button>
            </div>
        </>
    )
}