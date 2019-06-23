import React from 'react'
import { Link, graphql } from 'gatsby'
import './post.css';
import Layout from '../components/layout'
const IndexPage = (props) => {
  const postList = props.data.allMarkdownRemark;
  return (
    <Layout>
      {postList.edges.map(({ node }, i) => (
        <Link to={node.fields.slug} className="link" >
          <div className="post-list">
            <div className="post-title">
              <h1>{node.frontmatter.title}</h1>
              <button className="date-btn">
                {node.frontmatter.tags}
              </button>
            </div>
            <hr className="line-type1" />
            <span className="date-span">{node.frontmatter.date}</span>
            <p>{node.excerpt.split('-').slice(0, 1)}</p>
          </div>
        </Link>
      ))}
    </Layout>
  )
}
export default IndexPage;

export const listQuery = graphql`
  query ListQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          fields{
            slug
          }
          excerpt(pruneLength: 200)
          frontmatter {
            date(formatString: "MMMM Do YYYY")
            title
            tags
          }
        }
      }
    }
  }
`
