import React from 'react'
import NavigationItem from './NavigationItem/NavigationItem'
import classes from './NavigationItems.css'


const navigationItems = props => (

        <ul className={classes.NavigationItems}>
            <NavigationItem link="/" active={true}>Burger Builder</NavigationItem>           
            <NavigationItem>Checkout</NavigationItem>           
        </ul>
)

export default navigationItems


