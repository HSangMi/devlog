import React from 'react'

import './index.scss'

export const ThumbnailContainer = React.memo(({ children }) => {
  // children을 복사하여 배열로 만들기
  const childrenArray = React.Children.toArray(children);

  // 날짜 속성을 기준으로 정렬
  childrenArray.sort((a, b) => {
    // 날짜 속성을 비교하여 정렬
    const dateA = new Date(a.props.node.frontmatter.date);
    const dateB = new Date(a.props.node.frontmatter.date);
    return dateA - dateB;
  });
  return <div className="thumbnail-container">{childrenArray}</div>;
});