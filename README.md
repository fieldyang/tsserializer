# Serializer
Serializer 是一个基于node的实例对象序列化工具，包括序列化和反序列化，支持：  
1. ts和js双语言支持；
2. 对象序列化，包括循环引用对象的序列化；
3. es6 class 反序列化，反序列化的对象绑定class。

## 安装
npm install serializer-node --save
## 使用
### typescript环境
#### 使用说明
对于ts类的编译，需设置ts编译参数
  1. module:"commonjs"
  2. target: "es6或es2017"
#### 示例代码
```typescript
import {Serializer} from "serializer-node"
    ...
let instanceA:ClassA = new ClassA();
    ...
let s:string = Serializer.serialize(a);
    ...
//instanceB is a new instance of ClassA
let instanceB:ClassA = Serializer.deserialize(s);
    ... 
```
### javascript环境
#### 使用说明
js类请按照es6规范进行书写(用class ClassName 进行定义)，同时支持commonjs规范，否则反序列化时无法进行class绑定。
#### 示例代码
```javascript
const serializer = require("serializer-node").Serializer;
    ...
let instanceA = new ClassA();
    ...
let s = serializer.serialize(a);
    ...
//instanceB is a new instance of ClassA
let instanceB = serializer.deserialize(s);
    ... 
```