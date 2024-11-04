import React, { useEffect, useState } from 'react';
import { request } from '../axios_helper';
import { loadStripe } from '@stripe/stripe-js';

interface Skin {
    id: string;
    name: string;
    price: number; // Price in dollars
    imageUrl: string;
}

interface CartItem {
    skin: Skin;
    quantity: number;
}

export default function Shop() {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [skins, setSkins] = useState<Skin[]>([]);
    const stripePromise = loadStripe('pk_test_51QFxXbIk0uS4qh85QjN9NzoeemiGcpb7ZjetM3Zb9TX64gzHML98SwqEGw7vS8GEdD6GkzxVzLdk2p0ME6Tw3gH400aLFvq8Yo');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await request("GET", '/api/products');
                console.log(response.data);
                
                // Map response data to Skin array
                const productsWithPrices = response.data.map((product: any) => ({
                    id: product.id,
                    name: product.name,
                    price: product.price, // Price is already in dollars
                    imageUrl: product.imageUrl || '',
                }));
                setSkins(productsWithPrices);

            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const addToCart = (skin: Skin) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find(item => item.skin.id === skin.id);
            if (!existingItem) {
                return [...prevCart, { skin, quantity: 1 }];
            }
            return prevCart.map(item => 
                item.skin.id === skin.id ? { ...item, quantity: item.quantity + 1 } : item
            );
        });
    };

    const removeFromCart = (skinId: string) => {
        setCart((prevCart) => prevCart.filter(item => item.skin.id !== skinId));
    };

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.skin.price * item.quantity, 0);
    };

    const handleCheckout = async () => {
        try {
            const stripe = await stripePromise;
            if (!stripe) throw new Error('Stripe.js is not loaded');
    
            // Send a POST request with the cart to the backend
            const response = await request("POST", '/api/create-checkout-session', [...cart]);
    
            const { id } = response.data;
    
            // Redirect the user to Stripe Checkout
            const { error } = await stripe.redirectToCheckout({ sessionId: id });
            if (error) console.error(error.message);
    
        } catch (error) {
            console.error('Error during checkout:', error);
        }
    };

    return (
        <div style={{ fontSize: '20px', display: 'flex', gap: '60px' }}>
            <div style={{ margin: '20px' }}>
                <h1>Battlepass coming soon!</h1>
                <hr />
                <h2>Tired of the same old board color?</h2>
                <p>Try one of these!</p>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {skins.map(skin => (
                        <div key={skin.id} style={{ display: 'flex', flexDirection: 'column', justifyContent: "space-between", border: '1px solid #ccc', padding: '10px', width: '200px', margin: '10px' }}>
                            <img src={skin.imageUrl} alt={skin.name} style={{ width: '100%', height: '100px', objectFit: 'cover' }} />
                            <h3>{skin.name}</h3>
                            <div>
                                <p>Price: ${skin.price.toFixed(2)}</p>
                                <button onClick={() => addToCart(skin)}>Buy Now</button>
                            </div>
                        </div>
                    ))}
                </div>
                <hr />
            </div>
            <div>
                <div style={{ marginTop: '30px' }}>
                    <h2>Cart</h2>
                    {cart.length > 0 ? (
                        <>
                            <div style={{ height: "500px", overflowY: 'auto' }}>
                                {cart.map(item => (
                                    <div key={item.skin.id} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <img src={item.skin.imageUrl} alt={item.skin.name} style={{ width: '100px', height: '50px', objectFit: 'cover' }} />
                                        <div>
                                            <h4>{item.skin.name}</h4>
                                            <p>Quantity: {item.quantity}</p>
                                            <p>Price: ${(item.skin.price * item.quantity).toFixed(2)}</p>
                                            <button onClick={() => removeFromCart(item.skin.id)}>Remove</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <h3>Total: ${calculateTotal().toFixed(2)}</h3>
                            <button onClick={handleCheckout}>Checkout</button>
                        </>
                    ) : (
                        <p>Your cart is empty.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
