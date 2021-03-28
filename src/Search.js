import React, { useState } from 'react';
import { connect } from 'react-redux'
import {setSortBy, setFilterBy, setFilterValue } from './redux/actions';

const Search = (props) => {

    const [advancedSearch, setAdvancedSearch] = useState(false);
    const { setSortBy, sortBy, setFilterBy, filterBy, setFilterValue, filterValue } = props;

    if (advancedSearch) { // advanced search open
        return (
            <React.Fragment>
                <p><button onClick={() => setAdvancedSearch(false)} className='searchToggle'>Hide search bar</button></p>
                <p>Can't find the story? Try sorting or searching.</p>
                <p>Stories are sorted by:<br />
                    <button onClick={() => setSortBy('score')} className={sortBy === 'score' ? 'selected' : ''}>score</button>
                    <button onClick={() => setSortBy('date')} className={sortBy === 'date' ? 'selected' : ''}>date</button>
                    <button onClick={() => setSortBy('creator')} className={sortBy === 'creator' ? 'selected' : ''}>creator</button>
                </p>
                <p>
                    You can search the stories either by minimum score, creator name or words in the title.
                </p>
                    <label htmlFor='filterType'>Filter by</label>
                    <select name='filter' id='filterType' onChange={(e) => setFilterBy(e.target.value)} value={filterBy}>
                        <option value=''></option>
                        <option value='score'>score</option>
                        <option value='creator'>creator</option>
                        <option value='title'>title</option>
                    </select>

                    <label htmlFor='filtervalue'>value</label>
                    <input type='text' id='filtervalue' onChange={(e) => setFilterValue(e.target.value)} value={filterValue}/>

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
