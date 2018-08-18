import React, { Component } from 'react';
import { sortBy } from 'lodash';
import { Button, Sort } from '../Button/index';


const SORTS = {
  NONE : list => list,
  TITLE : list => sortBy(list,'title'),
  AUTHOR : list => sortBy(list,'author'),
  COMMENTS : list => sortBy(list,'num_comments').reverse(),
  POINTS : list => sortBy(list,'points').reverse(),
}

class Table extends Component {

  constructor(props)
  {
    super(props);

    this.state = {

      sortKey : 'NONE',
      isSortReverse : false,

    }
    this.onSort = this.onSort.bind(this);
  }

  onSort(sortKey) {
    const isSortReverse = this.state.sortKey === sortKey && !this.state.isSortReverse;
    this.setState( { sortKey ,isSortReverse });
  }

  render() {

  const  { list, removeItem } = this.props;
  const  { sortKey, isSortReverse } =this.state;

  const sortedList = SORTS[sortKey](list);
  const reverseSortedList = isSortReverse ? sortedList.reverse() : sortedList

  return(
    <div className = "col-sm-10 col-sm-offset-3">

      <div>

          <Sort
            className = "btn btn-lg btn-primary sortBtn"
            sortKey = { 'NONE' }
            activeSortKey = { sortKey }
            onSort = { this.onSort }>
          Default
          </Sort>

        <Sort
          className = "btn btn-lg btn-primary sortBtn"
          sortKey = { 'TITLE' }
          activeSortKey = { sortKey }
          onSort = { this.onSort }>
        Title
        </Sort>

        <Sort
          className = "btn btn-lg btn-primary sortBtn"
          sortKey = { 'AUTHOR' }
          activeSortKey = { sortKey }
          onSort = { this.onSort }>
        Author
        </Sort>

        <Sort
          className = "btn btn-lg btn-primary sortBtn"
          sortKey = { 'COMMENTS' }
          activeSortKey = { sortKey }
          onSort = { this.onSort }>
        Comments
        </Sort>

        <Sort
          className = "btn btn-lg btn-primary sortBtn"
          sortKey = { 'POINTS' }
          activeSortKey = { sortKey }
          onSort = { this.onSort }>
        Points
        </Sort>
        
      </div>

      {

        //list.filter( isSearched(searchTerm) ).
            reverseSortedList.map(item =>
            <div key = { item.objectID }>
            <h3><a href = { item.url }>{ item.title }</a></h3>
            <h4>by { item.author} | { item.num_comments } Comments | { item.points } Points</h4>

            <Button
              className = "btn btn-danger btn-xs"
              type = "button"
              onClick = { () => removeItem(item.objectID) }>
                Remove Me
          </Button>

            <hr />

            </div>
        )
      }
    </div>
  )
}
}

export default Table;
