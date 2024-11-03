import React, { useEffect, useState } from 'react';

// Typ för ett skin
interface Skin {
    id: string; // Changed to string to match Stripe product IDs
    name: string;
    price: number; // You can store price as number for calculation
    imageUrl: string;
}

// Typ för ett kundvagnsobjekt
interface CartItem {
    skin: Skin;
    quantity: number;
}

export default function Shop() {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [skins, setSkins] = useState<Skin[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('/api/products');
                const data = await response.json();

                // Map product data to Skin format
                const skinData: Skin[] = data.flatMap((product: { prices: any[]; id: any; name: any; images: any[]; }) => 
                    product.prices.map((price: { unit_amount: number; }) => ({
                        id: product.id,
                        name: product.name,
                        price: price.unit_amount / 100, // Stripe stores prices in cents
                        imageUrl: product.images[0], // Assuming the first image is the primary
                    }))
                );

                setSkins(skinData);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const addToCart = (skin: Skin) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find(item => item.skin.id === skin.id);
            if (existingItem) {
                return prevCart.map(item =>
                    item.skin.id === skin.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prevCart, { skin, quantity: 1 }];
        });
    };

    const removeFromCart = (skinId: string) => {
        setCart((prevCart) => prevCart.filter(item => item.skin.id !== skinId));
    };

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.skin.price * item.quantity, 0);
    };

    const handleCheckout = async (priceId: string) => {
        try {
            const response = await fetch('/api/payments/create-checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ priceId }),
            });

            if (!response.ok) {
                throw new Error('Failed to create checkout session');
            }

            const sessionUrl = await response.text();
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
                                <button onClick={() => handleCheckout(skin.id)}>Buy Now</button>
                            </div>
                        </div>
                    ))}
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
                            <h3>Total: ${calculateTotal()}</h3>
                            <button onClick={() => handleCheckout(cart[0].skin.id)}>Checkout</button>
                        </>
                    ) : (
                        <p>Your cart is empty.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
