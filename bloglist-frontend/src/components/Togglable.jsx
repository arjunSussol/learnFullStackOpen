import { forwardRef, useImperativeHandle, useState } from "react"
import PropTypes from 'prop-types'

export const Togglable = forwardRef((props, ref) => {
    const[visible, setVisibility] = useState(false)
    const hideWhenVisible = {display: visible ? 'none' : ''}
    const shownWhenVisible = {display: visible ? '' : 'none'}

    const toggleVisibility = () => {
        setVisibility(!visible)
    }

    useImperativeHandle(ref, () => {
        return {
            toggleVisibility
        }
    })

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
})

Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
}

Togglable.displayName = 'Togglable'