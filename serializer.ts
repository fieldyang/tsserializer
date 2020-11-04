export default class Serializer{
    /**
     * 序列化索引号，用于生成序列id
     */
    private static serialIndex:number = 1;

    /**
     * 序列前置标识  序列号格式为 nser.ClazzA@123，七中ClazzA为class名，123为索引号
     */
    private static preSerial:string = '_nserial_';
    /**
     * 序列化
     * @param instance  待序列化对象
     * @returns         序列化对象
     */
    public static serialize(instance:any):string{
        const me = this;
        if(typeof instance !== 'object'){
            return instance + '';
        }

        //临时map，key object,value 序列化id
        let tmpMap:WeakMap<object,string> = new WeakMap();
        //序列化map
        let serMap:Map<string,string> = new Map();
        handleOne(instance,tmpMap,serMap);
        let retObj = {};
        let keys:string[] = [];
        //倒序
        for(let key of serMap.keys()){
            keys.unshift(key);
        }
        for(let k of keys){
            retObj[k] = serMap.get(k);
        }
        
        return JSON.stringify(retObj);
        
        /**
         * 处理一个对象
         * @param instance  实例对象 
         * @param tmpMap    临时对象map
         * @returns         序列化后的串
         */
        function handleOne(instance:any,tmpMap:WeakMap<Object,any>,serMap:Map<string,any>):string{
            if(typeof instance !== 'object'){
                return instance;
            }

            if(tmpMap.has(instance)){
                return tmpMap.get(instance);
            }
            let serId:string = me.genSerialId(instance.constructor.name);
            
            //存入序列化id
            tmpMap.set(instance,serId);

            Object.getOwnPropertyNames(instance).forEach(p=>{
                if(typeof instance[p] === 'object'){
                    let o = instance[p];
                    if(!tmpMap.has(o)){
                        tmpMap.set(o,handleOne(o,tmpMap,serMap));
                    }
                    instance[p] = tmpMap.get(o);
                }
            });
            //序列化串存入map
            serMap.set(serId,instance);
            return serId;
        }
    }

    /**
     * 反序列化
     * @param instanceStr   反序列化串
     * @returns             反序列化对象  
     */
    public static deserialize(instanceStr:string):any{
        const me = this;
        let gobj = JSON.parse(instanceStr);
        handleOne(gobj); 
        let keys = Object.getOwnPropertyNames(gobj);
        return gobj[keys[0]];
        function handleOne(obj:any):any{
            if(typeof obj !== 'object'){
                return;
            }
            //序列化值正则式
            let serReg = new RegExp('^' + me.preSerial + '\\.\\w[\\w\\d]*@\\d?$');
            Object.getOwnPropertyNames(obj).forEach(key=>{
                let v = obj[key];
                if(serReg.test(key)){
                    // v = JSON.parse(v);
                    handleOne(v);
                    obj[key] = v;
                }
                
                //属性值为序列化对象
                if(serReg.test(v) && gobj[v]){
                    obj[key] = gobj[v];
                    //获取类名
                    let cName:string = v.substr(me.preSerial.length + 1,v.indexOf('@')-me.preSerial.length-1);
                    //获取类
                    let cls = me.getModuleClass(cName);
                    //给对象绑定类原型
                    if(cls){
                        obj.__proto__ = cls.prototype;
                    }
                }
            });
        }
        
    }

    /**
     * 生成序列化id
     * @param className     类名
     */
    private static genSerialId(className:string):string{
        return this.preSerial + '.' + className + '@' + this.serialIndex++;
    }

    /**
     * 获取模块class
     * @param className     类名
     */
    private static getModuleClass(className:string):any{
        for(let c of require.main.children){
            if(c.exports.default.name === className){
                return c.exports.default;
            }
        }
    }
}
