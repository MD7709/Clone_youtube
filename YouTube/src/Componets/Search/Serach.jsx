import React, { useState } from 'react';
import './Search.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faSearch } from '@fortawesome/free-solid-svg-icons';
import SearchList from './SearchList';

const Search = ({ setSearchQuery }) => {
  const [searchInput, setSearchInput] = useState("");
  const [searchListArray, setSearchListArray] = useState(false);
  const titleArray = ['video1', 'video2', 'Animation', 'Movies'].filter(q => q.toUpperCase().includes(searchInput.toUpperCase()));

  return (
    <>
      <div className='Serach_Container'>
        <div className='Serach_input2'>
          <div className="Serach_div">
            <input
              type="text"
              className='SerachBox_input'
              placeholder='Search'
              onChange={e => {
                setSearchInput(e.target.value);
              }}
              onKeyPress={e => {
                if (e.key === 'Enter') {
                  setSearchQuery(searchInput);
                  setSearchListArray(false);
                }
              }}
              onClick={() => setSearchListArray(true)}
              value={searchInput}
            />
            <button className='Search_icon_btn' onClick={() => {
              setSearchQuery(searchInput);
              setSearchListArray(false);
            }}>
              <FontAwesomeIcon icon={faSearch} size="2x" className='Search_icon' />
            </button>
            <FontAwesomeIcon icon={faMicrophone} size="2x" className='Mic_icon' />
            {searchInput && searchListArray && (
              <SearchList setSearchInput={setSearchInput} setSearchQuery={setSearchQuery} titleArray={titleArray} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
