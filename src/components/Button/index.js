import React from 'react';

export const Button = ({ onClick, children, type, className = "btn btn-primary" }) =>
  <button className = { className } type ={ type } onClick = { onClick }>{ children }</button>

export const Loading = () =>
  <div>Loading..</div>

export const Sort = ({sortKey, onSort, children,className,activeSortKey}) =>
{

  const sortClass = ['btn default'];

  if (sortKey === activeSortKey)
  {
    sortClass.push('btn btn-primary');
  }
  return (
  <Button
    className = { sortClass.join(' ') }
    onClick = { () => onSort(sortKey)}>
  { children }
  </Button>
)
}
