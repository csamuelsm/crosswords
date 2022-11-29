async function read_game(lang, game_mode) {
    /*
        Recebe linguagem do jogo e game mode e retorna os dados do JSON
    */
    const today = new Date();
    let timestamp = today.setUTCHours(0, 0, 0, 0);
    let url = `https://content.everydaycrossword.com/web-games/${game_mode}/${lang}/${timestamp}.json`;
    let data = await $.getJSON(url);
    //console.log(data);
    return data;
}

async function generate_grid(data) {
    /*
        Recebe os dados do JSON e retorna um dicionário com cada posição
        de um grid e as respectivas letras
    */
    let grid = {};

    for await (element of data['cifras']) {
        let x = element['position']['x'];
        let y = element['position']['y'];
        let dir = element['position']['direction'];
        let resposta = element['respostaNormalizada'];
        let len = resposta.length;
        let dica = element['dica'];
        //console.log(x, y, dir, len);

        for (let j = 0; j <= len; j++) {
            if (dir == 0) {
                if (`${x + j},${y}` in grid) {
                    grid[`${x + j},${y}`]['dica-horizontal'] = dica;
                    grid[`${x + j},${y}`]['resposta'] = resposta[j];
                } else {
                    grid[`${x + j},${y}`] = {
                        'dica-horizontal': dica,
                        'resposta': resposta[j]
                    }
                }

            } else {
                if (`${x},${y + j}` in grid) {
                    grid[`${x},${y + j}`]['dica-vertical'] = dica;
                    grid[`${x},${y + j}`]['resposta'] = resposta[j];
                } else {
                    grid[`${x},${y + j}`] = {
                        'dica-vertical': dica,
                        'resposta': resposta[j]
                    }
                }
            }
        }
    }

    return grid;
}

function create_layout(grid) {
    let biggest_x = -1;
    let biggest_y = -1;
    for (const [key, value] of Object.entries(grid)) {
        // encontra o maior valor de x e y
        let position = key.split(',');
        if (parseInt(position[0]) > biggest_x) biggest_x = parseInt(position[0]);
        if (parseInt(position[1]) > biggest_y) biggest_y = parseInt(position[1]);
    }

    for (let i = 0; i < biggest_y; i++) {
        $('.board').append(
            '<div class="row col-12 d-flex align-items-center justify-content-center current" id="line'+i+'"></div>'
        );
        for (let j = 0; j < biggest_x; j++) {
            if (`${j},${i}` in grid && grid[`${j},${i}`]['resposta'] != undefined) {
                $(`#line${i}`).append(
                    '<div x=' + j + ' y=' + i + ' value="' + grid[`${j},${i}`]['resposta'] + '" class="tile"></div>'
                );
            } else {
                $(`#line${i}`).append(
                    '<div x=' + j + ' y=' + i + ' value="#" class="tile black"></div>'
                );
            }
        }
    }
}