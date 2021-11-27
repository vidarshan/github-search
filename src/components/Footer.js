import React, { Fragment } from "react";
import moment from "moment";
import { AiFillGithub } from "react-icons/ai";
import { Button, Row } from "antd";

const Footer = () => {
  return (
    <div className="footer">
      <Row justify="center">
        &copy; {moment().format("YYYY")} vidarshan. | Powered by Github API
      </Row>
      <Row justify="center">
        <Button
          type="link"
          href="https://github.com/vidarshanadithya"
          target="_blank"
          rel="noreferrer"
        >
          View creater on Github
        </Button>
      </Row>
    </div>
    // <div className="footer">
    //   <div class="text">
    //     &copy; {moment().format("YYYY")} vidarshan. | Powered by Github API
    //   </div>

    //   <a
    //     class="icon"
    //     href="https://github.com/vidarshanadithya"
    //     target="_blank"
    //     rel="noreferrer"
    //   >
    //     <AiFillGithub />
    //   </a>
    // </div>
  );
};

export default Footer;
