import React from 'react';
import EditableRecipeList from './EditableRecipeList';
import ToggleableRecipeForm from './ToggleableRecipeForm';
import helpers from '../utils/helpers';
import Login from './Login';

import client from '../client'

class Home extends React.Component {
	constructor(props) {
    super(props);

    this.state = {
      recipes: [],
      username: 'zhgs',
      password: 'zhgs',
     
      comments: [
        {
          id: "",
          username: "",
          userComment: "",
        },
      ],
      text: '',
    };
  }

  componentDidMount(){
    client.getRecipes((recipes) => {
      this.setState({
        recipes: recipes
      });
    });
  }
 
  handleCreateFormSubmit = (recipe) => {
    this.createRecipe(recipe);
  };

  createRecipe = (recipe) => {
    const data = helpers.newRecipe(recipe);
    
    client.createRecipe(data, (recipe) => {
        console.log(recipe)
      if (recipe)
        this.setState({
          recipes: [...this.state.recipes, recipe],
          title: '',
          description: '',
          category: '',
        });
    });  
  };


  handleEditFormSubmit = (recipe) => {
    this.updateRecipe(recipe)
  };


  updateRecipe = (newRecipe) => {
    console.log(newRecipe)

    client.updateRecipe(newRecipe, (response) => {
      console.log(response)
    });

    const newArr = this.state.recipes.map((recipe) => {
      if (recipe.id === newRecipe.id) {
        return Object.assign({}, recipe, {
          title: newRecipe.title,
          description: newRecipe.description,
        });
      } else {
        return recipe;
      }
    });
      
    this.setState({
      recipes: newArr,
    });    
  };

  handleCommentFormSubmit = (comment) => {
    this.newComment(comment)
  };


  newComment = (newComment) => {
  
    const newArr = this.state.comments.map((comment) => {
      if (comment.id === newComment.id) {
        return Object.assign({}, comment, {
          comments: newArr,
          username: newComment.username,
          userComment: newComment.userComment,
        });
      } else {
        return comment;
      }
    });
    
    this.setState({
      comments: newArr,
    });    
  };


  handleTrashClick = (recipeId) => {
    this.deleteRecipe(recipeId);
  };

  deleteRecipe = (recipeId) => {
    this.setState({
      recipes: this.state.recipes.filter(recipe => recipe.id !== recipeId),
    })
    client.deleteRecipe(recipeId, (recipe) => {
      if(recipe)
        console.log('Deleted!')
    });
  };

  handleChangeUsername (text) {
    this.setState ({username: text});
  }

  handleChangePassword (text) {
    this.setState ({password: text});
  }


  render() {
    if (!this.state.username || !this.state.password) {
      return (
        <div>
          <Login />
        </div>
      );
    }
    return (
      <div className="gtco-container">
              <div className="fh5co-text">
                <div className='extra content'>
                         
                <EditableRecipeList
                  recipes={this.state.recipes}
                  onFormSubmit={this.handleEditFormSubmit}
                  onTrashClick={this.handleTrashClick}
                />
                <ToggleableRecipeForm
                  onFormSubmit={this.handleCreateFormSubmit}
                />
                  
              </div>
            </div>
          </div>
  
    );
  }
}

export default Home;