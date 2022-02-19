import React, { useEffect, useRef, useState } from "react";
import {
  getUserInfo,
  getUserRepos,
  getUserStarred,
} from "../actions/userActions";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { useDispatch, useSelector } from "react-redux";
import { useNotifications } from '@mantine/notifications';
import { searchUser } from "../actions/userActions";


const Profile = ({ match }) => {

  const dispatch = useDispatch();

  // const years = useRef(0);
  // const months = useRef(0);
  // const days = useRef(0);

  // const [isCopied, setIsCopied] = useState(false);
  // const [copiedLink, setCopiedLink] = useState(null);


  const searchResults = useSelector((state) => state.userSearch);

  const { loading, userSearch, error } = searchResults;

  // const getDuration = (createdDate) => {
  //   let interval;
  //   console.log(createdDate);

  //   if (createdDate) {
  //     // interval = intervalToDuration({
  //     //   start: new Date(),
  //     //   end: new Date(createdDate),
  //     // });

  //     // years.current = interval.years;
  //     // months.current = interval.months;
  //     // days.current = interval.days;
  //   }
  // };

  // const {
  //   loading: userLoading,
  //   error: userError,
  //   getUser: user,
  // } = useSelector((state) => state.getUser);
  // const {
  //   loading: repoLoading,
  //   error: repoError,
  //   userRepos: repos,
  // } = useSelector((state) => state.userRepos);
  // const {
  //   loading: starredLoading,
  //   error: starredError,
  //   userStarred: starred,
  // } = useSelector((state) => state.userStarred);

  // const goBackHandler = () => {
  //   // history.goBack();
  // };

  // const openNotificationWithIcon = (type) => {
  //   notification[type]({
  //     message: "Copied Link",
  //     description: "Repo clone URL Copied to the clipboard.",
  //   });
  // };
  // const copyToClipboard = (text, id) => {
  //   setCopiedLink(id);
  //   setIsCopied(false);
  //   navigator.clipboard.writeText(text + ".git");
  //   setIsCopied(true);

  //   if (isCopied) {
  //     // openNotificationWithIcon("success");
  //   }
  // };

  useEffect(() => {
    console.log('fsfsdf')
    // dispatch(getUserInfo(match.params.name));
    // dispatch(getUserRepos(match.params.name));
    // dispatch(getUserStarred(match.params.name));
  }, [dispatch, match]);

  return (

    <>
      <div>dsfdsfdsf</div>
    </>
  );
};

export default Profile;
