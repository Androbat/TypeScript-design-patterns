// STRATEGY PATTERN
// It's common that a program has similar outlines for processing different targets with 
// different detailed algorithms. <Strategy Pattern> encapsulates those algorithms and makes
// them interchangeable within the shared outline.

/* 
    if (type === 'value'){
        // ...
    } else if (type === 'increment'){
        // ...
    } else if (type === 'set'){
       // ... 
    }

    let strategy = strategies[type];
    strategy.operation();
*/

// PARTICIPANTS
// * Strategy -> defines the interface of strategy objects or classes
// * Concrete strategy -> ConcreteStrategyA and ConcreteStrategyB: implements concrete
//   strategy operations defined by the <Strategy> interface

// * Strategy manager -> defines a data structure to manage strategy objects
// * Target -> the target to apply algorithms defined in strategy objects
// * Client -> makes the targets and strategies cooperate

type TargetType = "a" | "b";

interface Target {
    type: TargetType
}

interface TargetA extends Target {
    type: "a";
    result: string;
}

interface TargetB extends Target {
    type: "b",
    value: number;
}

interface Strategy<TTarget extends Target>{
    operationX(target: TTarget): void;
    operationY(target: TTarget): void;
}

let strategyA: Strategy<TargetA> = {
    operationX(target){
        target.result = target.result + target.result;
    },
    operationY(target){
        target.result = target
            .result
            .substring(Math.floor(target.result.length / 2));
    }   
};

let strategyB: Strategy<TargetB> = {
    operationX(target){
        target.value = target.value * 2;
    },
    operationY(target){
        target.value = Math.floor(target.value / 2);
    }
}

let strategies: {
    [type: string]: Strategy<Target>
} = {
    a: strategyA,
    b: strategyB
}

let targets: Target[] = [
    { type: "a" },
    { type: "a" },
    { type: "b" }
]

for (let target of targets){
    let strategy = strategies[target.type];

    strategy.operationX(target);
    strategy.operationY(target);    
}

type MathOperationOps = "add" | "sustract";

interface ops {
    type: MathOperationOps
}

// Continue...

