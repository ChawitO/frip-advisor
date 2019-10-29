import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'

class Login extends React.Component {
  constructor() {
    super()

    this.state = {
      data: {
        email: '',
        password: ''
      }
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange({ target: { name, value } }) {
    const data = { ...this.state.data, [name]: value }
    this.setState({ data })
    console.log(data)
  }
  
  onSubmit(e) {
    e.preventDefault()
    axios.post('/api/login', this.state.data)
      .then(res => {
        Auth.setToken(res.data.token)
        this.props.history.push('/')
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
    // BULMA option
      <>
        <section className="section_login">
          <div className="login_top_left">
            <div className="container columns">
              <form onSubmit={this.onSubmit} className="column is-12">
                <h2 className="title">Login</h2>
                <div className="field">
                  <label className="label">Email</label>
                  <div className="control">
                    <input
                      className="input"
                      name="email"
                      placeholder="Email"
                      onChange={this.onChange}
                    />
                  </div>
                </div>
            
                <div className="field">
                  <label className="label">Password</label>
                  <div className="control">
                    <input
                      className="input"
                      type="password"
                      name="password"
                      placeholder="Password"
                      onChange={this.onChange}
                    />
                  </div>
                </div>
                <button type="submit" className="button is-primary">Login</button>
              </form>
            </div>
          </div>

          <div className="login_top_right">
            <img src="./assets/images/owl_3.png" />
            <p><a><strong>Not a member? Sign up now</strong></a></p>
          </div>
        
        </section>
        <section className="section_login_bottom">
          <div className="login_bottom">
            <img src="./assets/images/Skyline_2.jpg" />
          </div>
        </section>		
      </>
    )
  }
}

export default Login