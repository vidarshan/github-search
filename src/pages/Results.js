import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchUser } from "../actions/userActions";
import map from "lodash.map";
import { BsMoonStarsFill, BsAt } from "react-icons/bs";
import { VscGithub } from 'react-icons/vsc';
// import { Fade } from "react-awesome-reveal";
import { AppShell, ActionIcon, useMantineColorScheme, Container, Space, MediaQuery, Group, Text, TextInput, useMantineTheme } from '@mantine/core';

import Error from "../components/Error";
import { Grid, Col, Loader } from "@mantine/core";
import ResultCard from "../components/ResultCard";
import NoResults from "../components/NoResults";

const Results = ({ match }) => {

  const dispatch = useDispatch();

  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();

  const searchResults = useSelector((state) => state.userSearch);

  const { loading, userSearch, error } = searchResults;

  const goBackHandler = () => {
    // history.goBack();
  };

  useEffect(() => {
    var element = document.body;
    if (localStorage.getItem("theme") === "dark") {
      element.classList.toggle("dark-mode");
    } else {
      element.classList.remove("dark-mode");
    }
  }, [match]);

  useEffect(() => {
    dispatch(searchUser(match.params.word));
    var element = document.body;
    if (localStorage.getItem("theme") === "dark") {
      element.classList.toggle("dark-mode");
    } else {
      element.classList.remove("dark-mode");
    }
  }, [match, dispatch]);

  return (
    <>
      <Container sx={{ display: 'flex', alignItems: "center", justifyContent: 'space-between', height: '5vh' }} fluid>
        <Text size='md' weight={500}>57 / 60 Requests</Text>
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
      {loading ? (
        <Loader />
      ) : error ? (
        <Error />
      ) : userSearch.total_count > 0 ? (
        <>
          <Grid>
            {map(userSearch.items, (result, key) => {
              return (
                <Col xs={4} sm={4} md={3} lg={2} xl={2} span={2}>
                  <ResultCard result={result} />
                </Col>
              );
            })}
          </Grid>
          {/* <div className="results">
            <div className="results-grid">
              <Row gutter={[20, 20]} align="middle">
                {map(userSearch.items, (result, key) => {
                  return (
                    <Col key={key} xs={24} sm={12} md={8} lg={8} xl={4}>
                      <ResultCard result={result} />
                    </Col>
                  );
                })}
              </Row>
            </div>
          </div> */}
        </>
      ) : (
        <NoResults />
      )}
    </>
  );
};

export default Results;
