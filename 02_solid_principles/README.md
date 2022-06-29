# SOLID principles

## Single Responsibility Principle:

The entities should not have more than one responsibility. A class should only have one reason to change.

In the example, we created the class Journal. This last should carry only the main responsibility which was projected to offer.

## Open-Closed Principle

Classed are open for extension but closed for modification. The main idea is that, since we tested, deployed or finished some other step from the process, we must not modify that again unless there is no other possibility.

In the example, we created a class Product and also one class responsible to filter products. If we create a method ```filterByColor``` in the class ```FilterProduct```, for example, we should not modificate that class inserting new methods as ```filterBySize```, ```filterByProperty``` etc.

## Liskov Substitution Principle

Derived classes must not brake the functionalities from their base classes.

In the example, we created a class Rectangle and a derived class Square. Square breaks the functionality in the function ```useIt(rc)```, which could not happen.

## Interface Segregation Principle

Interface parts must be segregated or split up.

Besides there is not an approach for separating interfaces and implementations in pure Javascript in the same way we see in Java, C++ etc, we could do something similar. In the example, we created the abstract class Machine and extended it for creating the classes Printer, Scanner and Photocopier, also abstract. From that point, we derived and created the concrete classes (implementations).

## Dependency Inversion Principle

High-level modules should not be directly dependent of low-level modules.

In the example, we created the classes Relationships and Research. Initially we built the Research using directly the data provided from Relationships. Nevertheless it is not totally right. The interfaces and implementations should carry as much independency as they can. We created a class ```RelationshipBrowser``` for acting like the interface, as an abstract class, with defined methods, but not implemented, which would be natively possible in Typescript. Since ```RelationshipBrowser``` and ```Relationships``` have the same methods, we broke up the dependency between interface and implementation. All the the methods will be implemented in the concrete class.