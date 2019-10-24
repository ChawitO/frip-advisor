import React from 'react'
import axios from 'axios'
import Auth from '../../../lib/auth'
import Skeleton from 'react-loading-skeleton'

class Login extends React.Component {
  constructor() {
    super()

    this.state = {
      data: {
        email: '',
        password: ''
      }
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    const data = { ...this.state.data, [e.target.name]: e.target.value }
    this.setState({ data })
    console.log(data)
	}
	
	axios.post('MONGODB', this.state.data)
      .then(res => {
		Auth.setToken(res.data.token)
		this.props.history.push('/database')
      })
      .catch (err => console.log(err.message))
  }

  render() {
    return (
    // BULMA option
    // <section className="section">
    //   <div className="container">
    //     <form onSubmit={this.handleSubmit}>
    //       <h2 className="title">Login</h2>
    //       <div className="field">
    //         <label className="label">Email</label>
    //         <div className="control">
    //           <input
    //             className="input"
    //             name="email"
    //             placeholder="Email"
    //             onChange={this.handleChange}
    //           />
    //         </div>
    //       </div>
    //       <div className="field">
    //         <label className="label">Password</label>
    //         <div className="control">
    //           <input
    //             className="input"
    //             type="password"
    //             name="password"
    //             placeholder="Password"
    //             onChange={this.handleChange}
    //           />
    //         </div>
    //       </div>
    //       <button type="submit" className="button is-warning">Login</button>
    //     </form>
    //   </div>
    // </section>
			
    // SKELETON option design NO handle submits
      // <form id="loginForm" action="/whatever" method="post">
      //   <div class="row">
      //     <div class="seven columns">
      //       <label for="email">Email Address</label>
      //       <input type="text" name="email" id="emailField" placeholder="name@example.com" required />

      //       <label for="password">Password</label>
      //       <input type="password" name="password" id="passwordField" required />

      //       <button type="submit" class="button-primary">Sign In</button>
      //     </div>
      //     <div class="five columns">
      //       <p>Extra</p>
      //     </div>
      //   </div>
      // </form>
				
    )
  }
}

export default Login