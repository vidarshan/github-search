import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Row, Col, Input, Typography } from "antd";
import { GithubOutlined } from "@ant-design/icons";
import { Fade } from "react-awesome-reveal";

const { Search } = Input;
const { Title } = Typography;

const Home = () => {
  const history = useHistory();

  const [keyword, setKeyword] = useState();

  const searchHandler = () => {
    if (!keyword) {
    } else {
      history.push(`/search/${keyword}`);
    }
  };

  return (
    <Fade direction={"left"}>
      <div className="search-page">
        <div className="search-container">
          <Row justify="center">
            <Title>
              <GithubOutlined /> {"     "}Github Searcher
            </Title>{" "}
          </Row>

          <Row justify="center">
            <Col xl={10} lg={10} md={16} sm={20} xs={20}>
              <Search
                onChange={(e) => setKeyword(e.target.value)}
                size="large"
                placeholder="Search for a Github user"
                onSearch={searchHandler}
              />
            </Col>
          </Row>
        </div>
      </div>
    </Fade>
  );
};

export default Home;
