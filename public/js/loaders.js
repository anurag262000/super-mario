// Function to load an image asynchronously from the specified URL
export function loadImage(url) {
    // Return a Promise that resolves with the loaded image
    return new Promise(resolve => {
        // Create a new HTML Image element
        const image = new Image();
        // Add an event listener to handle the 'load' event, resolving the Promise when the image is loaded
        image.addEventListener('load', () => {
            resolve(image); // Resolve the Promise with the loaded image
        });
        // Set the source of the image to the provided URL, initiating the image loading process
        image.src = url;
    });
}

export function loadLevel(name) {
    return fetch(`/levels/${name}.json`)
        .then(response => response.json())
        .then(data => {
            return {
                tiles: data.tiles || [] // Ensure tiles array exists, default to empty array if not present
            };
        })
        .catch(error => {
            console.error("Error loading level:", error);
            throw error; // Rethrow the error to handle it elsewhere if needed
        });
}


