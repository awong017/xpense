import React, {Component} from 'react';
import {Route, withRouter} from 'react-router-dom';
import Landing from './Landing/landing';
import Login from './Login/login';
import Home from './Home/home';
import Summary from './Summary/summary';
import AddExpense from './AddExpense/addExpense';
import Profile from './Profile/profile';
import NewProfile from './NewProfile/newProfile';
import uuid from 'uuid/v4';
import ApiContext from './ApiContext';
import config from './config';

class App extends Component {

  state = {
    users: [],
    userNameError: "",
    passwordError: "",
    currentUser: {},
    expenses: [],
    nameError: "",
    descriptionError: "",
    costError: "",
    categoryError: "",
    categories: [],
    currentCategory: "All",
    filteredExpenses: [],
    budget: {
      id: "0",
      budget: 0,
      userID: "user",
      timeFrame: "day"
    },
    goals: [],
    budgetError: "",
    goalError:""
  };

  // Method for logging out

  handleLogout = () => {

    this.setState({
      currentUser: {},
      expenses: [],
      categories: [],
      currentCategory: "All",
      filteredExpenses: [],
      goals: [],
    })

  }

  // Method for logging in as an existing user

  handleLogin = (event, username, password) => {

    const { users } = this.state

    event.preventDefault();

    const checkUserName = users.some((user) => {
      return user.userName === username
    })

    const verifyUser = users.find((user) => {
      return user.userName === username
    })


    if(!username) {
      this.setState({
        userNameError: "Please enter a user name"
      })
    }

    else if(!password) {
      this.setState({
        passwordError: "Please enter a valid password"
      })
    }

    else if(checkUserName === false) {
      this.setState({
        userNameError: "Unrecognized user name"
      })
    }

    else if(checkUserName === true && (verifyUser.password !== password)) {
      this.setState({
        passwordError: "Incorrect password"
      })
    }

    else {
      this.setState({
        userNameError: "",
        passwordError: ""
      })

      const loggedUser = users.find((user) => {
        return user.userName === username;
      })

      const user_id = loggedUser.id

      fetch(`${config.API_ENDPOINT}/api/expenses/${user_id}`)
        .then((res) => res.json())
        .then((resJson) => {
          const parseDate = (expense) => ({
            id: expense.id,
            date: parseInt(expense.date),
            name: expense.name,
            description: expense.description,
            cost: expense.cost,
            category: expense.category,
            userID: expense.userID
          })
          const serverExpenses = resJson.map((expense) => {
            return parseDate(expense)
          })
          this.setState({
            expenses: serverExpenses
          })
        })

      fetch(`${config.API_ENDPOINT}/api/categories/${user_id}`)
        .then((res) => res.json())
        .then((resJson) => {
          const serverCategories = resJson.map((sCategory) => {
            const newServerCategories = {
              id: uuid(),
              name: sCategory.category,
            }
            return newServerCategories;
          })
          this.setState({
            categories: serverCategories
          })
        })

      fetch(`${config.API_ENDPOINT}/api/budgets/${user_id}`)
        .then((res) => res.json())
        .then((resJson) => {
          this.setState({
            budget: 
            {
              id: resJson[0].id,
              budget: resJson[0].budget,
              userID: resJson[0].userid,
              timeFrame: resJson[0].timeframe
            }
          })
        })

      this.setState({
        currentUser: loggedUser
      })

      this.props.history.push('/home')
    }
  }

  // Method for signing up as a new user

  handleSignUp = (event, username, password) => {

    const { users } = this.state

    event.preventDefault();

    const checkUserName = users.some((user) => {
      return user.userName === username
    })

    if(!username) {
      this.setState({
        userNameError: "Please enter a user name"
      })
    }

    else if(!password) {
      this.setState({
        passwordError: "Please enter a valid password"
      })
    }

    else if(checkUserName === true) {
      this.setState({
        userNameError: "User name is already taken"
      })
    }

    else {

      this.setState({
        userNameError: "",
        passwordError: ""
      })

      const newUser = {
        id: uuid(),
        userName: username,
        password: password
      }

      this.setState((prevState) => {
        prevState.users.push(newUser)
      })

      this.setState({
        currentUser: newUser
      })

      const postUser = {
        id: newUser.id,
        username: username,
        password: password
      }

      const url = config.API_ENDPOINT + '/api/users';
      const options ={
          method: 'POST',
          body: JSON.stringify(postUser),
          headers: {
              "Content-Type": "application/json"
          }
      };

      fetch(url, options)
          .then(res => {
              if(!res.ok) {
                  throw new Error('Something went wrong, please try again later');
              }
              return res.json();
          })

      this.props.history.push('/NewProfile')
    }
  }

  // Method for saving profiles

