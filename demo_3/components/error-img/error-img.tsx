import React from "react";
import gif from "./giphy.gif";

const ErrorImg: React.FC<
  React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >
> = ({ children, ...props }) => {
  return <img {...props} src={gif} alt="error" />;
};

export default ErrorImg;
