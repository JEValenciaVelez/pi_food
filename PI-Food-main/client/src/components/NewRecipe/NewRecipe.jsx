import { useState } from 'react';
import data from '../../utils/data';
import './NewRecipe.css'
//aqui se crean nuevas recetas que eniare en formato de objeto al servidor

const NewRecipe = () => {

    const [selectedDiets, setSelectedDiets] = useState([]);

    const handleDietChange = (e)=>{
        const {value, checked} = e.target;
        if(checked){
            setSelectedDiets(prevSelectecDiets=>[...prevSelectecDiets, value]);
        }else{
            setSelectedDiets(prevSelectecDiets=>
                prevSelectecDiets.filter(diet=> diet !== value)
                );
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Aquí iría la lógica para crear la receta
        console.log("¡Receta creada!");
      };

    return(
        <form className="full" onSubmit={handleSubmit}>
            <span className="title">Nueva receta</span>
            <div className="main">
                <span>*Este campo es obligatorio</span>
                <input type="text" name="title" placeholder="Nombre" />
                <span>*Este campo es oblogatorio</span>
                <textarea name="" id="" cols="30" rows="10" placeholder="Resumen del plato" className="textarea"></textarea>
                <span>*Este campo es obligatorio</span>
                <input type="text" name='health score' placeholder='healthscore' />
                <span>*Este campo es obligatorio</span>
                <input type="text" name='steps' placeholder='Paso a paso'/>
                <span>*Este campo es obligatorio</span>
                <label>
                    Cargar imagen:
                    <input type="file" name="image" accept="image/*" />
                </label>
                <span>*Seleccione los tipos de dieta:</span>
                {
                    data.map(el => (
                        <label key={el.id}>
                            <input 
                            type='checkbox' 
                            name={el.id}
                            value={el.id}
                            checked={selectedDiets.includes(el.id)}
                            onChange={handleDietChange}
                            />
                            {el.diets.join(', ')}
                        </label>
                    ))
                }
                <button>Crear Receta</button>
            </div>
        </form>
    )
};

export default NewRecipe;