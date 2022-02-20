import React from "react";
import moment from "moment";
import { Paper, Grid, Col, Group, Anchor, Text } from "@mantine/core";

const Footer = () => {
  return (
    <Paper sx={{ minHeight: '5vh', borderRadius: '0px', paddingBottom: '1rem' }}>
      <Text size='xs' weight={700} align='center'>By Vidarshan</Text>
      <Text sx={{ marginTop: '.5rem' }} size='xs' weight={700} align='center'>Powered by Github API</Text>
    </Paper>
  );
};

export default Footer;
