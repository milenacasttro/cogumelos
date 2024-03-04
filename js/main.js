import Cena1 from './cena1.js';
import Cena2 from './cena2.js';

const larguraJogo = 1000;
const alturaJogo = 750;

window.onload = function () {
    let gameConfig = {
        type: Phaser.AUTO,
        scale: {
            width: larguraJogo,
            height: alturaJogo,
            autoCenter: Phaser.Scale.CENTER,
        },

        // Adição da física do jogo
        physics: {
            default: 'arcade',
            arcade: {
            gravity: {y: 300},
            debug: true
            
        }
    },
    backgroundColor: '#000000',

    scene: [Cena1, Cena2],
    parent: 'game', 
    dom: {
        createContainer: true

    },
};

    game = new Phaser.Game (gameConfig);

    window.focus();

}