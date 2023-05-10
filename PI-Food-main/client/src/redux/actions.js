
export function getRecipes() {
    return function (dispatch) {
        return axios
            .get(`http://localhost:3001/recipes/`)
            .then((response) => {
                return dispatch({ type: GET_RECIPES, payload: response.data })
            })
            .catch((error) => {
                alert(error)
            })
    }
}

export function getRecipeByName(name) {
    return async function (dispatch) {
        try {
            const axiosResponse = await axios
                .get(`http://localhost:3001/recipes?name=${name}`)
            dispatch({ type: GET_RECIPE_NAME, payload: axiosResponse.data })
        } catch (error) {
            if (error.response) {
                alert(error.response.data.message);
            }
        }
    }
}


export function getRecipeDetail(id) {
    return async function (dispatch) {
        try {
            const response = await axios
            .get(`http://localhost:3001/recipes/${id}`)
            dispatch({ type: GET_RECIPE_DETAIL, payload: response.data })
        } catch (error) {
            alert(error)
        }
    }
}