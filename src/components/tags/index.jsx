import React from 'react'
import { Link } from 'gatsby'

import './index.scss'

export const Tags = ({ post }) => {
  console.log(post);
  return (
    post.frontmatter.tags ?
      <div className="tags">
        <b>#Tags</b>
        <ul>
          {post.frontmatter.tags
            ? post.frontmatter.tags.map(tag => (
              <li key={tag}>
                <b className={'tag_' + tag}>{tag}</b>
                {/* <Link to={`/tags/${tag}`}>{tag}</Link> */}
              </li>
            ))
            : null}
        </ul>
      </div>
      : <></>
  )
}
