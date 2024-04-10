import React from "react";
import {Icon} from "../icons/icon";
const Score = ({ score, className }) => {
  const fullStars = Math.floor(score);
  const halfStars = score % 1 !== 0 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStars;

  const renderStars = (Icon, count) => {
    return Array(count)
      .fill(null)
      .map((_, i) => <Icon key={i} />);
  };

  return (
    <div className={className}>
      {renderStars(Icon.StarFull, fullStars)}
      {renderStars(Icon.StarHalf, halfStars)}
      {renderStars(Icon.StarEmpty, emptyStars)}
    </div>
  );
};

export default Score;
