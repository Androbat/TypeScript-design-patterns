/*
The Bridge Pattern is a structural design pattern that decouples an abstraction from its implementation, allowing them to vary independently. 
It is used to separate the interface (abstraction) from the implementation details, 
making it easier to extend or modify either side without affecting the other.

Key Concepts:

* Abstraction: The high-level interface that defines the operations for clients.
* Implementation: The low-level details that perform the actual work.
* Bridge: A reference in the abstraction that connects it to the implementation.
*/ 

interface UIToolkit {
    drawBorder(): void;
    drawImage(src: string): void;
    drawText(text: string): void;
}

abstract class UIElement {
    constructor(public toolkit: UIToolkit) {}

    abstract render(): void;
}

class TextElement extends UIElement {
    constructor(public text: string, toolkit: UIToolkit){
        super(toolkit);
    }

    render(): void {
        this.toolkit.drawText(this.text);
    }
}

class ImageElement extends UIElement {
    constructor(public src: string, toolkit: UIToolkit){
        super(toolkit);
    }

    render(): void {
        this.toolkit.drawImage(this.src);
    }
}

let toolkit: UIToolkit;
let imageElement = new ImageElement("sampleImage.png", toolkit);
let textElement = new TextElement("Bonjour Eliot", toolkit);

imageElement.render();
textElement.render();

