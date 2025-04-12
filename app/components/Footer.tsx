import React from "react";
const date = new Date();
const Footer = () => {
  return (
    <footer className="text-center mt-20 capitalize text-xl font-normal">
      this website designed by JDCoding &copy; {date.getFullYear()}
    </footer>
  );
};

export default Footer;
