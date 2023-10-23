import Player from '@vimeo/player'; // importo la biblioteca Player de vimeo.
import throttle from 'lodash.throttle'; // importo la biblioteca de lodash throttle
// la primer biblioteca es para interactuar con el reproductor de vimeo y la segunda es para aplicar un throttle al evento de actualizacion de tiempo

const iframe = document.getElementById('vimeo-player');
const player = new Player(iframe); //creo una instancia de la clase Player de la biblioteca vimeo para interactuar con el video iframe obtenido

player.on('timeupdate', function (data) {
  //ecucho el evento 'timeupdate' del reproductor de vimeo. este evento se dispara periodicamente mientras el video se esta reproducioendo
  // y proporciona informacion sobre el tiempo de reproducion actual
  const tiempoActual = data.seconds;
  localStorage.setItem('videoplayer-current-time', tiempoActual); // guardo el tiempo de reproducion actual en el almacenamiento local bajo la clave: videoplayer-current-time
});

//obtengo el tiempode reproducion guardado previamente en el almacenamiento local
const tiempoGuardado = localStorage.getItem('videoplayer-current-time');
//para establecer el tiempo de reproducion del momento guardado, meteodo setCurrentTime
player
  .setCurrentTime(tiempoGuardado)
  .then(function (seconds) {
    player.play();
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        player.setCurrentTime(0).then(function () {
          player.play();
        });
        break;
      default:
        break;
    }
  });
