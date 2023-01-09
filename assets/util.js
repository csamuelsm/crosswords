function getGameMode() {
    if (window.location.href.indexOf('crossword-mini') >= 0) {
        return 'crosswordmini';
    } else {
        return 'crosswordtradicional';
    }
}

function getK() {
    if (getGameMode() == 'crosswordmini') return 5;
    else return 10;
}

class LocalStorage {
    set(name, value) {
        return localStorage.setItem(`${getGameMode()}_${name}`, value)
    }

    get(name) {
        return localStorage.getItem(`${getGameMode()}_${name}`)
    }
}

const api = new LocalStorage();

$(document).ready(function(){

    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        $('body').css('height', $(window).height())
    }
})
