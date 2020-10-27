import React, { useState } from 'react';
import { Tag, Input } from 'antd';
import { TweenOneGroup } from 'rc-tween-one';
import { PlusOutlined } from '@ant-design/icons';

function RecentNav (props) {
  const [tags, setTags] = useState(['tag1', 'tag2', 'tag3']);

  const handleClose = removedTag => {
    let tags2 = tags.filter(tag => tag !== removedTag);
    setTags(tags2);
  };

  const forMap = tag => {
    const tagElem = (
      <Tag
        closable
        onClose={e => {
          e.preventDefault();
          handleClose(tag);
        }}
      >
        <a className="recent-nav-link">
          {tag}
        </a>
      </Tag>
    );
    return (
      <span key={tag} style={{ display: 'inline-block' }}>
        {tagElem}
      </span>
    );
  };

  const tagChild = tags.map(forMap);

  return (
    <div className="recent-nav">
      <span className="recent-nav-label">最近使用:</span>
      <div className="recent-nav-list">
        <TweenOneGroup
            enter={{
              scale: 0.8,
              opacity: 0,
              type: 'from',
              duration: 100,
              onComplete: e => {
                e.target.style = '';
              },
            }}
            leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
            appear={false}
          >
            {tagChild}
          </TweenOneGroup>
      </div>
    </div>
  );
}

export default RecentNav;