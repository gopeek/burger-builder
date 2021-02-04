import React, {Component} from 'react'
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary'
import classes from './OrderSummary.css'
import Button from '../../UI/Button/Button'

class OrderSummary extends Component{

        //this could still be a functional component does not have to be a class
    componentDidUpdate() {
        console.log('[OrderSumarry] Did Update')
    }

    render (){

        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(igKey => {
            return (<li key={igKey}>
                    <span className={classes.OrderSummaryCapitalize}>
                        {igKey}
                    </span>: {this.props.ingredients[igKey]}
                    </li>)
        })
        return(
            <Auxiliary>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>    
            <p><strong>Total Price is R {this.props.totalPrice.toFixed(2)}</strong></p>
            <p>Continue to Checkout</p>
            <Button btnType="Danger" clicked={this.props.purchaseCanceled}>CANCEL</Button>
            <Button btnType="Success" clicked={this.props.purchaseContinue}>CONTINUE</Button>
            </Auxiliary>
        )
    }

}

export default OrderSummary