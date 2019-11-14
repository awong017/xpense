import React, {Component} from 'react';
import './addExpenseCategory.css';

class AddExpenseCategory extends Component {
    
    render() {

        const { category } = this.props;    

        return (
            <option value={category}>{category}</option>
        );
    }
}

export default AddExpenseCategory;