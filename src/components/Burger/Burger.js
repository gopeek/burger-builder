import React from 'react'
import classes from './Burger.css'
import BurgerIngredients from './BurgerIngredients/BurgerIngridents'


const burger = props => {

        let transformedIngredients = Object.keys(props.ingredients).map(
            igKey => {
                
                return [...Array(props.ingredients[igKey])].map(
                    (_, i) => {
                      
                      return <BurgerIngredients key={igKey + i} type={igKey} />
                      
                    }
                )
            }
        ).reduce((arr, el) => {
            return arr.concat(el)
        },[])


        /*
            The below code checks if the variable transformedIngredients is empty
            this is done in order to ask the user to select ingredients.
        */

        if (transformedIngredients.length === 0){
            transformedIngredients = <p>Please start adding ingredients</p>
        }



    console.log(transformedIngredients);
    return(
        <div className={classes.Burger}>
            <BurgerIngredients type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredients type="bread-bottom"/>
        </div>
    );
}



export default burger