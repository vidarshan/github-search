import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { searchUser } from "../actions/userActions";
import map from "lodash.map";
import { Fade } from "react-awesome-reveal";
import { FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { Row, Col, Divider, Card, Button, Typography, PageHeader } from "antd";
import ResultCard from "../components/ResultCard";

const { Meta } = Card;
const { Title } = Typography;

const Results = ({ match }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const searchResults = useSelector((state) => state.userSearch);

  const { loading, userSearch, error } = searchResults;

  const goBackHandler = () => {
    history.goBack();
  };

  useEffect(() => {
    dispatch(searchUser(match.params.word));
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
                {map(userSearch.items, (result) => {
                  return (
                    //   <Link className="result-card" to={`/profile/${result.login}`}>

                    <Col xs={20} sm={16} md={12} lg={8} xl={4}>
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
