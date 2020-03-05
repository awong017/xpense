import React, {Component} from 'react';
import ApiContext from '../ApiContext';
import './summaryItem.css';
import { format } from 'date-fns';

class SummaryItem extends Component {

    static contextType = ApiContext;

    render() {

        const {id, date, name, category, amount } = this.props;
        const { handleDelete } = this.context;
        const formattedAmount = (Math.round(amount*100)/100).toFixed(2);

        return (
            <div>
                <ul className="summary-item">
                    <li className="summary-detail">{format(date, 'M/d/yy')}</li>
                    <li className="summary-detail">{name}</li>
                    <li className="summary-detail category-detail">{category}</li>
                    <li className="summary-detail">${formattedAmount}</li>
                    <li className="summary-detail-button">
                        <button className="delete-button" onClick = {()=>handleDelete(id, category)}>X</button>
                    </li>
                </ul>
            </div>
        );
    }
}

export default SummaryItem;