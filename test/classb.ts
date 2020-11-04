import ClassA from "./classa";

export default class ClassB{
    name:string;
    a:ClassA;
    getName(){
        return this.name;
    }
}