import React from 'react'
import { Link, withRouter } from 'react-router-dom'


class Footer extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
      <footer className="footer">
        <div className="content has-text-centered">
          <p>
            <strong>FripAdvisor</strong> by <a href="https://github.com/ChawitO/sei-group-project">Bad Hair Day Team</a>. The website content
      has been totally fripped.
          </p>
        </div>
      </footer>
    )
  }
}





export default withRouter(Footer) 