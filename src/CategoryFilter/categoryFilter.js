import React, {Component} from 'react';
import './categoryFilter.css';

class CategoryFilter extends Component {
    
    render() {

        const { category } = this.props;    

        return (
            <option value={category}>{category}</option>
        );
    }
}

export default CategoryFilter;