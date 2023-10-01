import React from 'react';

const TruncateText = ({ text, maxLength }:any) => {
  if (text?.length <= maxLength) {
    return <span>{text}</span>;
  }

  const truncatedText = text.slice(0, maxLength - 3) + ' [...]';

  return <span title={text}>{truncatedText}</span>;
};

export default TruncateText;
