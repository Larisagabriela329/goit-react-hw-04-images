import React from "react";

const Button = ({ onClick }) => {
  return (
    <button className="button" onClick={onClick}>
      Load more
    </button>
  );
};

export default Button;
