import data from "../../utils/data";
import './Card.css';
import {Link} from 'react-router-dom'


const Card = () => {


    return(
        <div className="card">
            {
                data.map(el => (
                    <div key={el.id}>
                        <Link to='/recipes/:id'>
                        <h2>{el.title}</h2>
                        </Link>
                        <img src={el.image} alt="" />
                        <h3>{el.diets.join(', ')}</h3>
                    </div>
                ))
            }

        </div>
    )
};

export default Card;