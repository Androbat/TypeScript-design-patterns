// VISITOR PATTERN
// It is useful in data structures like ABSTRACT SYNTAX TREE(ATS)
// Defition: Visitor pattern allows operations in the same category to be coded in the same place.

// Participants:
// * Visitor: defines the interface  of operations corresponding to each
//            element in the class.
// 
// * Node: Defines the interface of the element accepting the visitor interface.
//         The method is usually called accept.
//
// * ConcreteElement: Implements the accept method to call the methods from the visitor instance
//                    corresponding to the elemnent instance itself.
// 
// * Client: Enumerates elements and applies visitors to them.

interface Node {
    appendTo(visitor: NodeVisitor): void; // Accept method
}

interface NodeVisitor {
    appendText(text: Text): void;
    appendBold(text: BoldText): void;
    appendUnorderedList(list: UnorderedList): void;
    appendListItem(item: ListItem): void;
}

class Text implements Node {
    constructor(public content: string){}
    appendTo(visitor: NodeVisitor): void {
        visitor.appendText(this);
    }
}

class UnorderedList implements Node {
    constructor(public items: ListItem[]){}

    appendTo(visitor: NodeVisitor): void {
        visitor.appendUnorderedList(this);
    }
}

class ListItem implements Node {
    constructor(public content: string){}

    appendTo(visitor: NodeVisitor): void {
        visitor.appendListItem(this);
    }
}

// To be continue...

class HTMLVisitor implements NodeVisitor {
    output = "";

    appendText(text: Text){
        this.output += text.content;

        appendBold(text: BoldText){
            this.output += `<b>${text.content}</b>`;
        }

        appendUnorderedList(list: UnorderedList){
            this.output += "<ul>";
            for (const item of list.items) {
                item.appendTo(this);
            }
            this.output += "</ul>";
        }

        appendListItem(item: ListItem){
            this.output += `<li>${item.content}</li>`;
        }
    }
}