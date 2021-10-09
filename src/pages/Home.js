import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import 'boxicons';
import '../assets/styles/home.scss';
import { Grid, Header, Icon, Input } from 'semantic-ui-react'

const Home = () => {

    const history = useHistory();

    const [keyword, setKeyword] = useState();



    return (
        <Grid>
            <Grid.Row className='github-home'>
                <Header size='huge'>Githuber</Header>
                <Input
                    action={{
                        icon: "search",
                        onClick: () => history.push(`/search/${keyword}`)
                    }}
                    placeholder='Search...'
                    onChange={(e) => setKeyword(e.target.value)}
                />

            </Grid.Row>
        </Grid>
    )
}

export default Home
