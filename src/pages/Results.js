import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Grid } from 'semantic-ui-react';
import { searchUser } from '../actions/userActions';


const Results = ({ match }) => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(searchUser(match.params.word))
    }, [match, dispatch])


    return (
        <Grid>
            <Grid.Row>
                <Grid.Column computer={8} tablet={16} mobile={16}>njdje</Grid.Column>
                <Grid.Column computer={8} tablet={16} mobile={16}>grtngnj</Grid.Column>
            </Grid.Row>
        </Grid>
    )
}

export default Results
