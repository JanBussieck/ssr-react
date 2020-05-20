import React from "react";

export default (Component) => {
  const { index } = window.__INITIAL__DATA__;
  return () => <Component products={index} />;
};
