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
import ApiContext from './ApiContext'

class App extends Component {

  state = {
    users: [
      {
        id: "user-ID",
        userName: "awong017",
        password: "user-password"
      }
    ],
    userNameError: "",
    passwordError: "",
    currentUser: {
      id: "user-ID",
      userName: "awong017",
      password: "user-password"
    },
    expenses: [
      {
      id: '1',
      date: 1572817683000,
      name: 'Aburi Sushi',
      description: 'aaa',
      cost: parseFloat('50'),
      category: 'Food',
      userID: "user-ID"
    },
    {
      id: '2',
      date: 1572718583000,
      name: 'Dim Sum',
      description: 'aaa',
      cost: parseFloat('34.34'),
      category: 'Food',
      userID: "user-ID"
    },
    {
      id: '3',
      date: 1572618483000,
      name: 'Gas',
      description: 'aaa', 
      cost: parseFloat('78.12'),
      category: 'Gas',
      userID: "user-ID"
    },
    {
      id: '4',
      date: 1572518383000,
      name: 'Laptop',
      description: 'aaa',
      cost: parseFloat('500.33'),
      category: 'Electronics',
      userID: "user-ID"
    },

    ],
    nameError: "",
    descriptionError: "",
    costError: "",
    categoryError: "",
    categories: [
      {
        id: '11',
        name:'Food'
      },
      {
        id: '12',
        name:'Gas'
      },
      {
        id: '13',
        name: 'Electronics'
      }],
    currentCategory: "All",
    filteredExpenses: [],
    budget: {},
    goals: [],
    budgetError: "",
    goalError:""
  };

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

      this.props.history.push('/NewProfile')
    }
  }

  // Method for saving profiles

  handleSave = (event, budgetInput, goal1, category1, goal2, category2) => {

    event.preventDefault();

    const { currentUser } = this.state;

    if(!budgetInput) {
      this.setState({
        budgetError: "Please input a desired budget"
      })
      console.log(this.state.budgetError);
    }
    else if(!goal1 || !category1 || !goal2 || !category2) {
      this.setState({
        goalError: "Please input desired amount and select category"
      })
      console.log(this.state.goalError);
    }
    else
    {
      const newBudget = {
        budget: budgetInput,
        userID: currentUser.userID
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

  handleAddExpense = (event, name, description, cost, category) => {

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
        userID: this.state.currentUser.userID
      }

      this.setState((prevState) => {
        prevState.expenses.push(newExpense)
      })

      this.addCategory(category);

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

  render() {

    const value={
      users: this.state.users,
      userNameError: this.state.userNameError,
      passwordError: this.state.passwordError,
      currentUser: this.state.currentUser,
      handleSignUp: this.handleSignUp,
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
      budgetError: this.state.budgetError,
      goalError: this.state.goalError,
      handleSave: this.handleSave
    }

    return (
      <ApiContext.Provider value={value}>
          <main className="App_main">{this.renderRoutes()}</main>
      </ApiContext.Provider>
    );
  }

}

export default withRouter(App);
