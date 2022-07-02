import { writable, derived } from "svelte/store";
import { userService } from "./user.service";

export interface Conference {
    id: string;
    description: string;
}

const store = writable<Conference[]>([]);

export const allConferences = derived(store, ($store) => $store);

let data = undefined;

const load = async (): Promise<any> => {
    if (data) {
        return data;
    } else {
        return fetch('assets/data/data.json')
            .then(async (response) => {
                const jsonData = await response.json()
                return processData(jsonData)
            });
    }
}

const processData = async (inputdata: Promise<any>) => {

    // just some good 'ol JS fun with objects and arrays
    // build up the data by linking speakers to sessions
    data = inputdata;

    // loop through each day in the schedule
    data.schedule.forEach((day: any) => {
        // loop through each timeline group in the day
        day.groups.forEach((group: any) => {
            // loop through each session in the timeline group
            group.sessions.forEach((session: any) => {
                session.speakers = [];
                if (session.speakerNames) {
                    session.speakerNames.forEach((speakerName: any) => {
                        const speaker = data.speakers.find(
                            (s: any) => s.name === speakerName
                        );
                        if (speaker) {
                            session.speakers.push(speaker);
                            speaker.sessions = speaker.sessions || [];
                            speaker.sessions.push(session);
                        }
                    });
                }
            });
        });
    });

    return data;
}

const getTimeline = (
    dayIndex: number,
    queryText = '',
    excludeTracks: any[] = [],
    segment = 'all'
) => {
    return load().then(
        (data: any) => {
            const day = data.schedule[dayIndex];
            day.shownSessions = 0;

            queryText = queryText.toLowerCase().replace(/,|\.|-/g, ' ');
            const queryWords = queryText.split(' ').filter(w => !!w.trim().length);

            day.groups.forEach((group: any) => {
                group.hide = true;

                group.sessions.forEach((session: any) => {
                    // check if this session should show or not
                    filterSession(session, queryWords, excludeTracks, segment);

                    if (!session.hide) {
                        // if this session is not hidden then this group should show
                        group.hide = false;
                        day.shownSessions++;
                    }
                });
            });

            return day;
        })
}

const filterSession = (
    session: any,
    queryWords: string[],
    excludeTracks: any[],
    segment: string
) => {
    let matchesQueryText = false;
    if (queryWords.length) {
        // of any query word is in the session name than it passes the query test
        queryWords.forEach((queryWord: string) => {
            if (session.name.toLowerCase().indexOf(queryWord) > -1) {
                matchesQueryText = true;
            }
        });
    } else {
        // if there are no query words then this session passes the query test
        matchesQueryText = true;
    }

    // if any of the sessions tracks are not in the
    // exclude tracks then this session passes the track test
    let matchesTracks = false;
    session.tracks.forEach((trackName: string) => {
        if (excludeTracks.indexOf(trackName) === -1) {
            matchesTracks = true;
        }
    });

    // if the segment is 'favorites', but session is not a user favorite
    // then this session does not pass the segment test
    let matchesSegment = false;
    if (segment === 'favorites') {
        if (userService.hasFavorite(session.name)) {
            matchesSegment = true;
        }
    } else {
        matchesSegment = true;
    }

    // all tests must be true if it should not be hidden
    session.hide = !(matchesQueryText && matchesTracks && matchesSegment);
}

const getSpeakers = () => {
    return load().then((data: any) => {
        return data.speakers.sort((a: any, b: any) => {
            const aName = a.name.split(' ').pop();
            const bName = b.name.split(' ').pop();
            return aName.localeCompare(bName);
        });
    })
}

const getTracks = () => {
    return load().then((data: any) => {
        return data.tracks.sort();
    })
}

const getMap = () => {
    return load().then(data => data.map)
}

export const conferenceService = {
    getMap, load,
    getTimeline, getSpeakers, getTracks
}