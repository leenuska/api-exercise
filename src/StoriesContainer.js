import React from 'react';
import { connect } from 'react-redux';
import { fetchStories } from './redux/actions';
import PrintStory from './PrintStory';

class StoriesContainer extends React.Component {
    componentDidMount() {
        this.props.fetchStories();
    }

    render() {
        return (
            <React.Fragment>
                <h1>Read the most popular stories</h1>
                <p>Cant find the story you were looking for?</p>
                <p>You can sort the stories by date, score or creator</p>
                <p>You can filter the stories by date, score, creator or title name</p>
                <ul>
                    { this.props.stories.map((s, i) => {
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
    stories: state.stories
});

export default connect(mapStateToProps, { fetchStories })(StoriesContainer)
