import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import 'boxicons';



const Home = () => {

    const history = useHistory();

    const [keyword, setKeyword] = useState();



    return (
        <div className='home'>
            <div class="heading">Githuber</div>
            <div class="search">
                <input type="text" placeholder='Search for a Github User' />
                <button>Search</button>
            </div>
        </div>
    )
}

export default Home
