// import { ExclamationCircleOutlined } from "@ant-design/icons";
// import { Typography } from "antd";

// const { Title } = Typography;

const Error = ({ error }) => {
  return (
    <div className="error">
      {/* <ExclamationCircleOutlined />
      <br />
      <Title level={4}>{error}</Title> */}
    </div>
  );
};

Error.defaultProps = {
  error: "An Error Occurred. Please Try again Later!",
};

export default Error;
