import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

function withRouteObject(WrappedComponent) {
    class Wrapper extends Component {

        render() {
            const {
                ...passThroughProps
            } = this.props;

            return (
                <WrappedComponent
                    {...passThroughProps}
                />
            );
        }
    }

    function getCreator(match) {

        if (!match.params || !match.params.id) {
            return undefined;
        }

        const ids = match.params.id.split('/'); // expect to get possibly several id:s, pick the first
        let creatorId;
        if (ids.length > 0) {
            creatorId = ids[0];
        }
        return creatorId;
    }

    const mapStateToProps = (state, ownProps) => ({
        routerActiveCreator: getCreator(ownProps.match)
    });

    const enhance = compose(
        withRouter,
        connect(mapStateToProps)
    );

    return enhance(Wrapper);
}

export default withRouteObject;
