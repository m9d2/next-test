'use client'
import React from 'react';
import * as Icons from '@ant-design/icons';

const iconList: any = Icons

type IconProps = {
  name: string;
  style?: React.CSSProperties;
  className?: string;
  onClick?: () => void;
};

const Icon: React.FC<IconProps> = ({ name, style, className, onClick }) => {
  const IconComponent = iconList[name];
  if (!IconComponent) {
    console.warn(`Icon ${name} not found in Ant Design Icons.`);
    return null;
  }

  return <IconComponent style={style} className={className} onClick={onClick} />;
};

export default Icon;
