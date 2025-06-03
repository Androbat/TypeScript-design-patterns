// The State Pattern is a behavioral design pattern that allows an object to change its behavior when its internal state changes. 
// It appears as if the object changes its class.

// Participants:
// * State -> Defines the interface of state objects that are being "SWITCHED" to internally.
// * Concrete state -> Implements the state interface with behavior corresponding to a specific
//   state of context. May have an optional reference back to its context.
// * Context -> Manages references to different states, and makes operations defined on the active one.


interface State {
    render(hover: boolean): void;
    click(): void;
}

class Context {
    $element: JQuery;
    state: State;

    private render(hover: boolean): void {
        this.state.render(hover);
    }

    private click(): void {
        this.state.click();
    }

    onClick(): void {
        console.log("I'm cliecked");
    }
}

class StateEnabled implements State {
    constructor( public context: Context){}

    render(hover: boolean): void {
        this
            .context
            .$element
            .removeClass("disabled")
            .toggleClass("hover", hover);
    }

    click(): void {
        this.context.onClick();
    }

}

class Context {
    // ...
    private stateEnabled  = new StateEnabled(this);
    private stateDisabled = new stateDisabled(this);
}