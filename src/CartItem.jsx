import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    let total = 0;
    cart.forEach((plant) => {
      total += parseFloat(plant.cost.substring(1)) * plant.quantity
    });
    return total;
  };

  const handleContinueShopping = (e) => {
    onContinueShopping(e);
  };

  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };

  const handleIncrement = (plant) => {
    dispatch(updateQuantity({ name: plant.name, quantity: plant.quantity + 1 }));
  };

  const handleDecrement = (plant) => {
    dispatch(updateQuantity({ name: plant.name, quantity: plant.quantity - 1 }));
  };

  const handleRemove = (plant) => {
    dispatch(removeItem(plant.name));
  };

  // Calculate total cost based on quantity for an plant
  const calculateTotalCost = (plant) => {
    return parseFloat(plant.cost.substring(1)) * plant.quantity
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(plant => (
          <div className="cart-item" key={plant.name}>
            <img className="cart-item-image" src={plant.image} alt={plant.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{plant.name}</div>
              <div className="cart-item-cost">{plant.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(plant)}>-</button>
                <span className="cart-item-quantity-value">{plant.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(plant)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(plant)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(plant)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={(e) => handleCheckoutShopping(e)}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


