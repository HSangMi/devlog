import React from 'react'
import { Link } from 'gatsby'

import './index.scss'

export const PostNavigator = ({ pageContext }) => {
  const { previous, next } = pageContext

  let hasPrev = previous && previous.frontmatter.category && previous.frontmatter.category.split('/').length > 1;
  let hasNext = next && next.frontmatter.category && next.frontmatter.category.split('/').length > 1;

  return (
    <ul className="navigator">
      <li>
        {hasPrev && (
          <Link to={previous.fields.slug} rel="prev">
            ← {previous.frontmatter.title}
          </Link>
        )}
      </li>
      <li>
        {hasNext && (
          <Link to={next.fields.slug} rel="next">
            {next.frontmatter.title} →
          </Link>
        )}
      </li>
    </ul>
  )
}
