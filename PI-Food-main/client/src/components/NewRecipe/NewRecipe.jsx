import {  useState } from 'react';
import data from '../../utils/data';
import './NewRecipe.css'
import { Link } from 'react-router-dom';
import axios from 'axios';



const NewRecipe = () => {
   
    const [inputs, setInputs] = useState({
        name: '',
        summary: '',
        healthScore: 0,
        steps: '',
        image: '',
        diets: ''
    });

    
    const [errors, setErrors] = useState({
        name: '',
        summary: '',
        healthScore: 0,
        steps: '',
        image: '',
        diets: ''
    });

    
    function validateInputs(inputs){

        const errors = {};
        if(!inputs.name) errors.name = 'falta nombre de la receta';
        if(!inputs.summary) errors.summary = 'falta resumen del plato';
        if(!inputs.healthScore) errors.healthScore = 'falta nivel de comida saludable';
        if(!inputs.steps) errors.steps = 'falta los pasos de la receta';

        return errors;

    };


    function handleChange(e) {

        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        const name = e.target.name;
    
        setInputs({
          ...inputs,
          [name]: value,
        });
    
        setErrors(validateInputs({
          ...inputs,
          [name]: value,
        }));

      }

     
      
        const handleSubmit = async (e) => {

         e.preventDefault(); 

         const errors = validateInputs(inputs);

         setErrors(errors);

         if(Object.keys(errors).length===0){

          try{
            const response = await axios.post(`http://localhost:3001/recipes`, inputs);
            console.log(`Esta es la data de respuesta http: ${response.data}`,`el objeto input enviado: ${inputs}`);
          }catch (error) {
            console.log(error);
          }
         }
         
        };

    return(
        
        <form className="full" onSubmit={handleSubmit}>
            <span className="title">Nueva receta</span>
            <div className="main">
                <span>*Este campo es obligatorio</span>
                <input type="text" name="name" placeholder="Nombre" onChange={handleChange} />
                <span>*Este campo es oblogatorio</span>
                <textarea onChange={handleChange} name="summary" id="" cols="30" rows="10" placeholder="Resumen del plato" className="textarea"></textarea>
                <span>*Este campo es obligatorio</span>
                <input type="text" name='healthScore' placeholder='healthscore' onChange={handleChange} />
                <span>*Este campo es obligatorio</span>
                <input type="text" name='steps' placeholder='Paso a paso' onChange={handleChange}/>
                {/* <span>*Este campo es obligatorio</span> */}
                <label>
                    Url imagen:
                    <input type="text" name="image" onChange={handleChange} />
                </label>
                <span>*Seleccione los tipos de dieta:</span>
                {
                    data.map(el => (
                        <label key={el.id}>
                            <input 
                            type='checkbox' 
                            name={el.diets}
                            value={el.diets}
                            checked={inputs.diets.includes(el.diets)}
                            onChange={handleChange}
                            />
                            {el.diets.join(', ')}
                        </label>
                    ))
                }
                <button>Crear Receta</button>
                <Link to='/home'>
                <h2>Volver</h2>
                </Link>
            </div>
        </form>
    )
};

export default NewRecipe;