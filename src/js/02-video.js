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

        let playerTime = 0;
        let playerDuration = 0;
        
        try {
            const playerSettings = JSON.parse(dataStr);
            playerDuration = playerSettings.duration;
            playerTime = playerSettings.seconds;
            
        } catch (error) {
            console.error("Set state error: ", error.message);
            return;
        }
        
        if (playerTime + 30 >= playerDuration) {
            localStorage.removeItem(VIDEO_CUR_TIME)
        } else {
            player.setCurrentTime(playerTime).then(function (seconds) {
                // seconds = the actual time that the player seeked to
            }).catch(function (error) {
                switch (error.name) {
                    case 'RangeError':
                        // the time was less than 0 or greater than the video’s duration
                        console.error("Set state error: ", error.message);
                        break;

                    default:
                        // some other error occurred
                        console.error("Set state error: ", error.message);
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


