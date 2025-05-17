// COMAND PATTERN:
// Comand pattern involves encapsulating operations as executables
// and could be could be either in the form of <objects> or <functions
// in JavaScript.

function wait(){
    let $layer = $(".wait-layer");
    $layer.show();
    return () => {
        // Closure -> 
       return $layer.hide();
    }
}


let cancel = wait();
setTimeout(() => cancel(), 1000)


// Participants of the <Command Pattern>:
// 1. Command: Defines the general inter of <commands> passing around, it could
//          be a function signature if the command are in the form of <functions>
// 2. Concreate Command: defines the specific behaviors and related <data structure>.
//          It could also be a funtion that matches the signature declared as <Command>.
//          The <cancel> in the concreate command in the example above.
// 3. Context: The context or receiver that the command is associated with. In the first example,
//          it is the $layer
// 4. Client: Create concrete commands and their contexts
// 5. Invoker: Executes the concrete command.

// IMPLEMENTATION:

class TextContext {
    content = "text content";
}

abstract class TextCommand {
    constructor(public context: TextContext){}
    abstract execute(...args: any[]): void;
}

class ReplaceCommand extends TextCommand {
    execute(index: number, length: number, text: string){
        let content = this.context.content;

        this.context.content =
            content.substring(0, index) + text +
                content.substring(index + length);
    }
}

class InsertCommand extends TextCommand {
    execute(index: number, text: string){
        let content = this.context.content;

        this.context.content =
             content.substring(0, index) + text +
                        content.substring(index);
    }
}

class Client {
    private context: new TextContext();

    replaceCommand = new ReplaceCommand(this.context);
    InsertCommand  = new InsertCommand(this.context);
}

// Client just knows or controll context
let client = new Client();

$(".replace-button").click(() => {
    client.replaceCommand.execute(0, 4, "new text");
});

$(".insert-button").click(() => {
    client.InsertCommand.execute(0, "new text");
});

// We can execuate all the command if we want
interface TextCommandInfo {
    command: TextCommand;
    args: any[];
}

class MacroTextCommand {
    constructor(public infos: TextCommandInfo[]) {}

    execute(): void {
        for (let info of this.infos){
            info.command.execute(...info.args);
        }
    }
}

