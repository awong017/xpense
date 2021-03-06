import React, {Component} from 'react';
import {Route, withRouter} from 'react-router-dom';
import Landing from './Landing/landing';
import Login from './Login/login';
import Home from './Home/home';
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
    dateError: "",
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
    budgetError: "",
    timeFrameError: "",
  };

  // Method for adding an expense to the expense summary. Used in
  // the AddExpense component.

  handleAddExpense = (event, date, name, description, cost, category) => {
    event.preventDefault();

    if(!date) {
      this.setState({
        dateError: "Please provide a date"
      })
    }
    else if(!name) {
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
    else if(isNaN(cost)) {
      this.setState({
        costError: "Please provide a valid cost in USD"
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
        dateError: "",
        nameError: "",
        descriptionError: "",
        costError: "",
        categoryError: "",
      })

      const newCost = Number(cost).toFixed(2);
      const newExpense = {
        id: uuid(),
        date: new Date(date).getTime(),
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
        id: newExpense.id,
        date: newExpense.date,
        name: newExpense.name,
        description: newExpense.description,
        cost: newExpense.cost,
        category: newExpense.category,
        userid: newExpense.userID
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
      this.props.history.push('/home');
    }
  }

  // Method for adding a category while adding an expense to the expense summary. 
  // Used in the AddExpense component.

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

  // Method for logging into a user account. 
  // Used in the Login component.

  handleLogin = (event, username, password) => {

    const { users } = this.state

    event.preventDefault();

    const checkUserName = users.some((user) => {
      return user.userName.toLowerCase() === username.toLowerCase()
    })

    const verifyUser = users.find((user) => {
      return user.userName.toLowerCase() === username.toLowerCase()
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
        return user.userName.toLowerCase() === username.toLowerCase();
      })

      const user_id = loggedUser.id

      fetch(`${config.API_ENDPOINT}/api/expenses/${user_id}`)
        .then((res) => res.json())
        .then((resJson) => {
          if(resJson.length === undefined) {
            this.setState({
              expenses: []
            })
          }
          else
          {
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
          }
        })

      fetch(`${config.API_ENDPOINT}/api/categories/${user_id}`)
        .then((res) => res.json())
        .then((resJson) => {
          if(resJson.length === undefined) {
            this.setState({
              categories: []
            })
          }
          else
          {
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
          }
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

  // Method for logging out of a user account. 
  // Used in all Nav components except for the landingNav,
  // loginNav, and newProfileNav.

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

  // Method for signing up for a new user account. 
  // Used in the login component.

  handleSignUp = (event, username, password) => {

    const { users } = this.state

    event.preventDefault();

    const checkUserName = users.some((user) => {
      return user.userName.toLowerCase() === username.toLowerCase()
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

  // Method for creating a new user profile. 
  // Used in the newProfile component.

  handleSaveNewProfile = (event, budgetInput, timeFrame, goal1, category1, goal2, category2) => {

    event.preventDefault();

    const { currentUser } = this.state;

    if(!budgetInput) {
      this.setState({
        budgetError: "Please input a desired budget"
      })
    }
    else if(isNaN(budgetInput)) {
      this.setState({
        budgetError: "Please provide a valid desired budget"
      })
    }
    else if(!timeFrame) {
      this.setState({
        budgetError: "",
        timeFrameError: "Please select a time frame"
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
        timeFrameError: "",
        goalError: ""
      })

      const postBudget = {
        id: newBudget.id,
        budget: parseFloat(budgetInput),
        userid: currentUser.id,
        timeframe: timeFrame
      }

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

  // Method for updating user budget. 
  // Used in the profile component.

  handleUpdateProfile = (event, budgetInput, timeFrame) => {

    event.preventDefault();

    const { budget } = this.state;

    if(!budgetInput) {
      this.setState({
        budgetError: "Please input a desired budget"
      })
    }
    else if(isNaN(budgetInput)) {
      this.setState({
        budgetError: "Please provide a valid desired budget"
      })
    }
    else if(!timeFrame) {
      this.setState({
        budgetError: "",
        timeFrameError: "Please select a time frame"
      })
    }
    else
    {
      this.setState({
        budget: {
          id: budget.id,
          budget: budgetInput,
          userID: budget.userID,
          timeFrame: timeFrame
        },
        budgetError: "",
        timeFrameError: ""
      })

      let url = `${config.API_ENDPOINT}/api/budgets/${budget.userID}/${budgetInput}/${timeFrame}`

      let options = {
        method: 'PUT'
      }

      fetch(url, options)
      .then(res => {
          if(!res.ok) {
              throw new Error('Something went wrong, please try again later');
          }
      })
      this.props.history.push('/home')
    }
  }

  // Method for filtering expenses by date.
  // Used in filterDate component.

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

  // Method for filtering expenses by category.
  // Used in categoryFilter component.

  filterCategory = (selectedCategory) => {
    const { expenses } = this.state;
    const categoryGroup = expenses.filter((expense) => {
      return expense.category === selectedCategory
    });

    if(selectedCategory!=="All") {
      this.setState({
        filteredExpenses: categoryGroup
      })
    }
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

  // Method for searching for expenses by the expense name.
  // Used in summaryFilters component.

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

  // Method for deleting expenses.
  // Used in summaryListItem component.

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

  renderRoutes() {
    return (
      <>
        <Route exact path="/" component={Landing} />
        <Route path="/login" component={Login} />
        <Route path="/home" component={Home} />
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
      dateError: this.state.dateError,
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
      timeFrameError: this.state.timeFrameError,
      handleSaveNewProfile: this.handleSaveNewProfile,
      handleUpdateProfile: this.handleUpdateProfile,
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