  handleSave = (event, budgetInput, timeFrame, goal1, category1, goal2, category2) => {

    event.preventDefault();

    const { currentUser } = this.state;

    if(!budgetInput) {
      this.setState({
        budgetError: "Please input a desired budget"
      })
    }
    else if(!goal1 || !category1 || !goal2 || !category2) {
      this.setState({
        goalError: "Please input desired amount and select category"
      })
    }
    else
    {
      const newBudget = {
        id: uuid(),
        budget: budgetInput,
        userID: currentUser.userID,
        timeFrame: timeFrame
      }

      const newGoals = [
        {
          id: uuid(),
          amount: goal1,
          category: category1, 
          userID: currentUser.ID
        },
        {
          id: uuid(),
          amount: goal2,
          category: category2, 
          userID: currentUser.ID
        }
      ]

      this.setState({
        budget: newBudget,
        goals: newGoals,
        budgetError: "",
        goalError: ""
      })

      const postBudget = {
        id: newBudget.id,
        budget: parseFloat(budgetInput),
        userid: currentUser.id,
        timeframe: timeFrame
      }

      console.log('Post Budget: ', postBudget)

      const url = config.API_ENDPOINT + '/api/budgets';
      const options ={
          method: 'POST',
          body: JSON.stringify(postBudget),
          headers: {
              "Content-Type": "application/json"
          }
      };

      fetch(url, options)
          .then(res => {
              if(!res.ok) {
                  throw new Error('Something went wrong, please try again later');
              }
              return res.json();
          })

      this.props.history.push('/home')
    }
  }

  // Method for deleting expenses

  handleDelete = (id, category) => {
    const { expenses, categories, currentCategory, filteredExpenses } = this.state;

    if(currentCategory === "All" && filteredExpenses.length <= 0 ) {

      const remainingExpenses = expenses.filter((expense) => {
        return expense.id !== id
      })

      this.setState({
        expenses: remainingExpenses
      })

      const checkCategory = remainingExpenses.some((expense) => {
        return expense.category === category
      })
  
      if(checkCategory === false) {
        const remainingCategories = categories.filter((rcategory) => {
          return rcategory.name !== category
        })
  
        this.setState({
          categories: remainingCategories
        })
      }

      const url = `${config.API_ENDPOINT}/api/expenses/${id}`;
      const options ={
          method: 'DELETE'
      };

      fetch(url, options)
      .then(res => {
        if(!res.ok) {
            throw new Error('Something went wrong, please try again later');
        }
        return res.json();
      })
    }
    else
    {

      const remainingExpenses = expenses.filter((expense) => {
        return expense.id !== id
      })

      this.setState({
        expenses: remainingExpenses
      })

      const remainingFilterItems = filteredExpenses.filter((expense) => {
        return expense.id !== id
      })

      this.setState({
        filteredExpenses: remainingFilterItems
      })

      const checkCategory = remainingExpenses.some((expense) => {
        return expense.category === category
      })
  
      if(checkCategory === false) {
        const remainingCategories = categories.filter((rcategory) => {
          return rcategory.name !== category
        })
  
        this.setState({
          categories: remainingCategories
        })
      }

      const url = `${config.API_ENDPOINT}/api/expenses/${id}`;
      const options ={
          method: 'DELETE'
      };

      fetch(url, options)
      .then(res => {
        if(!res.ok) {
            throw new Error('Something went wrong, please try again later');
        }
        return res.json();
      })
    }
  }

  filterDate = (startDate, endDate) => {
    const { expenses, currentCategory } = this.state;

    if(currentCategory === "All") {
      const dateFilter = expenses.filter((expense) => {
        return startDate <= expense.date && expense.date <= endDate
      }) 
  
      this.setState({
        filteredExpenses: dateFilter
      })
    }
    else
    {
      const categoryFilter = expenses.filter((expense) => {
        return expense.category === currentCategory
      })

      const dateFilter = categoryFilter.filter((expense) => {
        return startDate <= expense.date && expense.date <= endDate
      }) 
  
      this.setState({
        filteredExpenses: dateFilter
      })
    }
  }

  addCategory = (category) => {
    const newCategory = this.state.expenses.some((expense) => {
      return expense.category === category
    })
    if(newCategory===false) {

      const addedCategory = {
        id: uuid(),
        name: category
      }

      this.setState((prevState) => {
        prevState.categories.push(addedCategory);
      })
    }
  }  


  filterCategory = (selectedCategory, search) => {
    const { expenses, filteredExpenses } = this.state;

    const categoryGroup = expenses.filter((expense) => {
      return expense.category === selectedCategory
    });

    if(selectedCategory!=="All") {
      this.setState({
        filteredExpenses: categoryGroup
      })
    }

    // else if(selectedCategory==="All" && filteredExpenses > 0) {
    //   const searchFilter = filteredExpenses.filter((expense) => {
    //     return (expense.name.toLowerCase()).includes(search.toLowerCase());
    //   })
    //   this.setState({
    //     filteredExpenses: searchFilter
    //   })
    // }

    else
    {
      this.setState({
        filteredExpenses: []
      })
    }

    this.setState({
      currentCategory: selectedCategory
    })
  }

