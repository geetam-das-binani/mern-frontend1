import React, { Fragment } from 'react'
import './Cart.css'
import CartItemCard from './CartItemCard'
export default function Cart() {
    const items={
        product:'product_id',price:100,name:'sample product',images:['dfd']
    }
  return (
    <Fragment>
    <div className="cart__page">
        <div className="cart__header">
        <p>fdsfsdf</p>
        <p>dfdfdsf</p>
        <p>dfsdf</p>
        </div>
    </div>

    <div className="cart__container">
        <CartItemCard {...items}/>
        <CartItemCard {...items}/>
        <CartItemCard {...items}/>
        <CartItemCard {...items}/>
    </div>

    </Fragment>
  )
}
