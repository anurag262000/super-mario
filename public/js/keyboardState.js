export default class Keyboard {
    constructor() {
        this.keyStates = new Map();
        this.keyMap = new Map();
    }

    addMapping(code, callback) {
        this.keyMap.set(code, callback);
    }

    handleEvent(event) {
        const { code, type } = event;

        if (!this.keyMap.has(code)) {
            return;
        }

        event.preventDefault();

        const keyState = type === 'keydown';

        if (this.keyStates.get(code) === keyState) {
            return;
        }

        this.keyStates.set(code, keyState);
        this.keyMap.get(code)(keyState);
    }

    listenTo(window) {
        ['keydown', 'keyup'].forEach(eventName => {
            window.addEventListener(eventName, event => {
                this.handleEvent(event);
            });
        });

        // Additional logic to handle when the window loses focus
        window.addEventListener('blur', () => {
            this.keyStates.clear();
        });
    }

    anyKeyPressed() {
        return Array.from(this.keyStates.values()).some(state => state);
    }
}