  handleSearch = (search) => {
    const { currentCategory, expenses } = this.state;

    if(currentCategory==="All") {
      const searchFilter = expenses.filter((expense) => {
        return (expense.name.toLowerCase()).includes(search.toLowerCase());
      })
      this.setState({
        filteredExpenses: searchFilter
      })
    }  
    else
    {
      const searchFilter = expenses.filter((expense) => {
        return expense.category === currentCategory && (expense.name.toLowerCase()).includes(search.toLowerCase());
    })
    this.setState({
      filteredExpenses: searchFilter
      })
    }
  }

  // Method for adding new expenses

  handleAddExpense = (event, name, description, cost, category) => {

    const {expenses, goals } = this.state;

    event.preventDefault();

    if(!name) {
      this.setState({
        nameError: "Please provide a name"
      })
    }

    else if(!description) {
      this.setState({
        descriptionError: "Please provide a description"
      })
    }

    else if(!cost) {
      this.setState({
        costError: "Please provide a cost"
      })
    }

    else if(!category) {
      this.setState({
        categoryError: "Please provide a category"
      })
    }

    else

    {
      this.setState({
        nameError: "",
        descriptionError: "",
        costError: "",
        categoryError: "",
      })

      const newCost = Number(cost).toFixed(2);

      const newExpense = {
        id: uuid(),
        date: Date.now(),
        name: name,
        description: description,
        cost: parseFloat(newCost),
        category: category,
        userID: this.state.currentUser.id
      }

      this.setState((prevState) => {
        prevState.expenses.push(newExpense)
      })

      const postExpense = {
        id: uuid(),
        date: Date.now(),
        name: name,
        description: description,
        cost: parseFloat(newCost),
        category: category,
        userid: this.state.currentUser.id
      }
      const url = config.API_ENDPOINT + '/api/expenses';
      const options ={
          method: 'POST',
          body: JSON.stringify(postExpense),
          headers: {
              "Content-Type": "application/json"
          }
      };

      fetch(url, options)
          .then(res => {
              if(!res.ok) {
                  throw new Error('Something went wrong, please try again later');
              }
              return res.json();
          })

      this.addCategory(category);

      const checkBudgetCategory = goals.some((goal) => {
        return goal.category.toLowerCase() === category.toLowerCase()
      })

      if(checkBudgetCategory === true) {
        const findBudgetCategory = goals.find((goal) => {
          return goal.category.toLowerCase() === category.toLowerCase()
        })

        const filteredExpenses = expenses.filter((expense) => {
          return expense.category.toLowerCase() === category.toLowerCase()
        })
        const filteredExpenseCosts = filteredExpenses.map((expense) => {
          return expense.cost
        })
        const total = filteredExpenseCosts.reduce((accumulator, currentValue) => {
          return accumulator + currentValue
        }, 0)

        const reformattedTotal = (Math.round(total*100)/100).toFixed(2);
        
        if(findBudgetCategory.amount >= reformattedTotal) {
          const categoryTotal = findBudgetCategory.amount - reformattedTotal
          const reformattedCategoryTotal = (Math.round(categoryTotal*100)/100).toFixed(2);
        }
        else
        {
          const categoryTotal = reformattedTotal - findBudgetCategory.amount
          const reformattedCategoryTotal = (Math.round(categoryTotal*100)/100).toFixed(2);
        }
      }
      this.props.history.push('/summary');
    }
  }

  renderRoutes() {
    return (
      <>
        <Route exact path="/" component={Landing} />
        <Route path="/login" component={Login} />
        <Route path="/home" component={Home} />
        <Route path="/summary" component={Summary} />
        <Route path="/add" component={AddExpense} />
        <Route path="/profile" component={Profile} />
        <Route path="/newprofile" component={NewProfile} />
      </>
    );
  }

  componentDidMount() {
  
    fetch(`${config.API_ENDPOINT}/api/users`)
      .then((res) => res.json())
      .then((resJson) => this.setState({
        users: resJson
      })
    )
}

  render() {

    const value={
      users: this.state.users,
      userNameError: this.state.userNameError,
      passwordError: this.state.passwordError,
      currentUser: this.state.currentUser,
      handleSignUp: this.handleSignUp,
      handleLogin: this.handleLogin,
      expenses: this.state.expenses,
      nameError: this.state.nameError,
      descriptionError: this.state.descriptionError,
      costError: this.state.costError,
      categoryError: this.state.categoryError,
      handleAddExpense: this.handleAddExpense,
      categories: this.state.categories,
      filterCategory: this.filterCategory,
      currentCategory: this.state.currentCategory,
      filteredExpenses: this.state.filteredExpenses,
      handleSearch: this.handleSearch,
      filterDate: this.filterDate,
      handleDelete: this.handleDelete,
      budget: this.state.budget,
      goals: this.state.goals,
      budgetError: this.state.budgetError,
      goalError: this.state.goalError,
      handleSave: this.handleSave,
      handleLogout: this.handleLogout
    }

    return (
      <ApiContext.Provider value={value}>
          <main className="App_main">{this.renderRoutes()}</main>
      </ApiContext.Provider>
    );
  }

}

export default withRouter(App);
