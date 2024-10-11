import React from 'react';
import PropTypes from 'prop-types';
import './Item.css';
import { Link } from 'react-router-dom';

const Item = ({ id, image, name, new_price, old_price }) => {
    const handleScroll = () => {
        window.scrollTo(0, 0);
    };

    return (
        <div className='item'>
            <Link to={`/Product/${id}`} onClick={handleScroll}>
                <img src={image || 'default-image-url.png'} alt={name} />
            </Link>
            <p>{name}</p>
            <div className="item-price">
                <div className="item-price-new">₹{new_price}</div>
                {old_price && (
                    <div className="item-price-old">₹{old_price}</div>
                )}
            </div>
        </div>
    );
};

// Adding PropTypes for validation
Item.propTypes = {
    id: PropTypes.number.isRequired,
    image: PropTypes.string,
    name: PropTypes.string.isRequired,
    new_price: PropTypes.number.isRequired,
    old_price: PropTypes.number,
};

export default Item;
