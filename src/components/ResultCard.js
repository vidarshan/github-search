import React from "react";
import { Card, Image, Text } from "@mantine/core";


const ResultCard = ({ result }) => {

  return (
    <Card
      padding='xs' radius='md'
      withBorder
    >
      <Image radius='md' src={result.avatar_url} />
      <Card.Section>
        <Text align='center'>{result.login}</Text>
      </Card.Section>
      {/* <Title level={5}>{result.login}</Title> */}
      {/* <Button
        style={{
          color: "#20c162",
          borderColor: "#20c162",
          backgroundColor: "transparent",
        }}
        block
        onClick={() => handleDetailedProfile(result.login)}
      >
        View Detailed Profile
      </Button> */}
    </Card>
  );
};

export default ResultCard;
