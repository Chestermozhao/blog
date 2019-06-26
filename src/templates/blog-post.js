import React from 'react';
import Layout from '../components/layout';
import Metatags from '../components/Metatags';
import { graphql } from 'gatsby'
import "../pages/post.css"


function BlogPost(props) {
    const post = props.data.markdownRemark;
    const url = props.data.site.siteMetadata.siteUrl;
    const date = post.frontmatter.date;
    const { title } = post.frontmatter;
    const { description } = post.frontmatter;
    const image = post.frontmatter.image;
    let thumbnail = url;
    if(image){
        thumbnail += image.childImageSharp.resize.src;
    }
    return (
        <Layout>
            <Metatags
                title={title}
                description={description}
                thumbnail={thumbnail}
                url={url}
                pathname={props.location.pathname}
            />
            <div className="noteContent">
                <h1>{title}</h1>
                <h4 style={{color: '#ab7878'}}>{date}</h4>
            </div>
            <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </Layout>
    )
}

export default BlogPost;
export const query = graphql`
    query PostQuery($slug: String!) {
        markdownRemark(fields: { slug: { eq: $slug } }) {
            html
            frontmatter {
                title
                description
                date(formatString: "MMMM Do YYYY")
            }
        }
        site {
            siteMetadata {
                siteURL
            }
        }
    }
`
