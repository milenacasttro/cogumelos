export default class Cena1 extends Phaser.Scene {
    constructor () {
        super({ key: 'cena1'});
    }

    preload () {
      this.load.image ('play', 'assets/play1.png');
      this.load.image ('play2', 'assets/play2.png');
      this.load.image ('bg', 'assets/inicio.png');
    }

    create () {
        this.bg = this.add.image(500, 375, 'bg');
        this.play = this.add.image (500, 450, 'play').setScale(1.0);
        this.play.setInteractive();

        // Evento pointerover
        this.play.on('pointerover', () => {
            this.play.setTexture('play2'); // Mudar para a imagem com a cor alterada
        });

        // Evento pointerout
        this.play.on('pointerout', () => {
            this.play.setTexture('play'); // Mudar de volta para a imagem original quando o ponteiro sai do botão
        });

        // Evento pointerdown
        this.play.on('pointerdown', () => {
            this.scene.stop('cena1');
            this.scene.start('cena2');
        });
    
    }

    update () {

    }
}