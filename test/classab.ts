import ClassB from "./classb";

class CA{
    b:ClassB;
    constructor(b:ClassB){
        this.b = b;
    }
    public sayA(){
        console.log('a');
    }
}

class CB{
    public sayB(){
        console.log('b');
    }
}

export {CA,CB}