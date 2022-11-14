/*
 * @Author: perli 1003914407@qq.com
 * @Date: 2022-11-10 17:18:09
 * @LastEditors: perli 1003914407@qq.com
 * @LastEditTime: 2022-11-14 15:31:53
 * @FilePath: /min-vue3/src/recativity/tests/effect.spec.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { effect } from "../effect";
import { reactive } from "../reactive"

describe("effect",()=>{
  it("happy path",()=>{
    const user = reactive({
      age:10
    })
    let nextAge;
    effect(()=>{
      nextAge=user.age+1
    })
    expect(nextAge).toBe(11)
    user.age++
    expect(nextAge).toBe(12)
  })

  it("runner",()=>{
    let foo =10
    const fn =()=>{
       foo++
      return "foo"
    }
    const runner = effect(()=>{
      foo++
      return "foo"
    })
    expect(foo).toBe(11)
    const r = runner()
    expect(foo).toBe(12)
  })
  
  it("scheduler",()=>{
    let dummy
    let run:any
    const scheduler = jest.fn(()=>{
      run = runner
      11
    })
    const obj = reactive({foo:1})
    const runner= effect(()=>{
      dummy=obj.foo
    },{scheduler})
    expect(scheduler).not.toHaveBeenCalled()
    expect(dummy).toBe(1)
    obj.foo++
    expect(scheduler).toHaveBeenCalledTimes(1)
    expect(dummy).toBe(1)
    run()
    expect(dummy).toBe(2)
  })
})