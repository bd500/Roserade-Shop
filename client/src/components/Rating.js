import React from "react";
import PropTypes from 'prop-types';

function Rating({stars, reviews}){
    return (
        <div>
            <i className={
                stars >= 1
                ? "fa-solid fa-star"
                : stars >= 0.5
                ? "fa-solid fa-star-half-stroke"
                : "fa-regular fa-star"
            }></i>
            <i className={
                stars >= 2
                ? "fa-solid fa-star"
                : stars >= 1.5
                ? "fa-solid fa-star-half-stroke"
                : "fa-regular fa-star"
            }></i>
            <i className={
                stars >= 3
                ? "fa-solid fa-star"
                : stars >= 2.5
                ? "fa-solid fa-star-half-stroke"
                : "fa-regular fa-star"
            }></i>
            <i className={
                stars >= 4
                ? "fa-solid fa-star"
                : stars >= 3.5
                ? "fa-solid fa-star-half-stroke"
                : "fa-regular fa-star"
            }></i>
            <i className={
                stars >= 5
                ? "fa-solid fa-star"
                : stars >= 4.5
                ? "fa-solid fa-star-half-stroke"
                : "fa-regular fa-star"
            }></i>
        </div>
    )
}

Rating.prototype = {
    stars: PropTypes.number.isRequired,
    reviews: PropTypes.string.isRequired,
}

export default Rating;