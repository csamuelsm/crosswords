let alfabeto = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
                'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S',
                'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

$(document).ready(function() {
    document.addEventListener('keydown', function(event) {
        if (event.keyCode == 8) {
            keyboard_entry('BACKSPACE');
        } else if (event.keyCode == 9) {
            keyboard_entry('DIR');
        } else if (event.keyCode >= 65 && event.keyCode <= 90) {
            keyboard_entry(alfabeto[event.keyCode-65]);
        } else if (event.keyCode == 37) {
            left_tile();
        } else if (event.keyCode == 39) {
            right_tile();
        } else if (event.keyCode == 38) {
            up_tile();
        } else if (event.keyCode == 40) {
            down_tile();
        }
    })
})

