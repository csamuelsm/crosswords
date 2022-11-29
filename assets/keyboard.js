let keyboard = [['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
                ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
                ['Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE']]

function next_tile() {
    if (dir == 0) {
        if($(`.tile[x=${parseInt(curr_x) + 1}][y=${parseInt(curr_y)}][value!="#"]`).length > 0) {
            select_pos(parseInt(curr_x)+1, curr_y, dir);
            curr_x = parseInt(curr_x)+1;
        }
    } else {
        if($(`.tile[x=${parseInt(curr_x)}][y=${parseInt(curr_y) + 1}][value!="#"]`).length > 0) {
            select_pos(parseInt(curr_x), parseInt(curr_y)+1, dir);
            curr_y = parseInt(curr_y)+1;
        }
    }
}

function keyboard_entry(value) {
    //checking if modals are open
    // TODO: CHECK IF MODALS ARE OPEN
    var modal_open = false;
    if ( $('#quit').hasClass('show')
        || $('#onboarding-1').hasClass('show')
        || $('#onboarding-2').hasClass('show')
        || $('#onboarding-3').hasClass('show')
        || $('#onboarding-4').hasClass('show')
        || $('#onboarding-5').hasClass('show')
        || $('#onboarding-6').hasClass('show')
        || $('#configuracoes').hasClass('show')
        || $('#finish').hasClass('show') )
        {
            // MODAL ESTÁ ABERTO
            // USUÁRIO NÃO PODE DIGITAR NADA
            modal_open = true;
        }

    if (value == 'BACKSPACE') {
        //TODO: BACKSPACE PRESS
    } else if (value == 'ENTER') {
        //TODO: ENTER PRESS
    } else {
        if (!modal_open) {
            //TODO: LETTER KEY PRESS
            $(`.tile[x=${curr_x}][y=${curr_y}]`).html(`<p>${value}</p>`);
            next_tile();
        }
    }


}

$(document).ready(function(){

    // Keyboard Creation

    for (let i = 0; i < keyboard.length; i++) {
        for (let j = 0; j < keyboard[i].length; j++){
            if (keyboard[i][j] == 'ENTER' || keyboard[i][j] == 'BACKSPACE') {
                if (keyboard[i][j] == 'BACKSPACE') {
                    $("#keyboard_line"+(i+1)).append(
                        "<div><button class='keyboard-button special-button' value='"+keyboard[i][j]+"' id='"+keyboard[i][j]+"'><i class='fa-sharp fa-solid fa-delete-left'></i></button></div>"
                    )
                } else {
                    $("#keyboard_line"+(i+1)).append(
                        "<div><button class='keyboard-button special-button' value='"+keyboard[i][j]+"' id='"+keyboard[i][j]+"'><p>SEND</p></button></div>"
                    )
                }
            } else {
                $("#keyboard_line"+(i+1)).append(
                    "<div><button class='keyboard-button' value='"+keyboard[i][j]+"' id='"+keyboard[i][j]+"'><p>"+keyboard[i][j]+"</p></button></div>"
                )
            }
        }
    }

    // Keyboard click

    $('.keyboard-button').click(function() {
        keyboard_entry(this.value);
    })

})