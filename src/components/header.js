import PropTypes from "prop-types"
import React, {Component} from "react"
import EarthImage from '../images/earth_img.jpg'
import "./header.css"
import { Link } from 'gatsby'

class Header extends Component {
    constructor(props) {
        super(props)
        this.reSize.bind(this);
        this.onScroll.bind(this);
        this.burgerClick.bind(this);
        this.state = {
            isWidth: true,
            onTop: true,
        }
    }

    componentWillMount() {
        this.reSize();
    }

    componentDidMount() {
        window.addEventListener('resize', this.reSize);
        window.addEventListener('scroll', this.onScroll);
    }

    onScroll = () => {
        if(window.scrollY > 20){
            this.setState({onTop: false})
        } else {
            this.setState({onTop: true})
        }
    }

    burgerClick = () => {
        console.log("hello")
    }

    reSize = () => {
        if(window.innerWidth <= 550) {
            this.setState({isWidth: false})
        }
        else {
            this.setState({isWidth: true})
        }
    }

    render() {
        const { isWidth } = this.state;
        const { onTop } = this.state;
        const { siteTitle } = this.props;
        return (
        <header
          className="header"
          style={{
              backgroundImage: (onTop? `url(${EarthImage})`: ''),
              backgroundColor: (onTop? '': '#663399'),
          }}
        >
          <div 
            style={{
               margin: `0 auto`,
               maxWidth: `960px`,
               padding: `1.45rem 1.0875rem`,
            }}
            className="nav-bar"
          >
            <h1 style={{ margin: 0 }}>
              <Link
                to="/"
                style= {{
                    color: `rgb(102, 51, 153)`,
                    textDecoration: `none`,
                    fontFamily: `fantasy, sans-serif, georgia, serif`,
                    color: (onTop? '': '#FFF'),
                }}
              >
                { siteTitle }
              </Link>
            </h1>
            <div
              className="header-burger"
              onClick={this.burgerClick}
              style={{ display: (isWidth? 'none':'block') }}
            >
              &#9776;
            </div>
            <ul className="header-btn" style={{ display: (isWidth? 'block':'none')}}>
              <li>About</li>
              <li>
                <a href="https://github.com/Chestermozhao" target="_blank">
                  Github
                </a>
              </li>
            </ul>
          </div>
        </header>
      )
    }
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header;
