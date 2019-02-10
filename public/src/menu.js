let scene;
var MenuScene = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize:

        function MenuScene() {
            Phaser.Scene.call(this, {key: "MenuScene"});
        },

    preload: function(){
        scene = this;


        //progress bar
        var progressBar = scene.add.graphics();
        var progressBox = scene.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(240, 270, 320, 50);
        scene.load.on('progress', (value) => {
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(250, 280, 300 * value, 30);
        });

        scene.load.on("complete", () => {
            progressBox.destroy();
            progressBar.destroy();
        });




        //load all necessary assets
        $.each(objects, function (index, values) {
            if(values.type === "building"){
                console.log(index);
                scene.load.image(index, "/assets/buildings/" + index+".png");
                scene.load.image(index+"Icon", "/assets/hudIcons/buildings/" + index + ".png");
            }else{
                scene.load.image(index, "/assets/roads/" + index + ".png");
                scene.load.image(index+"Icon", "/assets/hudIcons/roads/" + index + ".png");
            }

        });
        //in game menu
        this.load.image("buildBuilding", "/assets/hudIcons/buildBuilding.png");
        this.load.image("buildRoad", "/assets/hudIcons/buildRoad.png");
        this.load.image("previousPage", "/assets/hudIcons/previousPage.png");

        //main menu
        this.load.image('jouer', '/assets/menu/jouer.png');
        this.load.image('options', '/assets/menu/options.png');
        this.load.image('quitter', '/assets/menu/quitter.png');

        //others
        this.load.image('arrowN', '/assets/buildings/arrows/arrowN.png');
        this.load.image('arrowS', '/assets/buildings/arrows/arrowS.png');
        this.load.image('arrowE', '/assets/buildings/arrows/arrowE.png');
        this.load.image('arrowW', '/assets/buildings/arrows/arrowW.png');

    },

    create: function () {
        scene.scene.bringToTop();
        let sprite = this.add.sprite(window.innerWidth/2, window.innerHeight/10 * 3.5, 'jouer', false).setOrigin(0.5, 0);
        scene.add.sprite(window.innerWidth/2, window.innerHeight/10 * 5, 'options', false).setOrigin(0.5, 0);
        scene.add.sprite(window.innerWidth/2, window.innerHeight/10 * 6.5, 'quitter', false).setOrigin(0.5, 0);
        sprite.setInteractive();
        sprite.on("pointerdown", () => {
            scene.scene.start("HudScene");
            scene.scene.start('GameScene');
            scene.scene.stop('MenuScene');
        }, this);
    }
});

export default MenuScene;