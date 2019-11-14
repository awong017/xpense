import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';
import ApiContext from '../ApiContext';
import './expenseChart.css';

class ExpenseChart extends Component {

    static contextType = ApiContext;

    sumOfCategoryExpenses = (category) => {
        const { expenses } = this.context
    
        const categoryGroup = expenses.filter((expense) => {
          return expense.category === category
        });
    
        const categoryCosts = categoryGroup.map((expense) => {
          return expense.cost
        })

        const categoryTotal = categoryCosts.reduce((accumulator, currentValue) => {
            return accumulator + currentValue
        }, 0)

        return categoryTotal;
      }

    render() {

        const { categories } = this.context

        return (
            <div className="expense-chart">
                <Doughnut 
                    data={{
                        labels: categories.map((category) => {
                            return category.name
                        }),
                        datasets: [
                            {
                                label: 'Population',
                                data: categories.map((category) => {
                                    return this.sumOfCategoryExpenses(category.name)
                                }),
                                backgroundColor: [
                                    'rgba(255, 99, 132, 0.6)',
                                    'rgba(54, 162, 235, 0.6)',
                                    'rgba(255, 206, 86, 0.6)',
                                    'rgba(75, 192, 192, 0.6)',
                                    'rgba(153, 102, 255, 0.6)',
                                    'rgba(255, 159, 64, 0.6)',
                                    'rgba(255, 99, 132, 0.6)'
                                ],
                                hoverBorderWidth: 3,
                                hoverBorderColor: 'gray'
                            }
                        ]
                    }}
                    width={500}
                    height={500}
                    options={{
                        // title: {
                        //     display: true,
                        //     text: 'Expenses',
                        //     fontSize: 25,
                        //     width: 25
                        // },
                        legend: {
                            display: true,
                            position: 'right'
                        }
                    }}
                />
            </div>
        )
    }
}

export default ExpenseChart;