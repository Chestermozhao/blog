import PropTypes from "prop-types"
import React, {Component} from "react"

class Footer extends Component {
    render() {
        return (
        <div
          style={{
            position: `fixed`,
            bottom: `0`,
            width: `100%`,
            height: `36px`,
            backgroundColor: `black`,
            textAlign: `center`,
            lineHeight: `36px`,
            color: `#FFF`,
          }}
        >
          Copyright © 2019- ChesterMo
        </div>
      )
    }
}

export default Footer;
