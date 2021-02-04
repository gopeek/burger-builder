import React from 'react'
import classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl'


const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'},
]

const buildControls = props => (
    
    <div className={classes.BuildControls}>
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(cntrl => (
            <BuildControl 
                key={cntrl.label}
                label={cntrl.label}
                added={() => props.ingredientAdded(cntrl.type)}
                removed={() => props.ingredientRemoved(cntrl.type)}
                disable = {props.disabled[cntrl.type]}/>
        ))}
        <button className={classes.OrderButton}
                disabled={!props.pruchasable}
                onClick={props.ordered}>ORDER NOW</button>
    </div>
    
)


export default buildControls