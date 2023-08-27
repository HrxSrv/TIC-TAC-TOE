import React from "react";
import "./Box.css";
import nullImage from "./assets/null.png";
import crossImage from "./assets/cross.png";
import oImage from "./assets/o.png";

const Box = (props) => {
  React.useEffect(() => {
    // Preload the images when the component mounts
    const preloadImages = [nullImage, crossImage, oImage];

    preloadImages.forEach((image) => {
      new Image().src = image;
    });
  }, []);

  return (
    <div className="imgWrap">
      <img
        onClick={() => {
          props.toggle(props.id, props.on);
        }}
        alt="open"
        src={props.on === -1 ? nullImage : props.on ? crossImage : oImage}
      />
    </div>
  );
};

export default Box;
