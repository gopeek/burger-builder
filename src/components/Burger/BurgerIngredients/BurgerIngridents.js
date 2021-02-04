import React, { Component } from 'react'
import classes from './BurgerIngredients.css'
import PropTypes from 'prop-types';

/*The following code deals with the burger ingredients

    It receives a prop with a key of type this type will determine
    which ingredient will be placed on the burger


*/
class BurgerIngredients extends Component  {

    render(){
        let ingredient = null

        switch (this.props.type){
    
            case ('bread-bottom'):
                ingredient = <div className={classes.BreadBottom}></div>
                break
            
            case ('bread-top'):
                ingredient = (
                        <div className={classes.BreadTop}>
                            <div className={classes.Seeds1}></div>
                            <div className={classes.Seeds2}></div>
                        </div>
                    )
                break
            
            case ('meat'):
                ingredient = <div className={classes.Meat}></div>
                break
            
            case ('cheese'):
                ingredient = <div className={classes.Cheese}></div>
                break
    
            case ('salad'):
                ingredient = <div className={classes.Salad}></div>
                break
    
            case ('bacon'):
                ingredient = <div className={classes.Bacon}></div>
                break
            
            default:
                ingredient = null
    
        }
    
        return ingredient
    }

   
}

BurgerIngredients.propTypes ={
    type: PropTypes.string.isRequired
}

export default BurgerIngredients