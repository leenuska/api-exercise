import React, { useState } from 'react';
import { connect } from 'react-redux'

import {setSortBy, setFilterBy, setFilterValue } from './redux/actions';

const Search = (props) => {

    const [advancedSearch, setAdvancedSearch] = useState(false);
    /*
            minimum or maximum score, or even by selecting a user name in a list, or typing for keywords in the title
     */

    //const { setSortBy, handleFilterCallback, sortBy, filterBy, filterValue } = props;

    if (advancedSearch) { // advanced search open
        return (
            <React.Fragment>
                <p><button onClick={() => setAdvancedSearch(false)} className='searchToggle'>Hide search bar</button></p>
                <p>Stories are sorted by:
                    <button onClick={() => props.setSortBy('score')} className={props.sortBy === 'score' ? 'selected' : ''}>score</button>
                    <button onClick={() => props.setSortBy('date')} className={props.sortBy === 'date' ? 'selected' : ''}>date</button>
                    <button onClick={() => props.setSortBy('creator')} className={props.sortBy === 'creator' ? 'selected' : ''}>creator</button>
                </p>
                <p>
                    You can search the stories either by score, creator or title.
                </p>
                    <label htmlFor='filterType'>Filter by</label>
                    <select name='filter' id='filterType' onChange={(e) => props.setFilterBy(e.target.value)} value={props.filterBy}>
                        <option value=''></option>
                        <option value='score'>score</option>
                        <option value='creator'>creator</option>
                        <option value='title'>title</option>
                    </select>

                    <label htmlFor='filtervalue'>value</label>
                    <input type='text' id='filtervalue' onChange={(e) => props.setFilterValue(e.target.value)} value={props.filterValue}/>

                <hr />
            </React.Fragment>

        );
    } else { // advanced search closed
        return (
            <React.Fragment>
                <p><button onClick={() => setAdvancedSearch(true)} className='searchToggle'>Can't find the story you were looking for?</button></p>
            </React.Fragment>

        );
    }
}

const mapStateToProps = state => ({
    sortBy: state.search.sortBy,
    filterBy: state.search.filterBy,
    filterValue: state.search.filterValue
});

const mapDispatchToProps = dispatch => ({
    setSortBy: (value) => {
        dispatch(setSortBy(value));
    },
    setFilterBy: (value) => {
        dispatch(setFilterBy(value));
    },
    setFilterValue: (value) => {
        dispatch(setFilterValue(value));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Search)

