import React from "react";
import { Paper, Text } from "@mantine/core";
import { GiCrackedDisc } from "react-icons/gi";
import { Helmet } from "react-helmet";

const NotFound = () => {
  return (
    <Paper sx={{ height: "100vh" }}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>404 | Github Search</title>
      </Helmet>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <GiCrackedDisc style={{ marginBottom: ".5rem" }} size="30" />{" "}
        <Text weight={700} size="xl">
          Not Found
        </Text>
      </div>
    </Paper>
  );
};

export default NotFound;
