export const filterByDate = (story, min, max) => {
    // story.time is seconds, min/max dates are milliseconds
    if (min > 0 && max > 0) {
        if (min === max) { // search stories published during the given day
            return story.time <= (max+24*60*60*1000)/1000 && story.time >= min/1000;
        }
        return story.time <= max/1000 && story.time >= min/1000;
    } else if (min > 0) {
        //return story.time > new Date(min).getTime();
        return story.time >= min/1000;
    } else if (max > 0) {
        //return story.time < new Date(max).getTime();
        return story.time <= max/1000;
    } else {
      return true;
    }
}

export const filterByScore = (story, min, max) => {
    if (min > 0 && max > 0) { // both values are defined
        return story.score <= max && story.score >= min;
    } else if (min > 0) {
        return story.score >= min;
    } else if (max > 0) {
        return story.score <= max;
    } else {
        return true;
    }
}

export const filterByTitle = (story, searchTerm) => {
    const storyTitle = story.title;
    const found = storyTitle.toLowerCase().indexOf(searchTerm.toLowerCase());
    //console.log('search ' + searchTerm + ' from ' + storyTitle + ' -> found?' + found);
    return found >= 0;
}

export const filterByName = (story, name) => {
    return story.by === name;
}

// helper function
// TODO localeCompare
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare
const sortArrayOfObjectsAlphabetically = (array)  => {
    return array.sort((a, b) => {
        const nameA = a.toUpperCase();
        const nameB = b.toUpperCase();

        let comparison = 0;
        if (nameA > nameB) {
            comparison = 1;
        } else if (nameA < nameB) {
            comparison = -1;
        }
        return comparison;
    });
}

export const getNames = (stories) => {
    let uniqueNames = [];
    for (let i = 0, n = stories.length; n > i; i++) {
        const tempName = stories[i].by;
        if (!uniqueNames.includes(tempName)){
            uniqueNames.push(stories[i].by);
        }
    }
    uniqueNames = sortArrayOfObjectsAlphabetically(uniqueNames);
    return uniqueNames;
}

export const sortStories = (a,b, sortBy) => {
    switch (sortBy) {
        case 'score':
            return b.score - a.score; // biggest score first
        case 'date':
            return b.time - a.time; // newest first
        default: // todo localeCompare
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
