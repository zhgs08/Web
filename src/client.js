const BASE_URL = 'http://localhost:8000/api';

module.exports = {
   
  getRecipes(success){
    fetch(`${BASE_URL}/recipes/`)
      .then(response => response.json())
      .then(success)
  },

  createRecipe(data, success){
    fetch(`${BASE_URL}/recipes/`, {
      'method': 'POST',
      'body': JSON.stringify(data) 
    })
      .then(response => response.json())
      .then(success)
  },

  deleteRecipe(id, success){
    fetch(`${BASE_URL}/recipes/${id}/`, {
      'method': 'DELETE'
    })
      .then(response => response.json())
      .then(success)
  },

  updateRecipe(recipe, success) {
    fetch(`${BASE_URL}/recipes/${recipe.id}/`, {
      'method': 'PUT',
      'body': JSON.stringify(recipe)
    })
      .then(response => response.json())
      .then(success)
  }


  // getComments(id, success){
  //   fetch(`${BASE_URL}/topics/${id}/comments`)
  //     .then(response => response.json())
  //     .then(success)
  // },
  
  // createComment(data, topic_id, success){
  //   fetch(`${BASE_URL}/topics/${topic_id}/comments/`, {
  //     'method': 'POST',
  //     'body': JSON.stringify(data) 
  //   })
  //     .then(response => response.json())
  //     .then(success)
  // },

  // getUsers(success){
  //   fetch(`${BASE_URL}/users/`)
  //     .then(response => response.json())
  //     .then(success)
  // },

  // createUser(data, success){
  //   fetch(`${BASE_URL}/users/`, {
  //     'method': 'POST',
  //     'body': JSON.stringify(data) 
  //   })
  //     .then(response => response.json())
  //     .then(success)
  // },

  // getMyRecipes(id, success){
  //   fetch(`${BASE_URL}/users/${id}/recipes/`)
  //     .then(response => response.json())
  //     .then(success)
  // },

  // createList(id, data, success){
  //   fetch(`${BASE_URL}/users/${id}/recipes/`, {
  //     'method': 'POST',
  //     'body': JSON.stringify(data) 
  //   })
  //     .then(response => response.json())
  //     .then(success)
  // },
  
}