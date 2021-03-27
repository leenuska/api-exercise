import React from 'react';
import { Link } from 'react-router-dom';
import { getHumanReadableTime } from './dateUtils'

const PrintStory = (props) => {

    const { title, url, time, by, score } = props.story;

    return (
        <li>
            <div className='info'>
                <span className='time'>Published {getHumanReadableTime(time)}</span>
                <span className='creator'>
                    <Link to={`/creator/${by}`}>
                        By {by}
                    </Link>
                </span>
                <span className='score'>Score: {score}</span>
            </div>
            <div className='story'>
                <span className='title'><a href={url} target='_blank' rel='noopener noreferrer'>{title}</a></span>
            </div>
        </li>
        );
}

export default PrintStory
