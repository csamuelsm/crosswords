let keyboard = [['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
                ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
                ['DIR', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE'],
                ['Reveal 5 Letters', 'Reveal']]


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
        || $('#onboarding-7').hasClass('show')
        || $('#configuracoes').hasClass('show')
        || $('#finish').hasClass('show') )
        {
            // MODAL ESTÁ ABERTO
            // USUÁRIO NÃO PODE DIGITAR NADA
            modal_open = true;
        }

    if (value == 'BACKSPACE') {
        backspace();
    } else if (value == 'DIR') {
        if (!finished) {
            if (dir == 0) dir = 1;
            else dir = 0;
            update(curr_x, curr_y, dir);
        }
    } else if (value == 'Reveal 5 Letters') {
        let items = shuffle($(`.tile[value != "#"][filled != 1][answer = none]`)).slice(0, 5);
        for (let i = 0; i < items.length; i++) {
            let object = $(items[i]);
            let answer = object.attr("value");
            object.html(`<p>${answer.toUpperCase()}</p>`);
            object.attr("answer", answer.toUpperCase());
            object.attr("filled", 1);
            object.attr("verified", 1);
            object.addClass('correto');
            if($('.tile[value != "#"][verified != 1]').length == 0) {
                $('.start_tile').removeClass('start_tile');
                $('.start_line').removeClass('start_line');
            }
        }
        verify_grid();
    } else if (value == 'Reveal') {
        let items = $(`.tile[x=${curr_x}][y = ${curr_y}]`);
        items.each(function(index, element) {
            let object = $(this);
            let answer = object.attr("value");
            object.html(`<p>${answer.toUpperCase()}</p>`);
            object.attr("answer", answer.toUpperCase());
            object.attr("filled", 1);
            object.attr("verified", 1);
            object.addClass('correto');
        });
        next_tile();
        verify_grid();
    } else if (value == 'Auto Check') {
        //AUTO CHECK TODO
    } else {
        if (!modal_open) {
            if ($(`.tile[x=${curr_x}][y=${curr_y}]`).attr('verified') != 1) {
                $(`.tile[x=${curr_x}][y=${curr_y}]`).html(`<p>${value}</p>`);
                $(`.tile[x=${curr_x}][y=${curr_y}]`).attr('fill', 1);
                $(`.tile[x=${curr_x}][y=${curr_y}]`).attr('answer', value);
                next_tile();
            }
        }
    }


}

$(document).ready(function(){

    // Keyboard Creation

    for (let i = 0; i < keyboard.length; i++) {
        for (let j = 0; j < keyboard[i].length; j++){
            if (keyboard[i][j] == 'DIR' || keyboard[i][j] == 'BACKSPACE'
                || keyboard[i][j] == 'Auto Check' || keyboard[i][j] == 'Reveal 5 Letters'
                || keyboard[i][j] == 'Reveal') {
                if (keyboard[i][j] == 'BACKSPACE') {
                    $("#keyboard_line"+(i+1)).append(
                        "<div><button class='keyboard-button special-button' value='"+keyboard[i][j]+"' id='"+keyboard[i][j]+"'><i class='fa-sharp fa-solid fa-delete-left'></i></button></div>"
                    )
                } else if (keyboard[i][j] == 'DIR') {
                    $("#keyboard_line"+(i+1)).append(
                        "<div><button class='keyboard-button special-button booster-button' value='"+keyboard[i][j]+"' id='"+keyboard[i][j]+"'><img class='change_dir_icon' src='assets/buttons/change_dir_icon.png'/></button></div>"
                    )
                } else if (keyboard[i][j] == 'Reveal') {
                    $("#keyboard_line"+(i+1)).append(
                        "<div><button class='keyboard-button special-button booster-button' value='"+keyboard[i][j]+"' id='"+keyboard[i][j]+"'><img class='booster_key' src='assets/buttons/mini/"+ getGameLang() +"/reveal.png'/></button></button></div>"
                    )
                } else if (keyboard[i][j] == 'Reveal 5 Letters') {
                    $("#keyboard_line"+(i+1)).append(
                        "<div><button class='keyboard-button special-button booster-button' value='"+keyboard[i][j]+"' id='"+keyboard[i][j]+"'><img class='booster_key' src='assets/buttons/mini/"+ getGameLang() +"/reveal_k.png'/></button></button></div>"
                    )
                } else {
                    $("#keyboard_line"+(i+1)).append(
                        "<div><button class='keyboard-button special-button' value='"+keyboard[i][j]+"' id='"+keyboard[i][j]+"'><p>"+keyboard[i][j]+"</p></button></div>"
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

function shuffle(array) {
    var m = array.length, t, i;

    // While there remain elements to shuffle…
    while (m) {

      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);

      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }

    return array;
  }