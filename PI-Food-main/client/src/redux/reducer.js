

//Creamos el estado inicial
const initialState = {
    recipes: [],
    startedRecipes: [],
    dietList: [],
    recipeDetail: {}
};
//Creamos el reducer
function rootReducer(state = initialState, { type, payload }) {
    //Switch case por los recipes
    switch (type) {
        case GET_RECIPES:
            return {
                ...state,
                recipes: payload,
                startedRecipes: payload
            }

        case GET_RECIPE_NAME:
            return {
                ...state,
                recipes: payload
            }

        case GET_RECIPE_DETAIL:
            return {
                ...state,
                recipeDetail: payload
            }

            
        default:
            return state;
    }
}
//Exportamos el reducer
export default rootReducer;