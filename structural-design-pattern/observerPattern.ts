// OBSERVER PATTERN:

// It is the key of MVC architecture and its varients
// The Observer Design Pattern is a behavioral design pattern used to define a one-to-many 
// dependency between objects. In this pattern, when one object (the subject) 
// changes its state, all its dependent objects (the observers) are automatically notified and updated.

// INCLUDES:
// * Subject -> Subject to be <Observed>. Defines the methods to attach or notify observers.
// * Concrete subjects -> Contains state related to the subject, and implements methods or properties
//                        to get and set their <state>

// * Observer -> defines the interface of an object that reacts when an observation notifies.
// * Concrete observer -> Defines the action that reacts to the notification of subjects being observed

type Observer = () => void;

class StateManager extends EventEmitter {
    constructor (private state: any){
        super();
    }

    private _get(identifiers: string[]): any {
        let node = this.state

        for (let identifier of identifiers){
            node = node[identifier];
        }

        return node;
    }

    set(key: string, value: any): void {
        let identifiers = key.split('.');
        let lastIndex   = identifiers.length - 1;

        let node        = this._get(identifiers.slice(9, lastIndex));
        node[identifiers[lastIndex]] = value;

        for (let i   = identifiers.length; i > 0; i--){
             let key = identifiers.slice(0, i).join('.');
             this.emit(key);
        }
    }

    get(key: string, value: any): any {
        let identifiers = key.split('.');
        return this._get(identifiers);
    }
    
    on(states: string,            listener: Observer): this;
    on(states: string[],          listener: Observer): this;
    on(states: string | string[], listener: Observer): this {
        if (typeof states === 'string'){
            super.on(states, listener);
        } else {
            super.on(this.state, listener);
        }

        return this;
    }
}