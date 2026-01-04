import React from 'react';
import useCart from '../hooks/useCart';
import styles from './Cart.module.css';

const Cart: React.FC = () => {
    const { items, removeItem, decreaseCount, addItem, clearCart, totalPrice } = useCart();

    if (items.length === 0) {
        return (
            <div className={styles.empty}>
                <h2>Your cart is empty 🛒</h2>
                <p>Go browse some memes!</p>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Your Cart</h1>
                <button onClick={clearCart} className={styles.clearBtn}>Clear Cart</button>
            </div>

            <div className={styles.list}>
                {items.map(item => (
                    <div key={item.id} className={styles.item}>
                        <div className={styles.imageWrapper}>
                            <img src={item.url} alt={item.name} className={styles.image} />
                        </div>

                        <div className={styles.details}>
                            <h3>{item.name}</h3>
                            <div className={styles.meta}>
                                <span className={styles.rating}>★ {item.rating}</span>
                            </div>
                            <div className={styles.price}>${item.price} each</div>
                        </div>

                        <div className={styles.controls}>
                            <button
                                onClick={() => decreaseCount(item.id)}
                                className={styles.controlBtn}
                            >-</button>
                            <span className={styles.quantity}>{item.quantity}</span>
                            <button
                                onClick={() => addItem(item)}
                                className={styles.controlBtn}
                            >+</button>
                        </div>

                        <div className={styles.subtotal}>
                            ${(item.price || 0) * item.quantity}
                        </div>

                        <button onClick={() => removeItem(item.id)} className={styles.removeBtn}>×</button>
                    </div>
                ))}
            </div>

            <div className={styles.footer}>
                <div className={styles.totalLabel}>Total Price:</div>
                <div className={styles.totalPrice}>${totalPrice}</div>
                <button className={styles.checkoutBtn} onClick={() => alert('Thanks for buying memes!')}>Checkout</button>
            </div>
        </div>
    );
};

export default Cart;
