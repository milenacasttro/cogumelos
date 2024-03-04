export default class Cena2 extends Phaser.Scene {
    constructor() {
        super({ key: 'cena2' });
    }

    preload() {
        this.load.image('fundo', 'assets/fundo.png');
        this.load.image('chao', 'assets/chao.png');
        this.load.image('plataforma', 'assets/plataforma.png');
        this.load.image('cogumelo', 'assets/cogumelo.png');
        this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
    }

    create() {
        this.fundo = this.add.image(500, 375, 'fundo');

        // Configuração do jogador
        this.player = this.physics.add.sprite(170, 130, 'dude');
        this.player.setCollideWorldBounds(true);

        // Configuração do chão e das plataformas
        const chao = this.physics.add.staticImage(500, 718, 'chao');
        const plataforma = this.physics.add.staticImage(60, 400, 'plataforma');
        const plataforma2 = this.physics.add.staticImage(500, 550, 'plataforma');
        const plataforma3 = this.physics.add.staticImage(900, 400, 'plataforma');

        // Adicionando colisões entre jogador e elementos estáticos
        this.physics.add.collider(this.player, [chao, plataforma, plataforma2, plataforma3]);


        // Configuração dos controles do jogador
        this.cursors = this.input.keyboard.createCursorKeys();
        
        //  Our player animations, turning, walking left and walking right.
        this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
        });

        this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: -1
        });

        this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
        });


        // Configuração dos cogumelos
        this.cogumelosGroup = this.physics.add.group({
            key: 'cogumelo',
            repeat: 5, // 6 cogumelos no total
            setXY: { x: 12, y: 0, stepX: 70 }
        });

        // Configuração das propriedades dos cogumelos
        this.cogumelosGroup.children.iterate(function (cogumelo) {
        cogumelo.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        cogumelo.setCollideWorldBounds(true);

        // Adicionando colisão entre cogumelo e elementos estáticos
        this.physics.add.collider(cogumelo, [chao, plataforma, plataforma2, plataforma3]);
    
        cogumelo.setVelocityY(100); // Faz os cogumelos caírem
        }, this);


        // Adicionando colisão entre jogador e cogumelos
        this.physics.add.overlap(this.player, this.cogumelosGroup, this.collectCogumelo, null, this);

        // Configuração do texto do placar
        this.score = 0;
        this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });


    }

    update() {
        const player = this.player;
        const cursors = this.cursors;

        // Define a animação padrão
        player.anims.play('turn');

        if (cursors.left.isDown) {
        player.setVelocityX(-160);
        player.anims.play('left', true); // Inicia a animação para a esquerda
        
        } else if (cursors.right.isDown) {
        player.setVelocityX(160);
        player.anims.play('right', true); // Inicia a animação para a direita
        }

        if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-330);
        }
    }

    collectCogumelo(player, cogumelo) {
        cogumelo.destroy();
        this.score += 10;
        this.scoreText.setText('Score: ' + this.score);

        if (this.cogumelosGroup.countActive(true) === 0) {
            this.cogumelosGroup.children.iterate(function (cogumelo) {
                cogumelo.enableBody(true, cogumelo.x, 0, true, true);
            });
        }
    }
}
