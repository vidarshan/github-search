import React from "react";
import { Card, Text, Group, Badge, Grid, Col, Container } from "@mantine/core";
import { BsStarFill } from "react-icons/bs";
import { BiGitBranch } from "react-icons/bi";
import {GoPrimitiveDot} from 'react-icons/go';

const RepositoryCard = ({
  name,
  description,
  forksCount,
  starsCount,
  language,
  size,
}) => {
  return (
    <Card sx={{ margin: "1rem 0" }} padding='xl' radius="md" shadow="md" withBorder>
      <Grid>
        <Col span={6}>
          <Text weight={600}>{name}</Text> 
        </Col>
        <Col span={6}>
        <div style={{display:'flex', alignItems:'center', justifyContent:'flex-end', width:'100%'}}>
        <GoPrimitiveDot/>
          <Text align='right' >{language}</Text>
          </div>
        </Col>
        </Grid>
        <Grid>
       {description &&  <Col sx={{margin:'1rem 0'}} span={12}>
          <Text size="sm" style={{ lineHeight: 1.5 }}>
          {description &&description.substring(0,100)+'...'}
        </Text>
        </Col>}
        </Grid>
        <Group  direction='row' position='apart'>
          <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
          <BsStarFill color='orange' style={{marginRight:'5px'}}/> 
          <Text size='sm' weight={500}> {starsCount.toLocaleString()}</Text>
          </div>
          <div  direction='row' position='apart' style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
          <BiGitBranch color='blue' style={{marginRight:'5px'}}/> 
          <Text size='sm' weight={500}> {forksCount.toLocaleString()}</Text>
          </div>
        </Group>
        {/* <Grid>
          <Col span={6}>
          {starsCount}
          </Col>
          <Col span={6}>
            <Text>  {forksCount}</Text>
        
          </Col>
        </Grid> */}
    </Card>
  );
};

export default RepositoryCard;
