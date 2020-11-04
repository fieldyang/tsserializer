import ClassB from "./classb";

export default class ClassA{
    name:string;
    b:ClassB;
    getName(){
        return this.name;
    }
}