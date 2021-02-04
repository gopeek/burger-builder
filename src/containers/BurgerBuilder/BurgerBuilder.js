import React, { Component } from 'react'
import Auxiliary from '../../hoc/Auxiliary/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrrorHandler from '../../hoc/withErrrorHandler/withErrrorHandler'
import axios from '../../axios-order'


const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}


class BurgerBuilder extends Component {
    
    state = {
        ingredients: null,
        totalPrice: 4,
        pruchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        axios.get('https://react-my-burger-8610c-default-rtdb.firebaseio.com/ingredients.json')
            .then(res => {
                this.setState({ingredients: res.data})
            })
            .catch(error =>{
                this.setState({error: true})
            })
    }

   
    

    updatePurchaseState (ingredients) {

        const sum = Object.keys(ingredients)
                        .map(igKey => {
                            return ingredients[igKey]
                        })
                        .reduce((sum, el) =>{
                            return sum + el
                        }, 0)

        this.setState({pruchasable: sum > 0})
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type]
        const updatedCount = oldCount + 1

        const updatedIngredients = {
            ...this.state.ingredients
        }

        updatedIngredients[type] = updatedCount
        
        const priceAddition = INGREDIENT_PRICES[type]
        const oldPrice = this.state.totalPrice
        const newPrice = oldPrice + priceAddition



        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        })

        this.updatePurchaseState(updatedIngredients)


    }


    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type]
        if (oldCount <= 0){
            return
        }
        const updatedCount = oldCount - 1

        const updatedIngredients = {
            ...this.state.ingredients
        }

        updatedIngredients[type] = updatedCount

        const priceSubtraction = INGREDIENT_PRICES[type]
        const oldPrice = this.state.totalPrice
        const newPrice = oldPrice - priceSubtraction

        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        })

        this.updatePurchaseState(updatedIngredients)
    }

    purchaseHandler = () => {
        this.setState({purchasing: true})
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {
        //send data to backend .json is only for firebase
        this.setState({loading:true})
        const order = {
            ingredients : this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'kushal gopee',
                address:{
                    street: 'TestStreet 1',
                    zipCode: '0041',
                    country: 'SA'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fast'
        }

        axios.post('/orders.json', order)
            .then(response => {
                console.log(response)
                this.setState({loading:false, purchasing:false})
            })
            .catch(error => {
                this.setState({loading:false, purchasing:false})
            })
    }




    render(){
        const disabledInfo = {
            ...this.state.ingredients
        }

        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0 //return true or false
            
        }

        let orderSummary = null

        if (this.state.ingredients){
            orderSummary = <OrderSummary 
            ingredients={this.state.ingredients}
            purchaseCanceled={this.purchaseCancelHandler}
            purchaseContinue={this.purchaseContinueHandler}
            totalPrice={this.state.totalPrice}/>
        }

        //show spinner or order summary logical check
        if (this.state.loading){
            orderSummary = <Spinner />
        }

        let burger = this.state.error? <p>Ingredients can't be loaded</p> : <Spinner/>

        if (this.state.ingredients){
            burger = (
                <Auxiliary>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls
                        ingredientAdded = {this.addIngredientHandler}
                        ingredientRemoved = {this.removeIngredientHandler}
                        //no this keyword cause the variable has the this property already
                        disabled = {disabledInfo} 
                        price = {this.state.totalPrice}
                        pruchasable = {this.state.pruchasable}
                        ordered ={this.purchaseHandler}/>
                </Auxiliary>
            )      
        }


        

        
       
        return(
            <Auxiliary>
                <Modal show={this.state.purchasing}
                       modalClosed={this.purchaseCancelHandler}>
                       {orderSummary}
                </Modal>
                {burger}
            </Auxiliary>
        )
    }
}

export default withErrrorHandler(BurgerBuilder, axios)