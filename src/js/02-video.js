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
        
        if (playerTime + 30 >= playerDuration) localStorage.removeItem(VIDEO_CUR_TIME)
        else player.setCurrentTime(playerTime)
        
    }

};

function onTimeUpdate(data) {
    localStorage.setItem(VIDEO_CUR_TIME, JSON.stringify(data));
    newSession = false;
};


