# SOLID Principles of Object Oriented Design

5 fundamentals of OOD.

## The `S`ingle Responsibility Principle

_"Just because you can doesn't mean you should."_

- **Cohesion**: How strongly related are the various responsibilities of a module.
- **Coupling**: Degree to which each program modules relies on each of the other modules.

**The more classes a change affects, the more likely the change will introduce errors.**

The Single Responsibility Principle means you have lower coupling for higher cohesion.

## The `O`pen / Closed Principle

**Software entities (classes / modules / functions, etc.) should be open for extension, but closed for modification.**

Three approaches to achieve abstraction:

Conformance yields flexibility, reusability, and maintainability.

### Parameters

Allow client to control behavior via parameters.

### Inheritance

Child types override behavior of base class / interface.

### Composition / Strategy Pattern

Client code depends on abstraction through a "plug in" model.

## The `L`iskove Substitution Principle

Calling code should not know any difference between is derived type and base type.

- To follow, derived classes mustn't violate constraints defined on the base class.

Use _invariants_ in **polymorphism** to express preconditions and postconditions for methods.

- Follow _Design by Contract_, a technique which makes defining the pre/post conditions explicit within the code itself.

Use unit tests to specify expected behavior of a method or class.

## The `I`nterface Segregation Principle

An `interface` specifies a public set of classes and methods. It is what the client _"sees and uses"_.

- Refactor large interfaces so they inherit smaller interfaces.
- Keep interfaces lean and focused.
- Don't force client code to depend on things it doesn't need.

## The `D`ependency Inversion Principle

_High-level modules should not depend on low-level modules. Both should depend on abstractions._

**Abstractions should not depend on details. Details should depend on abstractions.**

Examples of dependencies are:

- Frameworks
- Third Party Libraries
- Databases
- File Systems
- Web Services

The best way to implement this is pass dependencies into the _constructor_. This is called **Constructor Injection**.

**Property Injection** is when dependencies are passed in via a property, using a `setter` method.

- Allows dependency to be changed at any time.

**Parameter Injection** follows passing in dependencies through a method parameter.

- It's granular and flexible but should only be consider if **only one** method has the dependency.
