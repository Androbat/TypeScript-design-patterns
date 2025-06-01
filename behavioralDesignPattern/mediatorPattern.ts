// The Mediator pattern is a behavioral design pattern used to reduce tight coupling between components 
// (or classes) that communicate with each other. 
// Instead of components referring to and communicating with each other directly, 
// they use a mediator object to coordinate their interactions.

// Participants:
// * Mediator: usually, the abstraction or skeleton predefined by a framework. Defines the interface
//   that  colleagues in a mediator communicate through.
// * Concrete mediator: LocationPicker
//   

interface LocationResult {
    country: string;
    province: string;
    city: string;
}

