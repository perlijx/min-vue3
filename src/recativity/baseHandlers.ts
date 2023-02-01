/*
 * @Author: perli 1003914407@qq.com
 * @Date: 2022-11-18 11:26:16
 * @LastEditors: perli 1003914407@qq.com
 * @LastEditTime: 2023-02-01 10:16:41
 * @FilePath: /min-vue3/src/recativity/baseHandlers.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { extend, isObject } from '../../shared'
import { track, trigger } from './effect'
import { reactive, readOnly } from './reactive'
const get =createGetter()
const readOnlyGet=createGetter(true)
const shallowReadOnlyGet=createGetter(true,true)
const set =createSetter()
function createGetter(isReadOnly = false,shallow = false) {
  return function get(target, key) {
    if(key === "_v_isReactive"){
      return !isReadOnly
    }else if (key === "_v_isReadOnly"){
      return isReadOnly
    }
    const res = Reflect.get(target, key)

    if(isReadOnly&&shallow){
      return res
    }

    if(isObject(res)){
      return isReadOnly? readOnly(res) : reactive(res)
    }
    if (!isReadOnly) {
      track(target, key)
    }
    return res
  }
}
function createSetter() {
  return function set(target, key: string | symbol, value) {
    let res = Reflect.set(target, key, value)
    trigger(target, key)
    return res
  }
}

export const mutableHandler = {
  get,
  set
}

export const readOnlyHandler = {
  get: readOnlyGet,
  set(target, key, value) {
   console.warn(`key ${key} is readOnly`);
    return true
  }
}

export const shallowReadOnlyHandler = extend({},readOnlyHandler,{
  get:shallowReadOnlyGet
})