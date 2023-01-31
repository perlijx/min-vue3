/*
 * @Author: perli 1003914407@qq.com
 * @Date: 2022-11-10 16:20:21
 * @LastEditors: perli 1003914407@qq.com
 * @LastEditTime: 2023-01-31 15:01:04
 * @FilePath: /min-vue3/src/recativity/tests/reactive.spec.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { isReactive, reactive } from "../reactive"

describe("reactive",()=>{
  it("happy path",()=>{
    const original = {foo:1,bar:{age:1}}
    const observed=reactive(original)
    expect(isReactive(observed)).toBe(true)
    expect(isReactive(observed.bar)).toBe(true)
    expect(observed).not.toBe(original)
    expect(observed.foo).toBe(1)
  })
})