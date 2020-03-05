import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';
import ApiContext from '../ApiContext';
import './expenseChart.css';

class ExpenseChart extends Component {

    static contextType = ApiContext;

    getChartExpenses = (expenses, timeFrame) => {
        if(timeFrame.toLowerCase() === 'day') {
            const filteredExpenses = expenses.filter((expense) => {
                return expense.date >= Date.now()-100000000
            })
            return filteredExpenses;
        }
        else if(timeFrame.toLowerCase() === 'week') {
            const filteredExpenses = expenses.filter((expense) => {
                return expense.date >= Date.now()-700000000
            })
            return filteredExpenses;
        }
        else if(timeFrame.toLowerCase() === 'month') {
            const filteredExpenses = expenses.filter((expense) => {
                return expense.date >= Date.now()-3000000000
            })
            return filteredExpenses;
        }
        else if(timeFrame.toLowerCase() === 'year') {
            const filteredExpenses = expenses.filter((expense) => {
                return expense.date >= Date.now()-36500000000
            })
            return filteredExpenses;
        }
    }

    makeUnique = (value, index, self) => {
        return self.indexOf(value) === index;
    }

    getChartCategories = (filteredExpenses, makeUnique) => {
        const getCategories = filteredExpenses.map((item) => {
            return item.category 
        })
        return getCategories.filter(makeUnique)
    }

    sumOfCategoryExpenses = (filteredExpenses, category) => {
        const categoryGroup = filteredExpenses.filter((expense) => {
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
        
        const { expenses, budget } = this.context

        const chartCategories = this.getChartCategories(this.getChartExpenses(expenses, budget.timeFrame), this.makeUnique)

        return (
            <div className="expense-chart">
                <Doughnut 
                    data={{
                        labels: chartCategories.map((category) => {
                            return category
                        }),
                        datasets: [
                            {
                                label: 'Expenses',
                                data:
                                    chartCategories.map((category) => {
                                        return this.sumOfCategoryExpenses(this.getChartExpenses(expenses, budget.timeFrame), category)
                                    }),
                                backgroundColor: [
                                    'rgba(255, 99, 132, 0.6)',
                                    'rgba(54, 162, 235, 0.6)',
                                    'rgba(255, 206, 86, 0.6)',
                                    'rgba(75, 192, 192, 0.6)',
                                    'rgba(153, 102, 255, 0.6)',
                                    'rgba(255, 159, 64, 0.6)',
                                    'rgba(50, 99, 132, 0.6)',
                                    'rgba(2, 32, 234, 0.6)'
                                ],
                                hoverBorderWidth: 3,
                                hoverBorderColor: 'gray'
                            }
                        ]
                    }}
                    height={400}
                    options={{
                        responsive: true,
                        aspectRatio: 1,
                        maintainAspectRatio: false,
                        title: {
                            display: false,
                            text: 'Expenses',
                            fontSize: 24,
                        },
                        legend: {
                            display: true,
                            position: 'bottom',
                            fontSize: 18
                        }
                    }}
                />
            </div>
        )
    }
}

export default ExpenseChart;