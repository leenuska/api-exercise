import React from 'react';
import { connect } from 'react-redux';
import { fetchStories  } from '../redux/actions';
import PrintStory from './PrintStory';
import SearchContainer from './SearchContainer';
import { sortStories, filterByDate, filterByScore, filterByTitle, filterByName } from '../utils/searchUtils';

class StoriesContainer extends React.Component {

    constructor(props) {
        super(props);
        this.props.fetchStories();
    }

    render() {

        const { stories, sortBy, minDate, maxDate, minScore, maxScore, title, creator } = this.props;

        if (!stories) {
            return <div>Fetching stories...</div>;
        }

        let filteredStories = [...stories];
        if (minDate || maxDate) {
            filteredStories = filteredStories.filter( (story) => filterByDate(story, minDate, maxDate));
        }
        if (minScore || maxScore) {
            filteredStories = filteredStories.filter( (story) => filterByScore(story, minScore, maxScore));
        }
        if (title) {
            filteredStories = filteredStories.filter( (story) => filterByTitle(story, title));
        }
        if (creator) {
            filteredStories = filteredStories.filter( (story) => filterByName(story, creator));
        }
        const sortedStories = filteredStories.sort((a,b) => sortStories(a, b, sortBy) );

        return (
            <React.Fragment>
                <h1>Read the most popular stories</h1>
                <SearchContainer />
                <ul>
                    { sortedStories.map((s, i) => {
                        return (
                            <PrintStory key={i} story={s} />
                        );
                    })}
                </ul>
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

export default connect(mapStateToProps, { fetchStories })(StoriesContainer)
