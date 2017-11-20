window.addEventListener('load', begin);
/**variables  */
var MAXCHARACTER = 140;
var tweetArea = document.getElementById('tweet-area');
var tweetBtn = document.getElementById('tweet-btn');
var count = document.getElementById('count');

/**Crea el tweet */
function showTweet(event) {
    var text = tweetArea.value;
    var div = document.createElement('div');
    var span = document.createElement('span');
    var messages = document.getElementById('messages');
    span.textContent = text;
    div.appendChild(span);
    messages.appendChild(div);
    event.preventDefault();
    tweetArea.focus();
    clear();
    validate();
}
/**Validar que no ingresa valores vacios */

function validate() {
    if (tweetArea.value) {
        tweetBtn.disabled = false
        var countChar = tweetArea.value.length;
        var valueChar = MAXCHARACTER - countChar;
        count.textContent = valueChar;
        if(valueChar<0){
            count.style.color = "red";
        }
    }
    else {
        tweetBtn.disabled = true;
        count.textContent = MAXCHARACTER;
    }
    
}


/**funcion que limpia el textarea */
function clear() {
    tweetArea.value = '';
}


function resizeEnter() { /*Funcion que aumenta rows cuando se presiona enter*/
    var textArray = tweetArea.value.split(''); /**Convertir en un array todas las letras del texto */
    var acum = 0; /**Inicializar un acumulador en 0 */
    for (var i = 0; i < textArray.length; i++) { /**recorrer el nuevo array */
        if (textArray[i] === '\n') { /**SI el elemento es un salto de linea o enter */
            acum++; /**El acumulador aumenta en 1 */
        }
        if (acum) { /**SI el acumulador tiene un valor mayor a 0 */
            tweetArea.rows = acum + 2; /**la cantidad de rows aumenta en 2 */
          
        }
         
    }
   
    
}

function resizeChar(){ /**Condicion que rreajusta el texto al contenido */
    var countCharLimit = tweetArea.value.length/tweetArea.cols; /**Division de cantidad de caracteres y columns */
    if (countCharLimit <= tweetArea.rows) { /**Si la cantidad de caracteres/columnas es menor o = a rows */
        tweetArea.rows = countCharLimit + 2; /**aumenta  */
      }
}


function begin() {
    tweetBtn.addEventListener('click', showTweet);
    tweetArea.addEventListener('keyup', validate); /**valida que no ingresa vacio */
    tweetArea.addEventListener('keyup',resizeChar); /**ajusta el textarea al contenido */
    tweetArea.addEventListener('keyup',resizeEnter);/**ajusta al enter */
    tweetBtn.disabled = true;
    count.textContent = MAXCHARACTER;
}