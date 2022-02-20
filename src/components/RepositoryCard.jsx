import React from "react";
import { Card, Text, Group, Badge, Grid, Col, Container } from "@mantine/core";
import { BsStar } from "react-icons/bs";
import { BiGitBranch } from "react-icons/bi";

const RepositoryCard = () => {
  return (
    <Card sx={{ margin: "1rem 0" }} radius="md" shadow="md" withBorder>
      <Grid>
        <Col span={8}>
          <Container
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
            fluid
          >
            <Text size="md" weight={600}>
              mern-react
            </Text>
          </Container>
        </Col>
        <Col span={4}>
          <Container
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
            fluid
          >
            <BsStar style={{marginRight:'5px'}} />
            <Text size="md" weight={600}>
              2.4K
            </Text>

            <BiGitBranch style={{  marginLeft: "1rem", marginRight:'5px' }} />
            <Text size="md" weight={600}>
              2.4K
            </Text>
          </Container>
        </Col>
      </Grid>
      <Grid>
        <Col span={8}>
          <Container
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
            fluid
          >
            <Text size="sm" weight={500}>
              A react full-stack web app
            </Text>
          </Container>
        </Col>
        <Col span={4}>
          <Container
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
            fluid
          >
            <Text size="sm" weight={800}>HTML</Text>
            
          </Container>
        </Col>
      </Grid>
    </Card>
  );
};

export default RepositoryCard;
