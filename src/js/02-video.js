import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const VIDEO_CUR_TIME = 'videoplayer-current-time';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

let newSession = true;

player.on('play', onPlay);

player.on('timeupdate', throttle(onTimeUpdate, 1000));

//============================================================================
function onPlay(data) {

    const dataStr = localStorage.getItem(VIDEO_CUR_TIME);
    if (dataStr && newSession) {

        const playerSettings = JSON.parse(dataStr)

        if (playerSettings.seconds + 30 >= playerSettings.duration) {
            localStorage.removeItem(VIDEO_CUR_TIME)
        } else {

            player.setCurrentTime(playerSettings.seconds).then(function (seconds) {
                // seconds = the actual time that the player seeked to
            }).catch(function (error) {
                switch (error.name) {
                    case 'RangeError':
                        // the time was less than 0 or greater than the video’s duration
                        break;

                    default:
                        // some other error occurred
                        break;
                }
            });
        }
    }

};

function onTimeUpdate(data) {
    localStorage.setItem(VIDEO_CUR_TIME, JSON.stringify(data));
    newSession = false;
};


