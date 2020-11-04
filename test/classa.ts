import ClassB from "./classb";
import { CA } from "./classab";
import {Class1} from "./class1";

export default class ClassA extends Class1{
    name:string;
    b:ClassB;
    ca:CA;
    getName(){
        return this.name;
    }
}