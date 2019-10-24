import React from 'react'
import axios from 'axios'

class Register extends React.Component {
  constructor() {
    super()

    this.state = {
      data: {
        username: '',
        email: '',
        password: '',
        passwordConfirmation: ''
      }
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    const data = { ...this.state.data, [e.target.name]: e.target.value }
    this.setState({ data })
  }

  handleSubmit(e) {
    e.preventDefault()

  //   console.log('submitted', this.state.data)
  //   axios.post('https://XXXXX/register', this.state.data)
  //     .then(() => this.props.history.push('/'))
  //     .catch(err => console.log(err))
  // }

  render() {
    return (
			// BULMA form
      // <section className="section">
      //   <div className="container">
      //     <form onSubmit={this.handleSubmit}>
      //       <h2 className="title">Register</h2>
      //       <div className="field">
      //         <label className="label">Username</label>
      //         <div className="control">
      //           <input
      //             className="input"
      //             name="username"
      //             placeholder="Username"
      //             onChange={this.handleChange}
      //           />
      //         </div>
      //       </div>
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
      //             name="password"
      //             type="password"
      //             placeholder="Password"
      //             onChange={this.handleChange}
      //           />
      //         </div>
      //       </div>
      //       <div className="field">
      //         <label className="label">Password Confirmation</label>
      //         <div className="control">
      //           <input
      //             className="input"
      //             name="passwordConfirmation"
      //             type="password"
      //             placeholder="Password Confirmation"
      //             onChange={this.handleChange}
      //           />
      //         </div>
      //       </div>
      //       <button type="submit" className="button is-info is-fullwidth">Register</button>
      //     </form>
      //   </div>
			// </section>
			
			// SKELETON form design no handlechange or submit
			// <form id="loginForm" action="/whatever" method="post">
      //    <div class="row">

      //      <div class="eleven columns">
      //        <label for="Username">Username</label>
      //     <input type="text" name="Username" id="Username" placeholder="username" required />

			// 			<div class="eleven columns">
      //       <label for="email">Email Address</label>
      //      <input type="text" name="email" id="emailField" placeholder="name@example.com" required />

			// 				<div class="eleven columns">
			// 					<label for="Password">Password</label>
			// 					<input type="text" name="Password" id="Password" placeholder="Password" required />
					
			// 			<div class="eleven columns">
			// 				<label for="Password Confirmation">Password Confirmation</label>
			// 					<input type="text" name="Password" id="Password" placeholder="Password Confirmation" required />
      //      <button type="submit" class="button-primary">Register</button>
      //    </div>
      //  </div>
      //  </form>

    )
  }
}
export default Register 