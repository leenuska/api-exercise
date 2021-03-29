import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { fetchCreatorById } from '../redux/actions';
import withRouteObject from '../hoc/withRouteObject';
import { getHumanReadableTime } from '../utils/dateUtils'

const CreatorContainer = (props) => {

    useEffect(() => {
        const creator = props.creators.find(creatorObj => creatorObj.id === props.routerActiveCreator);
        if (!creator) {
            props.fetchCreatorById(props.routerActiveCreator);
        }
    });

    if (!props.creators || !props.routerActiveCreator) {
        return null;
    }

    const creator = props.creators.find(creatorObj => creatorObj.id === props.routerActiveCreator);
    if (!creator) {
       return null;
    }

    const { created, id, karma, submitted } = creator;

    return (
        <React.Fragment>
            <div className='creatorInfo'>
                <h1>{id}</h1>
                <p>
                    Created: {getHumanReadableTime(created)}
                </p>
                <p>
                    Karma score: {karma}
                </p>
                <p>
                    Submitted interactions: {submitted.length}
                </p>
            </div>
            <Link to={'../'}>Get back to stories</Link>
        </React.Fragment>
    );
}

const mapStateToProps = state => ({
    creators: state.creators
});

const mapDispatchToProps = dispatch => ({
    fetchCreatorById: (id) => {
        dispatch(fetchCreatorById(id));
    }
});

const enhance = compose(
    withRouteObject,
    connect(mapStateToProps, mapDispatchToProps)
);

export default enhance(CreatorContainer);
