import React, { useState } from 'react';
import { request } from '../axios_helper';

// Typ för ett skin
interface Skin {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    priceId: string; // Add priceId here to associate with Stripe
}

// Typ för ett kundvagnsobjekt
interface CartItem {
    skin: Skin;
    quantity: number;
}

// Skin-data (som exempel)
const skins: Skin[] = [
    { id: 1, name: "Halloween Wonders", price: 50, imageUrl: "https://userstyles.org/style_screenshots/260526_after.png?r=1730102411", priceId: "price_1HXXXX" },
    { id: 2, name: "Pro Gamer", price: 70, imageUrl: "https://userstyles.org/style_screenshots/261889_after.png?r=1730361617", priceId: "price_1HXXXX" },
    { id: 3, name: "Rich", price: 60, imageUrl: "https://userstyles.org/style_screenshots/260672_after.png?r=1730361668", priceId: "price_1HXXXX" },
];

export default function Shop() {
    const [cart, setCart] = useState<CartItem[]>([]);

    const addToCart = (skin: Skin) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find(item => item.skin.id === skin.id);
            if (existingItem) {
                // Om skin redan finns i kundvagnen, öka antal
                return prevCart.map(item =>
                    item.skin.id === skin.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prevCart, { skin, quantity: 1 }];
        });
    };

    const removeFromCart = (skinId: number) => {
        setCart((prevCart) => prevCart.filter(item => item.skin.id !== skinId));
    };

    // Beräkna totalpris
    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.skin.price * item.quantity, 0);
    };

    const handleCheckout = async (priceId: string) => {
        try {
            const response = await request('POST', 'https://mrsluggan.github.io/api/payments/create-checkout-session', { priceId });

            if (!response) {
                throw new Error('Failed to create checkout session');
            }

            const sessionUrl = await (response as any).text();
            // Redirect the user to the Stripe Checkout page
            window.location.href = sessionUrl;

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
                <div style={{ display: 'flex' }}>
                    {/* Lista över skins */}
                    {skins.map(skin => (
                        <div key={skin.id} style={{ display: 'flex', flexDirection: 'column', justifyContent: "space-between", border: '1px solid #ccc', padding: '10px', width: '200px' }}>
                            <img src={skin.imageUrl} alt={skin.name} style={{ width: '100%', height: '100px' }} />
                            <h3>{skin.name}</h3>
                            <div>
                                <p>Price: ${skin.price}</p>
                                <button onClick={() => addToCart(skin)}>Buy Now</button>
                            </div>
                        </div>
                    ))}
                </div>
                <div style={{ listStyle: 'none', marginTop: '30px' }}>
                </div>
                <hr />
            </div>
            <div>
                <div style={{ marginTop: '30px', }}>
                    <h2>Cart</h2>
                    {cart.length > 0 ? (
                        <>
                            <div style={{ height: "500px", overflowX: 'auto' }} >
                                {cart.map(item => (
                                    <div key={item.skin.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', }}>
                                        <img src={item.skin.imageUrl} alt={item.skin.name} style={{ width: '100px', height: '50px' }} />
                                        <div>
                                            <h4>{item.skin.name}</h4>
                                            <p>Quantity: {item.quantity}</p>
                                            <p>Price: ${item.skin.price * item.quantity}</p>
                                            <button onClick={() => removeFromCart(item.skin.id)}>Remove</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div>
                            <h3>Total: ${calculateTotal()}</h3>
                            <button onClick={() => handleCheckout(cart[0].skin.priceId)}>Checkout</button> {/* Checkout button, using the first item's priceId */}
                            </div>
                            
                        </>
                    ) : (
                        <p>Your cart is empty.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
