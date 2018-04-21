import React, { Component } from 'react';
import client from './client'


class Recipe extends Component {

  constructor(props) {
    super(props);

    this.state = {
      items: [],
      title: '',
      description: '',
      category: '',
      nextID: 0,
    };
    this.titleChanged = this.titleChanged.bind(this);
    this.descriptionChanged = this.descriptionChanged.bind(this);
    this.categoryChanged = this.categoryChanged.bind(this);
    this.buttonClicked = this.buttonClicked.bind(this); 

  }

  componentDidMount(){
    client.getRecipes((recipes) => {
      this.setState({
        items: recipes
      });
    });
  }

  titleChanged(event) {
    this.setState({
      title: event.target.value
    });
  }

  descriptionChanged(event) {
    this.setState({
      description: event.target.value
    });
  }

  categoryChanged(event) {
    this.setState({
      category: event.target.value
    });
  }

  buttonClicked() {

    const data = {
      'id': this.state.nextID++,
      'title': this.state.title,
      'description': this.state.description,
      'category': this.state.category,
      'published_date': new Date().toISOString()
    }
    
    this.setState({
      items: [...this.state.items, data],
      title: '',
      description: '',
      category: '',
    });
    
    client.createRecipe(data, (recipe) => {
      if (recipe)
        alert('Created!');
    });  

  }

  deleteItem(id) {
    this.setState({
      items: this.state.items.filter((item) => item.id !== id)
    });

    client.deleteRecipe(id, (recipe) => {
      if(recipe)
        alert('Deleted!')
    });
  }

  render() {
    return (
      <div>
       <div className="gtco-container">
          <div className="col-lg-4 col-md-4 col-sm-6">
                <div className="fh5co-text">
                  <div>
                    {
                      this.state.items.map((item, index) =>
                        <form key={index}>
                          <h2>{item.title}</h2>
                          <p>{item.category}</p>
                          <button onClick={this.deleteItem.bind(this, item.id)}>Delete</button>
                        </form>
                      )
                    }
                  </div>
                  
                    <div className='content'>
                      <div className='ui form'>
                        
                          <label>Title</label>
                          <input value={this.state.title} onChange={this.titleChanged} />
                          <label>Description</label>
                          <input value={this.state.description} onChange={this.descriptionChanged} />
                          <label>Categoty</label>
                          <input value={this.state.category} onChange={this.categoryChanged} />
                          <button onClick={this.buttonClicked}>Add</button>
                        
                      </div>
                    
                  </div> 
                </div>
            </div>
          </div>
        
      </div>
    );
  }
}


export default Recipe;