import React from "react";
import { Card, Text, Group, Grid, Col } from "@mantine/core";
import { BsStarFill } from "react-icons/bs";
import { BiGitBranch } from "react-icons/bi";
import { GoPrimitiveDot } from "react-icons/go";
import { colors } from "../data/Colors";

const RepositoryCard = ({
  name,
  description,
  forksCount,
  starsCount,
  language
}) => {
  const getColor = (language) => {

    let langColor = colors.filter((lang) => {
      return lang.language === language;
    });


    return langColor && langColor.length ? langColor[0].color : 'grey';
  };

  return (
    <Card
      sx={{ margin: "1rem 0", display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
      padding="xl"
      radius="md"
      shadow="lg"
      withBorder
    >
      <Grid>
        <Col span={6}>
          <Text weight={600}>{name}</Text>
        </Col>
        {language && (
          <Col span={6}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                width: "100%",
              }}
            >
              <GoPrimitiveDot color={getColor(language)} />
              <Text color='gray' weight={600} size='sm' align="right">{language}</Text>
            </div>
          </Col>
        )}
      </Grid>
      <Grid>
        {description && (
          <Col sx={{ marginTop: "1.5rem" }} span={12}>
            <Text size="sm" weight={500} style={{ lineHeight: 1.5 }}>
              {description && description.substring(0, 100) + "..."}
            </Text>
          </Col>
        )}
      </Grid>
      <Group sx={{ marginTop: "1.5rem" }} direction="row" position="apart">
        {starsCount && <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <BsStarFill color="orange" style={{ marginRight: "5px" }} />
          <Text color='gray' size="sm" weight={600}>
            {" "}
            {starsCount.toLocaleString()}
          </Text>
        </div>}
        {forksCount && <div
          direction="row"
          position="apart"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <BiGitBranch color="lightblue" style={{ marginRight: "5px" }} />
          <Text color='gray' size="sm" weight={600}>
            {" "}
            {forksCount.toLocaleString()}
          </Text>
        </div>}

      </Group>
    </Card>
  );
};

export default RepositoryCard;
