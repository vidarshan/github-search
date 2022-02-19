import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
// import { Fade } from "react-awesome-reveal";
// import intervalToDuration from "date-fns/intervalToDuration";
import map from "lodash.map";
// import {
//   FolderTwoTone,
//   StarTwoTone,
//   TwitterOutlined,
//   GlobalOutlined,
//   GithubOutlined,
//   UserAddOutlined,
//   UserDeleteOutlined,
//   CopyOutlined,
//   CheckOutlined,
// } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserInfo,
  getUserRepos,
  getUserStarred,
} from "../actions/userActions";
import Loader from "../components/Loader";
// import {
//   Row,
//   Col,
//   Typography,
//   Button,
//   PageHeader,
//   Card,
//   notification,
// } from "antd";
import Error from "../components/Error";


const Profile = ({ match }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const years = useRef(0);
  const months = useRef(0);
  const days = useRef(0);

  const [isCopied, setIsCopied] = useState(false);
  const [copiedLink, setCopiedLink] = useState(null);

  const getDuration = (createdDate) => {
    let interval;
    console.log(createdDate);

    if (createdDate) {
      // interval = intervalToDuration({
      //   start: new Date(),
      //   end: new Date(createdDate),
      // });

      // years.current = interval.years;
      // months.current = interval.months;
      // days.current = interval.days;
    }
  };

  const {
    loading: userLoading,
    error: userError,
    getUser: user,
  } = useSelector((state) => state.getUser);
  const {
    loading: repoLoading,
    error: repoError,
    userRepos: repos,
  } = useSelector((state) => state.userRepos);
  const {
    loading: starredLoading,
    error: starredError,
    userStarred: starred,
  } = useSelector((state) => state.userStarred);

  const goBackHandler = () => {
    history.goBack();
  };

  // const openNotificationWithIcon = (type) => {
  //   notification[type]({
  //     message: "Copied Link",
  //     description: "Repo clone URL Copied to the clipboard.",
  //   });
  // };
  const copyToClipboard = (text, id) => {
    setCopiedLink(id);
    setIsCopied(false);
    navigator.clipboard.writeText(text + ".git");
    setIsCopied(true);

    if (isCopied) {
      // openNotificationWithIcon("success");
    }
  };

  useEffect(() => {
    dispatch(getUserInfo(match.params.name));
    dispatch(getUserRepos(match.params.name));
    dispatch(getUserStarred(match.params.name));
  }, [dispatch, match]);

  return (

    <></>
  );
};

export default Profile;
