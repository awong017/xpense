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

    updateExpense = (date, name, description, cost, category) => {
        this.setState({
            date: date,
            name: name,
            description: description,
            cost: cost,
            category: category
        })
    }

    render() {

        const { handleAddExpense, dateError, nameError, descriptionError, costError, categoryError, categories} = this.context;
        const { date, name, description, cost, category } = this.state;

        return (
            <div>
            <AddExpenseNav />
                <div className="add-expense">
                    <form onSubmit={(e)=> handleAddExpense(e, date, name, description, cost, category)}>
                        <legend className="add-expense-legend"><h2>New Expense</h2></legend>

                            <label className="add-expense-label">Date: </label>
                            <input type="text" className="add-expense-field" onChange={(e) => this.updateExpense(e.target.value, name, description, cost, category)} placeholder="mm-dd-yy"></input>
                            <div className="error">{dateError}</div>
                        
                            <label className="add-expense-label">Name: </label>
                            <input type="text" className="add-expense-field" onChange={(e) => this.updateExpense(date, e.target.value, description, cost, category)} placeholder="Name"></input>
                            <div className="error">{nameError}</div>
                        
                            <label className="add-expense-label">Description: </label>
                            <textarea className="add-expense-field new-expense-description" type="text" onChange={(e) => this.updateExpense(date, name, e.target.value, cost, category)} placeholder="Description"></textarea>
                            <div className="error">{descriptionError}</div>
                        
                            <label className="add-expense-label">Cost: </label>
                            <p className="dollar-sign">$</p>
                            <input type="text" className="cost-input" onChange={(e) => this.updateExpense(date, name, description, e.target.value, category)} placeholder="USD"></input>
                            <div className="error">{costError}</div>
                        
                        <div className="category-section">
                            <label className="add-expense-label">Category: </label>
                            <input type="text" className="category-input" id="category-input" 
                            onChange={(e) => {this.updateExpense(date, name, description, cost, e.target.value)}}
                            placeholder="New Category"></input>
                            <p className="add-expense-text">or</p>
                            <select className="add-expense-category" 
                            onChange={(e) => {this.updateExpense(date, name, description, cost, e.target.value); 
                                            document.getElementById("category-input").value="";}}>
                                <option defaultValue>--Select Category--</option>
                                {categories.map(category =>
                                    <AddExpenseCategory
                                        category={category.name}/>
                                    )}
                            </select>
                            <div className="error">{categoryError}</div>
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