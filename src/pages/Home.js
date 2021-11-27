import { Row, Col, Input, Space, Typography, Layout } from "antd";

import { Switch } from "antd";
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";

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
          <Title level={1}>
            Githuber <GrSun />
            <Switch
              unCheckedChildren="Dark"
              onChange={() => changeTheme()}
              defaultChecked
            />
          </Title>
        </Row>
        <Row justify="center">
          <Title level={4}>Github search made simple!</Title>
        </Row>
        <Row justify="center">
          <Col span={12}>
            <Search
              onChange={(e) => setKeyword(e.target.value)}
              size="large"
              placeholder="input search text"
              onSearch={searchHandler}
            />
          </Col>
        </Row>
        <Row justify="center">
          <Title level={5}>Powered by Github API</Title>
        </Row>
        <Row justify="center">
          <Title level={5}>&copy; vidarshan</Title>
        </Row>
      </div>
    </div>
    // <div className="home">
    //     <div class="icon">
    //       <BsGithub />{" "}
    //     </div>
    //     <div class="heading">Githuber</div>
    //     <div class="sub-heading">Github search made simple</div>
    //     <div class="search">
    //       <input
    //         type="text"
    //         placeholder="Search for a Github User"
    //         onChange={(e) => searchHandler(e.target.value)}
    //       />
    //       <button
    //         disabled={disable}
    //         className="search-btn"
    //         onClick={() => history.push(`/search/${keyword}`)}
    //       >
    //         <FaSearch />
    //       </button>
    //     </div>
    //   </div>
    // </Fade>
  );
};

export default Home;
