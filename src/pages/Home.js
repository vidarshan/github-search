import 'boxicons';
import { useState } from 'react';
import { Fade } from 'react-awesome-reveal';
import { FaSearch } from "react-icons/fa";
import { BsGithub } from 'react-icons/bs';
import { useHistory } from 'react-router-dom';



const Home = () => {

    const history = useHistory();

    const [keyword, setKeyword] = useState();
    const [disable, setDisable] = useState(true);

    const searchHandler = (word) => {
        if (!word) {
            setDisable(true)
        } else {
            setKeyword(word)
            setDisable(false)
        }
    }

    return (
        <Fade direction={'left'}>
            <div className='home'>
                <div class="icon"><BsGithub /> </div>
                <div class="heading">Githuber</div>
                <div class="sub-heading">Github search made simple</div>
                <div class="search">
                    <input type="text" placeholder='Search for a Github User' onChange={(e) => searchHandler(e.target.value)} />
                    <button disabled={disable} className='search-btn' onClick={() => history.push(`/search/${keyword}`)}><FaSearch /></button>
                </div>
            </div>
        </Fade>
    )
}

export default Home
