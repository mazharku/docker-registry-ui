import React, { useState } from "react";
import "./Cart.css"

export const CartBox = ({data}) => {
    console.log(data?.tag)
    const [isExpanded, setIsExpanded] = useState(false);
    const [cartCount, setCartCount] = useState(data?.tag?.length); // Set initial cart count

    // Toggle the expanded state on arrow button click
    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="cart-container">
            {/* Top Cart */}
            <div className="cart">
                <div className="cart-content">
                    <div className="cart-title">{data?.name}</div>
                    <div className="cart-icon">
                        <span className="cart-count">{cartCount}</span>
                        <button className="cart-button" onClick={toggleExpand}>
                            <span className="button-icon">➤</span>
                        </button>
                    </div>
                </div>
            </div>

            {isExpanded && (
                <div className="child-cart-list">
                    {data?.tag?.map((item) => (
                        <ChildCart item={item} />
                    ))}
                </div>
            )}
        </div>
    );

};

const ChildCart = ({item}) => {
    return (
        <div className="child-cart">
            <div className="child-cart-content">
                <div className="child-cart-tag">TAG: {item}</div>
                <div className="child-cart-actions">
                    <button className="details-button">Details</button>
                    <button className="delete-button">Delete</button>
                </div>
            </div>
        </div>
    );
};
