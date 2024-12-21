import React, { useState, useEffect } from 'react';
import './Tooltip.css'; // Add tooltip styles

const Tooltip = ({ text, target }) => {
  const [style, setStyle] = useState({});

  useEffect(() => {
    if (target) {
      const rect = target.getBoundingClientRect();
      setStyle({
        top: rect.top + window.scrollY - 40, // Adjust top offset
        left: rect.left + window.scrollX + rect.width / 2, // Adjust left offset
      });
    }
  }, [target]);

  return (
    <div className="tooltip" style={style}>
      {text}
    </div>
  );
};

export default Tooltip;
