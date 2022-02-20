import React from "react";
import { Loader, Card } from '@mantine/core';

const Spinner = () => {
  return (
    <Card sx={{ margin: "1rem 0", display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
      padding="xl"
      radius="md"
      shadow="lg"
      withBorder>

      <Loader color='green' />
    </Card>
  );
};

export default Spinner;
