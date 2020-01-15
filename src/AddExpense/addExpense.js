import React, {Component} from 'react';
import AddExpenseNav from '../AddExpenseNav/addExpenseNav';
import AddExpenseCategory from '../AddExpenseCategory/addExpenseCategory';
import ApiContext from '../ApiContext';
import './addExpense.css';

class AddExpense extends Component {

    static contextType = ApiContext; 

    state = {
        error: null
    };

    updateExpense = (name, description, cost, category) => {
        this.setState({
            name: name,
            description: description,
            cost: cost,
            category: category
        })
    }

    render() {

        const { handleAddExpense, nameError, descriptionError, costError, categoryError, categories} = this.context;
        const { name, description, cost, category } = this.state;

        return (
            <div>
            <AddExpenseNav />
                <div className="add-expense">
                    <form onSubmit={(e)=> handleAddExpense(e, name, description, cost, category)}>
                        <legend className="add-expense-legend"><h2>New Expense</h2></legend>
                        
                            <label className="add-expense-label">Name: </label>
                            <input type="text" className="add-expense-field" onChange={(e) => this.updateExpense(e.target.value, description, cost, category)} placeholder="Name"></input>
                            <div className="error">{nameError}</div>
                        
                            <label className="add-expense-label">Description: </label>
                            <input className="description" className="add-expense-field" type="text" onChange={(e) => this.updateExpense(name, e.target.value, cost, category)} placeholder="Description"></input>
                            <div className="error">{descriptionError}</div>
                        
                        
                            <label className="add-expense-label">Cost: </label>
                            <p className="dollar-sign">$</p>
                            <input type="text" className="dollar-input" onChange={(e) => this.updateExpense(name, description, e.target.value, category)} placeholder="USD"></input>
                            <div className="error">{costError}</div>
                        
                        <div className="category-section">
                            <label className="add-expense-label">Category: </label>
                            <input type="text" className="category-input" onChange={(e) => this.updateExpense(name, description, cost, e.target.value)} placeholder="New Category"></input>
                            <div className="error">{categoryError}</div>
                            <p className="add-expense-text">or</p>
                            <div className="category-menu">
                                <select className="add-expense-category" onChange={(e) => this.updateExpense(name, description, cost, e.target.value)}>
                                    <option defaultValue>--Select Category--</option>
                                    {categories.map(category =>
                                        <AddExpenseCategory
                                            category={category.name}/>
                                        )}
                                </select>
                            </div>
                        </div>
                        <div className="add">
                            <input type="submit" className="submit-new-expense" value="Add"/>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default AddExpense;