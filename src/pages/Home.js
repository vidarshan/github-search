import { Row, Col, Input, Space, Typography, Layout } from "antd";

import { Switch } from "antd";
import { GithubOutlined } from "@ant-design/icons";

import { Fragment, useState } from "react";

import { Fade } from "react-awesome-reveal";
import { GrSun } from "react-icons/gr";
import { BsGithub } from "react-icons/bs";
import { useHistory } from "react-router-dom";

const { Search } = Input;
const { Title } = Typography;
const { Header, Content, Footer } = Layout;

const Home = () => {
  const history = useHistory();

  const [keyword, setKeyword] = useState();
  const [disable, setDisable] = useState(true);

  const searchHandler = () => {
    if (!keyword) {
    } else {
      history.push(`/search/${keyword}`);
    }
  };

  const changeTheme = () => {
    console.log();
    var element = document.body;
    element.classList.toggle("dark-mode");
  };

  return (
    // <Fade direction={"left"}>
    <div className="search-page">
      <div className="search-container">
        <Row justify="center">
          <Title>
            <GithubOutlined /> {"     "}Github Searcher
          </Title>{" "}
        </Row>
        <Row justify="center theme-col">
          <Switch
            checkedChildren="Light"
            unCheckedChildren="Dark"
            onChange={() => changeTheme()}
            defaultChecked
          />
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
  );
};

export default Home;
