import { mutableHandler, readOnlyHandler } from './baseHandlers'

/*
 * @Author: perli 1003914407@qq.com
 * @Date: 2022-11-10 16:48:12
 * @LastEditors: perli 1003914407@qq.com
 * @LastEditTime: 2023-01-28 17:35:17
 * @FilePath: /min-vue3/src/recativity/reactive.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

export const enum ReactiveFlags {
  IS_REACTIVE="_v_isReactive",
  IS_READONLY="_v_isReadOnly"
}
export function reactive(raw) {
  return createActiveObject(raw, mutableHandler)
}

export function readOnly(raw) {
  return createActiveObject(raw, readOnlyHandler)
}

function createActiveObject(raw, baseHandlers) {
  return new Proxy(raw, baseHandlers)
}

export function isReactive(value) {
  return !! value[ReactiveFlags.IS_REACTIVE]
}
export function isReadOnly(value) {
  return !! value[ReactiveFlags.IS_READONLY]
}
