// Abstract base class
abstract class UIComponent {
    abstract draw(): void;
}

// Basic element class
class TextIdentifier {
    content: string = "";

    setColor(color: string): void {
        console.log(`Setting color to: ${color}`);
    }

    setFont(font: string): void {
        console.log(`Setting font to: ${font}`);
    }

    draw(): void {
        console.log(`Drawing text: "${this.content}"`);
    }
}

// Concrete UI Component
class TextComponent extends UIComponent {
    texts: TextIdentifier[];

    constructor() {
        super();
        this.texts = [new TextIdentifier()]; // initialize with some text(s)
    }

    draw(): void {
        for (let text of this.texts) {
            text.draw();
        }
    }
}

// Base Decorator class
class Decorator extends UIComponent {
    constructor(public component: UIComponent) {
        super();
    }

    get texts(): TextIdentifier[] {
        // Provide access if the underlying component has 'texts'
        if ('texts' in this.component) {
            return (this.component as any).texts;
        }
        return [];
    }

    draw(): void {
        this.component.draw();
    }
}

// Decorator that sets color
class ColorDecorator extends Decorator {
    constructor(
        component: UIComponent,
        public color: string
    ) {
        super(component); // Call parent constructor
    }

    draw(): void {
        for (let text of this.texts) {
            text.setColor(this.color);
        }
        super.draw();
    }
}

// Decorator that sets font
class FontDecorator extends Decorator {
    constructor(
        component: UIComponent,
        public font: string
    ) {
        super(component);
    }

    draw(): void {
        for (let text of this.texts) {
            text.setFont(this.font);
        }
        super.draw();
    }
}

// Usage
const decoratedComponent = new ColorDecorator(
    new FontDecorator(
        new TextComponent(),  
        'Arial'
    ),
    'black'
);

// While a "decorator" is a function that process target objects, we usually use 
// "Higher order functions" to "parameterize" a decorator.

// What is property descriptor?
function prefix(
    target: Object,
    name: string,
    descriptor: PropertyDescriptor
): PropertyDescriptor {
    let method = descriptor.value as Function;

    if (typeof method !== "function"){
        throw new Error("Expecting decorating a method");
    }

    return {
        value: () => {
            return '[prefix] ' + method.apply(this, arguments);
        },
        enumerable: descriptor.enumerable,
        configurable: descriptor.configurable,
        writable: descriptor.writable
    }
}

