import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Row, Col, Input, Typography } from "antd";
import { BsMoonStarsFill } from "react-icons/bs";
import { Fade } from "react-awesome-reveal";
import { AppShell, ActionIcon, useMantineColorScheme, Container, Space, MediaQuery, Group, Text, TextInput, useMantineTheme } from '@mantine/core';

const { Search } = Input;
const { Title } = Typography;

const Home = () => {
  const history = useHistory();


  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();

  const [keyword, setKeyword] = useState();

  const searchHandler = () => {
    if (!keyword) {
    } else {
      history.push(`/search/${keyword}`);
    }
  };

  return (
    <>
      <Container sx={{ display: 'flex', alignItems: "center", justifyContent: 'space-between', maxWidth: 'none', height: '5vh' }}>

        <Text size='xl' weight={700}>57</Text>


        <ActionIcon
          variant="outline"
          color={dark ? 'yellow' : 'blue'}
          onClick={() => toggleColorScheme()}
          title="Toggle color scheme"
        >
          {dark ? (
            <BsMoonStarsFill />
          ) : (
            <BsMoonStarsFill />
          )}
        </ActionIcon>

      </Container>
      <Container sx={{ maxWidth: 'none', height: '95vh', display: "flex", flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Text size='xl'>Github Search</Text>
        <Space h="xl" />
        <TextInput
          radius='md'
          sx={{ width: '40%' }}
          placeholder="Your name"
        />
      </Container>

    </>
    // <Fade direction={"left"}>
    //   <div className="search-page">
    //     <div className="search-container">
    //       <Row justify="center">
    //         <Title>
    //           <GithubOutlined /> {"     "}Github Search
    //         </Title>{" "}
    //       </Row>

    //       <Row justify="center">
    //         <Col xl={10} lg={10} md={16} sm={20} xs={20}>
    //           {/* <Search
    //             onChange={(e) => setKeyword(e.target.value)}
    //             size="large"
    //             placeholder="Search for a Github user"
    //             onSearch={searchHandler}
    //           /> */}
    //         </Col>
    //       </Row>
    //     </div>
    //   </div>
    // </Fade>
  );
};

export default Home;
