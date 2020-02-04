import React, {Component} from 'react';
import CategoryFilter from '../CategoryFilter/categoryFilter';
import DateFilter from '../DateFilter/dateFilter';
import ApiContext from '../ApiContext';
import './summaryFilters.css';

class SummaryFilters extends Component {

    static contextType = ApiContext;

    state = {
        error: null,
    }

    updateSearch = (search) => {
        this.setState({
            search: search
        })
    }

    render() {

        const { categories, filterCategory, handleSearch } = this.context;

        const { search } = this.state;

        return(
            <div className="summary-filters">
                <div className="summary-category-filter">
                    <label className="category-filter-label">Category: </label>
                    <select className="filter" onChange={(e) => filterCategory(e.target.value, search)}>
                        <option defaultValue="All">All</option>
                        {categories.map((category) => 
                            <CategoryFilter 
                                key={category.id}
                                category={category.name}
                            />
                        )}
                    </select>
                </div>
                <div className="summary-search-filter">
                    <label className="search-filter-label">Search: </label>
                    <input className="filter" type="text" onChange={(e) => this.updateSearch(e.target.value, search)}></input>
                    <button type="button" className="search" onClick={() => handleSearch(search)}>Go</button>
                </div>
                <DateFilter/>
            </div>
        );
    }
}

export default SummaryFilters;