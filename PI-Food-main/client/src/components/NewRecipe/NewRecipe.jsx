
//aqui se crean nuevas recetas que eniare en formato de objeto al servidor

const NewRecipe = () => {

    return(
        <form className="full">
            <span className="title">Create Recipe</span>
            <div className="main">
                <input type="text" name="title" placeholder="Name" />
                <span>*Este campo es oblogatorio</span>
                <textarea name="" id="" cols="30" rows="10" placeholder="Summary" className="textarea"></textarea>
                <span>*Este campo es obligatorio</span>

            </div>
        </form>
    )
};

export default NewRecipe;