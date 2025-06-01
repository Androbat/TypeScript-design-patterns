// The iterator provides a universal interface for accessing internal 
// elements of an <aggregate> without exposing the underlying data structure.
// A typical iterator contains the following methods or getters:

// * first(): moves the cursor to the <first> in the aggregates.
// * next():  moves the cursor to the next element.
// * end():   a getter that returns a <Boolean> indicates wheather the cursor is at the end
// * item():  a getter that returns an element at the position of the current cursor
// * index:   a getter that returns the <index> of the element at the current cursor
// Symbol.iterator -> 

// Participants:
// Iterator -> AbstractListIterator: defines the universal iterator interface that is going to <traverse> different aggregates
// Create iterator -> ListIterator, SkipListIterator, ReverseListIterator: implements specific iterator that traverses and keeps
// track of specific aggregate

// Aggregate -> AbstractList: defines a basic interface of aggregates that iterators are going to work with.
// Concrete aggregate -> List, SkipList: defines the data structure and factory method/getter for creating
// associated iterators.

interface Iterator<T>{
    first(): void;
    next(): void;
    end(): boolean;
    item: T;
    index: number;
}

interface Array<T>{
    iterator: IteratorPattern.Iterator<T>
}

interface IteratorResult<T>{
    done: boolean;
    value: T;
}

interface Iterator<T>{
    next(value?: any): IteratorResult<T>;
    return?(value?: any): IteratorResult<T>;
    throw?(e?: any): IteratorResult<T>;
}

interface Iterator<T> {
    [Symbol.iterator](): Iterator<T>;
}

class ArrayIterator<T> implements Iterator<T> {
    constructor(public array: T[]){}
    first(): void {
        this.index = 0;
    }

    next(): void {
        this.index++;
    }

    get end(): boolean{
        return this.index >= this.array.length;
    }

    get iteam(): T {
        return this.array[this.index];
    }

    
}

Object.defineProperty(Array.prototype, 'iterator', {
    get(){
        return new ArrayIterator(this);
    }
})


class SomeData<T>{
    array: T[]
    [Symbol.iterator](){
        return new SomeIterator<T>(this.array)
    }
}

class SomeIterator<T> implements Iterator<T>{
    index: number;
    constructor(public array: T[]){
        this.index = array.length - 1;
    }

    next(): IteratorResult<T>{
        if (this.index <= this.array.length){
            return {
                value: undefined,
                done: true
            }
        } else {
            return {
                value: this.array[this.index--],
                done: false
            }
        }
    }
}
