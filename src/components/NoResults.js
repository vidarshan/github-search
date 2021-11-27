import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Typography } from "antd";

const { Title } = Typography;

const NoResults = () => {
  return (
    <div className="no-results">
      <ExclamationCircleOutlined />
      <Title level={4}> No Results</Title>
    </div>
  );
};

export default NoResults;
