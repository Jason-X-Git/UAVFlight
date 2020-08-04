import React, { useState } from "react";
import Button from "react-bootstrap/Button";

const RecentMonths = () => {
  const [recentMonths, setRecentMonths] = useState(1);
  const buttonStyle = {margin: '0 5px', fontSize: '15px', padding: '0.01px 10px'};
  return (
    <div style={{ display: "flex" }}>
      <Button onClick={() => setRecentMonths(recentMonths + 1)} style={buttonStyle}>+1</Button>
      <div>Recent {recentMonths} Months</div>
      <Button onClick={() => setRecentMonths((recentMonths - 1)< 1? 1: recentMonths -1 )} style={buttonStyle}>-1</Button>
    </div>
  );
};

export default RecentMonths;
