import SpriteSheet from "./SpriteSheet.js";
import { loadImage, loadLevel } from "./loaders.js";

function drawTiles(tiles, context, sprites) {
    tiles.forEach(tile => {
        for (let x = tile.position.x; x < tile.position.x + tile.size.width; x++) {
            for (let y = tile.position.y; y < tile.position.y + tile.size.height; y++) {
                sprites.drawTile(tile.type, context, x, y);
            }
        }
    });
}




const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

loadImage('/image/tiles.png')
    .then(image => {
        const sprites = new SpriteSheet(image, 16, 16);
        sprites.define('ground', 0, 0);
        sprites.define('sky', 3, 23);

        const tileWidth = Math.ceil(canvas.width / sprites.width); // Calculate number of tiles horizontally
        const tileHeight = Math.ceil(canvas.height / sprites.height); // Calculate number of tiles vertically
        console.log(tileWidth, tileHeight);


        loadLevel('1-1')
            .then(level => {
                if (level.tiles && level.tiles.length > 0) {
                    drawTiles(level.tiles, context, sprites);
                } else {
                    console.error("No tile data found in level JSON.");
                }
            });




    })
    .catch(error => {
        console.error('Error loading image:', error);
    });
