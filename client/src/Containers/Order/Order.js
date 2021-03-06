import React, {Component} from 'react';
import Header from '../../Component/Header';
import Footer from '../../Component/Footer';
import { connect } from "react-redux";
import { orderFetch, orderDelete } from "../../actions";

class Order extends Component {
    constructor(prop){
        super(prop);
    }

    componentDidMount(){
        this.props.orderFetch();
    }

    delOrder(order){
        this.props.orderDelete(order.id);
    }

    showOrder(){
        return this.props.orders && this.props.orders.map(order => {
            const date = new Date(order.orderedDate)
            return(
                <div key={order.id} className="col-md-3">
                    <hr />
                    <p className="text-right">
                        <button className="btn btn-danger btn-sm title" onClick={() => this.delOrder(order)}>X</button>
                    </p>
                    <h5>Date {date.toLocaleDateString()} {date.toLocaleTimeString()}</h5>
                    <ul>
                        {order.orders && order.orders.map(record => {
                            return (
                                <li key={record.product.id}>{record.product.productName} x {record.quantity} = {record.product.unitPrice * record.quantity}</li>
                            )
                        })}
                    </ul>
                    <p className="title">Summary {order.totalPrice}</p>
                </div>
            )
        })
    }


    render(){
        return(
            <div>
                <Header />
                <div className="container-fluid">
                    <h1>Your Order</h1>
                    <div className="row">
                        {this.showOrder()}
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

function mapStateToProps(state){
    return {orders: state.orders}
}

export default connect(mapStateToProps, { orderFetch, orderDelete })(Order);
