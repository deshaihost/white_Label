import { useState } from 'react';
import './priceSlider.css';

const tier1pricing = {1:7, 11:6, 51:5};
const tier2pricing = {1:10, 11:8, 51:6};

const PriceSlider = () => {
    const [quantity, setQuantity] = useState(1);

    const handleQuantityChange = (e) => {
        const rawValue = e.target.value;
        if (rawValue < 0) return;
        const numValue = parseInt(rawValue, 10);
        let value = '';
        if (!isNaN(numValue)) {
            //value = Math.min(Math.max(0, numValue), 10000);
            if (numValue > 100000) { return; }
            value = numValue;
        }
        setQuantity(value);
    };

    const calculateTotal = (pricing, qty) => {
        let total = 0;
        const brackets = Object.keys(pricing).map(Number).sort((a,b)=>a-b);
        for (let i = 0; i < brackets.length; i++) {
            const start = brackets[i];
            const rate = pricing[start];
            const next = brackets[i + 1] || Infinity;
            if (qty >= start) {
                const bracketQty = Math.min(qty, next - 1) - start + 1;
                total += bracketQty * rate;
            }
        }
        return total;
    };

    const formatNumber = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const formatPrice = (price) => {
        const formattedPrice = formatNumber(price);
        return (
            <span className="price-value">
                ${formattedPrice}
                {price > 0 && <span className="per-month">/month</span>}
            </span>
        );
    };

    const tier1Total = calculateTotal(tier1pricing, quantity);
    const tier2Total = calculateTotal(tier2pricing, quantity);

    return (
        <div className="price-slider-container">
            <div className="price-slider-section">
                <div className="price-label">Your property count</div>
                <input 
                    className="form-control price-slider-input" 
                    type="number"
                    value={quantity} 
                    onChange={handleQuantityChange}
                />
            </div>
            <div className="price-slider-section">
                <div className="price-label">HostBuddy Pro</div>
                {formatPrice(tier1Total)}
            </div>
            <div className="price-slider-section">
                <div className="price-label">HostBuddy Elite</div>
                {formatPrice(tier2Total)}
            </div>
        </div>
    );
}

export default PriceSlider;