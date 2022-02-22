import React from "react";
import { Paper, Text } from "@mantine/core";

const Footer = () => {
  return (
    <Paper sx={{ minHeight: '5vh', borderRadius: '0px', padding: '1rem 0', marginTop: '5rem', }}>
      <Text size='xs' weight={700} align='center'>By Vidarshan</Text>
      <Text sx={{ marginTop: '.5rem' }} size='xs' weight={700} align='center'>Powered by Github API</Text>
    </Paper>
  );
};

export default Footer;
