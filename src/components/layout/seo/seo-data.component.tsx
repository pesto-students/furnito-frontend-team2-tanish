import React from "react";
import Helmet from "react-helmet";

function SeoDataComponent(props: { title: string }) {
  const { title } = props;
  return <Helmet title={title} />;
}

export default SeoDataComponent;
