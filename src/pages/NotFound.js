import React from "react";
import { Paper, Text } from "@mantine/core";
import { GiCrackedDisc } from "react-icons/gi";

const NotFound = () => {
  return (
    <Paper sx={{ height: "100vh" }}>
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
