import React from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const Loader = () => {
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  return (
    <div className="loading">
      <Spin
        style={{ fontSize: "16px", color: "#20C162" }}
        indicator={antIcon}
      />{" "}
    </div>
  );
};

export default Loader;
