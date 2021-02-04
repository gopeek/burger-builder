import React, { Component } from 'react'
import classes from './Modal.css'
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary'
import Backdrop from '../Backdrop/Backdrop'

class Modal extends Component {
        shouldComponentUpdate(nextProps, nextState) {
            return nextProps.show !== this.props.show || nextProps.children !==this.props.children
        }

    componentDidUpdate() {
        console.log('[Modal] Did Update')
    }

    render (){
        return(
            <Auxiliary>
            <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
            <div className={classes.Modal}
                style={{
                    transform: this.props.show ? 'translaterY(0)' : 'transaltrY(-100vh)', 
                    opacity: this.props.show ? '1' : '0'
                }}>
                {this.props.children}
            </div>
            </Auxiliary>
        )
    }
}

export default Modal