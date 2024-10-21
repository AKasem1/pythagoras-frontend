import React from "react";
import pencil from "../pencil.png"

const Features = () => {
  return (
    <div className="custom-element">
      <div className="vectorimage-container">
        <img src={pencil} alt="Watermelon" />
      </div>
      <div className="rectangles-container">
        <div className="rectangle"> 💡 وفر وقتك وروق مزاجك</div>
        <div className="rectangle"> 👩🏻‍💻 أتفرج كتير زي ما تحب</div>
        <div className="rectangle"> 📝 امتحانات بشكل مستمر</div>
      </div>
    </div>
  );
};

export default Features;