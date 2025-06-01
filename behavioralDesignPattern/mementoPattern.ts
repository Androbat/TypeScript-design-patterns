// Memento is a behavioral design pattern that 
// lets you save and restore the previous state 
// of an object without revealing the details of its implementation.

// While a <momento> carries the state of an object at a certain time point, it also controls
// the process of setting <setting> the state back to an <object>. This makes the internal
// state implementation hidden from <undo> mechanism.

// The instances controls the <state>
// * Momento: stores the state of an object and defines the  method restore
//   or other API for restoring the state to specific objects

// * Originator: Deals with objects that need to have their internal state stored
// * Caretakeer: Manages mementos without intervening with what's inside

interface State {}

class Memento {
    private state: State;
    constructor(state: State){
        this.state = Object.assign({} as State, state);
    }

    restore(state: State): void {
        Object.assign(state, this.state);
    }
}

class Originator {
    state: State

    get memento(): Memento {
        return new Memento(this.state);
    }

    set memento(memento: Memento){
        memento.restore(this.state)
    }
}

class Caretaker {
    originator: Originator;
    history: Memento[] = [];

    save(): void {
        this.history.push(this.originator.memento);
    }

    restore(): void {
        const memento = this.history.shift();
        if (memento) {
            this.originator.memento = memento;
        }
    }
}