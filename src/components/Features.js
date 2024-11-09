import React from "react";
import pencil from "../pencil.png"
import {motion} from 'framer-motion';
import { fadeIn } from '../variants';

const Features = () => {
  return (
    <div className="custom-element">
      <motion.div
      variants={fadeIn("right", 0.4)}
      initial="hidden"
      whileInView={"show"}
      className="custom-element"
      viewport={{once: false, amount: 0.5}}
      >
      <div className="vectorimage-container">
        <img src={pencil} alt="Watermelon" />
      </div>
      <div className="rectangles-container">
        <div className="rectangle"> 💡 وفر وقتك وروق مزاجك</div>
        <div className="rectangle"> 👩🏻‍💻 أتفرج كتير زي ما تحب</div>
        <div className="rectangle"> 📝 امتحانات بشكل مستمر</div>
      </div>
      </motion.div>
      </div>
  );
};

export default Features;