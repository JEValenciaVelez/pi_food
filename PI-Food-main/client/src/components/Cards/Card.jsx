import data from "../../utils/data";
import './Card.css'


const Card = () => {

  


    return(
        <div className="card">
            {
                data.map(el => (
                    <div key={el.id}>
                        <h2>{el.title}</h2>
                        <img src={el.image} alt="" />
                        <h3>{el.diets.join(', ')}</h3>
                    </div>
                ))
            }

        </div>
    )
};

export default Card;