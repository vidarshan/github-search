import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { searchUser } from "../actions/userActions";
import map from "lodash.map";
import { Fade } from "react-awesome-reveal";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { Row, Col, PageHeader } from "antd";
import ResultCard from "../components/ResultCard";

const Results = ({ match }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const searchResults = useSelector((state) => state.userSearch);

  const { loading, userSearch, error } = searchResults;

  const goBackHandler = () => {
    history.goBack();
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
    <Fade direction={"left"}>
      {loading ? (
        <Loader />
      ) : error ? (
        <Error />
      ) : (
        <>
          <div className="results">
            <PageHeader
              className="site-page-header"
              onBack={() => goBackHandler()}
              title="Back to Home"
            />
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
          </div>
        </>
      )}
    </Fade>
  );
};

export default Results;
