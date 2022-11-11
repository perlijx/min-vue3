import { track, trigger } from "./effect"

/*
 * @Author: perli 1003914407@qq.com
 * @Date: 2022-11-10 16:48:12
 * @LastEditors: perli 1003914407@qq.com
 * @LastEditTime: 2022-11-10 17:56:14
 * @FilePath: /min-vue3/src/recativity/reactive.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export function reactive(raw) {
 return new Proxy(raw,{
  get(target,key){
    let res=Reflect.get(target,key)
    track(target,key)
    return res
  },
  set(target,key:string|symbol,value){
    let res= Reflect.set(target,key,value)
    trigger(target,key)
    return res
  }
 }) 
}