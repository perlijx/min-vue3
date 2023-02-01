import { isReadOnly, readOnly, shallowReadOnly } from '../reactive'

/*
 * @Author: perli 1003914407@qq.com
 * @Date: 2022-11-17 18:17:23
 * @LastEditors: perli 1003914407@qq.com
 * @LastEditTime: 2023-02-01 10:17:58
 * @FilePath: /min-vue3/src/recativity/tests/readOnly.spec.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
describe('readOnly', () => {
  it('happy path', () => {
    const original = { foo: 1, bar: { baz: 2 } }
    const wrapped = readOnly(original)
    expect(wrapped).not.toBe(original)
    expect(wrapped.foo).toBe(1)
    expect(isReadOnly(wrapped)).toBe(true)
    expect(isReadOnly(wrapped.bar)).toBe(true)
  })
  it('shallow readOnly', () => {
    const original = { foo: 1, bar: { baz: 2 } }
    const wrapped = shallowReadOnly(original)
    expect(isReadOnly(wrapped)).toBe(true)
    expect(isReadOnly(wrapped.bar)).toBe(false)
  })

  it('warn then call set', () => {
    console.warn = jest.fn()
    const user = readOnly({ age: 11 })
    user.age = 11
    expect(console.warn).toBeCalled()
  })
})
