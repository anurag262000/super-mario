// Define a class representing a sprite sheet
export default class SpriteSheet {
    // Constructor function to initialize a SpriteSheet object
    constructor(image, width, height) {
        // Initialize properties
        this.image = image; // The image containing the sprite sheet
        this.width = width; // Width of each individual sprite in pixels
        this.height = height; // Height of each individual sprite in pixels
        this.tiles = new Map(); // Map to store named sprites
    }

    // Method to define a new sprite in the sprite sheet
    define(name, x, y) {
        // Create a canvas element to store the sprite
        const buffer = document.createElement('canvas');
        // Set canvas dimensions to match the sprite dimensions
        buffer.width = this.width;
        buffer.height = this.height;
        // Get 2D rendering context of the canvas
        buffer.getContext('2d')
            // Draw the specified portion of the image onto the canvas
            .drawImage(
                this.image, // Source image
                x * this.width, // X-coordinate of the sprite in the image
                y * this.height, // Y-coordinate of the sprite in the image
                this.width, // Width of the sprite
                this.height, // Height of the sprite
                0, // Destination X-coordinate on the canvas
                0, // Destination Y-coordinate on the canvas
                this.width, // Width of the drawn sprite on the canvas
                this.height // Height of the drawn sprite on the canvas
            );
        // Store the canvas buffer containing the sprite in the tiles map with the given name
        this.tiles.set(name, buffer);
    }

    // Method to draw a named sprite onto a canvas
    draw(name, context, x, y) {
        // Retrieve the canvas buffer corresponding to the specified name
        const buffer = this.tiles.get(name);
        // Draw the buffer onto the canvas context at the specified position
        context.drawImage(buffer, x, y);
    }

    drawTile(name, context, x, y) {
        this.draw(name, context, x * this.width, y * this.height);
    }
}
