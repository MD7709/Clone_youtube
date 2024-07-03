import React from 'react';
import './SearchList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchList = ({ titleArray, setSearchInput, setSearchQuery }) => {
  return (
    <div className='Search_list'>
      {
        titleArray.map(m => (
          <div className='Title_item' key={m} onClick={() => {
            setSearchInput(m);
            setSearchQuery(m);
          }}>
            <FontAwesomeIcon icon={faSearch} className='Search_item_icon' />
            <p className='Title_text'>{m}</p>
          </div>
        ))
      }
    </div>
  );
};

export default SearchList;
  