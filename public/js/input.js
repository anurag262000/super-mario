import Keyboard from './KeyboardState.js';

export function setupKeyboard(mario) {
    const input = new Keyboard();

    input.addMapping('Space', keyState => {
        if (keyState) {
            mario.jump.start();
        } else {
            mario.jump.cancel();
        }
    });

    input.addMapping('KeyW', keyState => {
        mario.turbo(keyState);
    });

    input.addMapping('KeyD', keyState => {
        mario.go.dir = keyState || input.anyKeyPressed() ? 1 : 0;
    });

    input.addMapping('KeyA', keyState => {
        mario.go.dir = keyState || input.anyKeyPressed() ? -1 : 0;
    });

    return input;
}
