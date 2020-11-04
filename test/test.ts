import ClassA from "./classa";
import ClassB from "./classb";
import {Serializer} from "../serializer";
import { CA } from "./classab";


let a = new ClassA();
let b = new ClassB();
a.b = b;
a.name = 'yang';
b.a = a;
b.name = 'lei';
a.ca = new CA(b);
let s1 = Serializer.serialize(a);
console.log(s1);
// console.log(require.cache);
let oo:ClassA = Serializer.deserialize(s1);
console.log(oo);
oo.ca.sayA();
oo.sayHello();
let n = oo.ca.b.getName();

console.log(n);