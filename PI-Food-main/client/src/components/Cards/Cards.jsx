
import data from "../../utils/data";
import Card from "./Card";
import './Cards.css'
import Pagination from "./Pagination/Pagination";

const Cards = () => {

    const itemsPerPage = 8;
    const currentPage = 1;
    const allItems = data;
    console.log(data)

    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    const itemsToDisplay = allItems.slice(firstIndex, lastIndex);



    return(
        <div>
            <div className="cards-container">
                <h1>Recetas Disponibles</h1>
                <Card items={itemsToDisplay}/>
                <Pagination totalItems={allItems.length} itemsPerPage={itemsPerPage} />
            </div>
        </div>
    )
};


export default Cards;