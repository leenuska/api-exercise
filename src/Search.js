import React, { useState } from 'react';
import { connect } from 'react-redux'
import { format } from 'date-fns';
import {
    setSortBy,
    setMinDate,
    setMaxDate,
    setMinScore,
    setMaxScore,
    setTitle,
    setCreator
} from './redux/actions';
import { getNames } from './searchUtils';

const Search = (props) => {

    const [advancedSearch, setAdvancedSearch] = useState(false);

    const {
        stories,
        setSortBy,
        sortBy,
        minDate,
        setMinDate,
        maxDate,
        setMaxDate,
        minScore,
        setMinScore,
        maxScore,
        setMaxScore,
        title,
        setTitle,
        creator,
        setCreator
    } = props;

    if (advancedSearch) { // advanced search open
        return (
            <React.Fragment>
                <p><button onClick={() => setAdvancedSearch(false)} className='searchToggle'>Hide search bar</button></p>
                <p>Can't find the story? Try sorting or searching.</p>
                <p>Stories are sorted (ascending) by:<br />
                    <button onClick={() => setSortBy('score')} className={sortBy === 'score' ? 'selected' : ''}>score</button>
                    <button onClick={() => setSortBy('date')} className={sortBy === 'date' ? 'selected' : ''}>date</button>
                    <button onClick={() => setSortBy('creator')} className={sortBy === 'creator' ? 'selected' : ''}>creator</button>
                </p>
                <p>
                    Search the stories by:
                </p>

                <label htmlFor='mindate'>Min date</label>
                <input type='date' id='mindate' onChange={(e) => setMinDate(e.target.value)} value={format(new Date(minDate), 'yyyy-MM-dd')}/><br />

                <label htmlFor='maxdate'>Max date</label>
                <input type='date' id='maxdate' onChange={(e) => setMaxDate(e.target.value)} value={format(new Date(maxDate), 'yyyy-MM-dd')}/><br />

                <label htmlFor='minscore'>Min score</label>
                <input type='number' min='0' id='minscore' onChange={(e) => setMinScore(e.target.value)} value={minScore}/><br />

                <label htmlFor='maxscore'>Max score</label>
                <input type='number' min='0' id='maxscore' onChange={(e) => setMaxScore(e.target.value)} value={maxScore}/><br />

                <label htmlFor='title'>Title</label>
                <input type='text' id='title' onChange={(e) => setTitle(e.target.value)} value={title}/><br />

                <label htmlFor='creator'>Creator</label>
                <select name='filter' id='creator' onChange={(e) => setCreator(e.target.value)} value={creator}>
                    <option value=''></option>
                    { getNames(stories).map((name, i) => {
                        return (
                            <option value={name} key={i}>{name}</option>
                        );
                    })}
                </select>
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
    stories: state.stories,
    sortBy: state.search.sortBy,
    minDate: state.search.minDate,
    maxDate: state.search.maxDate,
    minScore: state.search.minScore,
    maxScore: state.search.maxScore,
    title: state.search.title,
    creator: state.search.creator
});

const mapDispatchToProps = dispatch => ({
    setSortBy: (value) => {
        dispatch(setSortBy(value));
    },
    setMinDate: (value) => {
        dispatch(setMinDate(new Date(value).getTime()));
    },
    setMaxDate: (value) => {
        dispatch(setMaxDate(new Date(value).getTime()));
    },
    setMinScore: (value) => {
        dispatch(setMinScore(value));
    },
    setMaxScore: (value) => {
        dispatch(setMaxScore(value));
    },
    setTitle: (value) => {
        dispatch(setTitle(value));
    },
    setCreator: (value) => {
        dispatch(setCreator(value));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Search)
