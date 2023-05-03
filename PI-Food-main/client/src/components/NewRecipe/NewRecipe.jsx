import {  useState } from 'react';
import data from '../../utils/data';
import './NewRecipe.css'
import { Link } from 'react-router-dom';
import axios from 'axios';

//aqui se crean nuevas recetas que eniare en formato de objeto al servidor

const NewRecipe = () => {
    // inicializo los etados del componente del cual voy a obtener data del form y la voy a guardar en inputs
    const [inputs, setInputs] = useState({
        name: '',
        summary: '',
        healthScore: 0,
        steps: '',
        image: '',
        diets: ''
    });

    // creo un estado para el objeto errors si hay errores
    const [errors, setErrors] = useState({
        name: '',
        summary: '',
        healthScore: 0,
        steps: '',
        image: '',
        diets: ''
    });

    //funcion que valida la data de mis inputs
    function validateInputs(inputs){

        const errors = {};
        if(!inputs.name) errors.name = 'falta nombre de la receta';
        if(!inputs.summary) errors.summary = 'falta resumen del plato';
        if(!inputs.healthScore) errors.healthScore = 'falta nivel de comida saludable';
        if(!inputs.steps) errors.steps = 'falta los pasos de la receta';

        return errors;

    };

// funcion que le asigna la data ingresada a mis inputs a mi objeto input
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

     
      //funcion que envia la data a mi servidor, debe ser asyncrona para esperar respuesta y seguir ejecutando el codigo 
        const handleSubmit = async (e) => {
         e.preventDefault(); //evito q se refresque la pagina la hacer clickc en submit

         const errors = validateInputs(inputs);//valido que el objeto input tenga la data solicitada

         setErrors(errors);//seteo el objeto errors deacuerdo a la validacion anterior

         // Si no hay errores en los inputs, realizamos la solicitud HTTP POST al servidor
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