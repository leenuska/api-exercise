import React from 'react';
import { connect } from 'react-redux';
import { fetchStories  } from './redux/actions';
import PrintStory from './PrintStory';
import Search from './Search';

class StoriesContainer extends React.Component {

    constructor(props) {
        super(props);
        this.props.fetchStories();

        this.filterStories = this.filterStories.bind(this);
        this.sortStories = this.sortStories.bind(this);
    }

    componentDidMount() {
        //this.props.fetchStories();
        console.log('component Did mount')
    }

    filterStories(story, filterBy, filterValue) {
        if (filterBy === '' || filterValue === '' || filterValue === null || filterValue === undefined) {
            return true;
        }
        switch (filterBy) {
            case 'score':
                return story.score > filterValue;
            case 'date':
                return story.time > filterValue;
            case 'creator':
                return story.by === filterValue;
            default: // title
                const storyTitle = story.title;
                const searchTerm = filterValue;
                const found = storyTitle.toLowerCase().indexOf(searchTerm.toLowerCase());
                //console.log('search ' + searchTerm + ' from ' + storyTitle + ' -> found?' + found);
                return found >= 0
        }
}

    sortStories(a,b, sortBy) {
        switch (sortBy) {
            case 'score':
                return b.score - a.score; // biggest score first
            case 'date':
                return b.time - a.time; // newest first
            default:
                const nameA = a.by.toUpperCase(); // ignore case
                const nameB = b.by.toUpperCase();
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
                return 0; // names are equal
        }
    }

    render() {

        if (!this.props.stories) {
            return null;
        }

        const filteredStories = this.props.stories.filter( (story) => this.filterStories(story, this.props.filterBy, this.props.filterValue));
        const sortedStories = filteredStories.sort((a,b) => this.sortStories(a, b, this.props.sortBy) );

        return (
            <React.Fragment>
                <h1>Read the most popular stories</h1>
                <Search />
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
    filterBy: state.search.filterBy,
    filterValue: state.search.filterValue
});

export default connect(mapStateToProps, { fetchStories })(StoriesContainer)
