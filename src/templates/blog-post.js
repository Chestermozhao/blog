import React from 'react';
import Layout from '../components/layout';
import Img from 'gatsby-image';
import Metatags from '../components/Metatags';
import { graphql } from 'gatsby'
function BlogPost(props) {
    let Img_;
    let thumbnail;
    const post = props.data.markdownRemark;
    const url = props.data.site.siteMetadata.siteUrl;
    const { title } = post.frontmatter;
    const { description } = post.frontmatter;
    const image_exist = post.frontmatter.image
    if (image_exist) {
        thumbnail = image_exist.childImageSharp.resize.src;
        Img_ = <Img fluid={post.frontmatter.image.childImageSharp.fluid}/>
    } else {
        thumbnail = image_exist
        Img_ = ""
    }
    return (
        <Layout>
            <Metatags
                title={title}
                description={description}
                thumbnail={url + thumbnail}
                url={url}
                pathname={props.location.pathname}
            />
            <div>
                <h1>{title}</h1>
                {Img_}
                <div dangerouslySetInnerHTML={{ __html: post.html }} />
            </div>
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
        image {
          childImageSharp {
            resize(width: 16, height: 16) {
              src
            }
            fluid(maxWidth: 16) {
              ...GatsbyImageSharpFluid
            }
          }
       }
       }
   }
  site {
    siteMetadata {
        siteUrl
      }
   }
}
`
