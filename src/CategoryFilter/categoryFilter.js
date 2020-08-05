import React, {Component} from 'react';

class CategoryFilter extends Component {
    
    render() {
        const { category } = this.props;    
        return (
            <option value={category}>{category}</option>
        );
    }
}

export default CategoryFilter;