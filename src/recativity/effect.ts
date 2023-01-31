import { extend } from './../../shared/index'
/*
 * @Author: perli 1003914407@qq.com
 * @Date: 2022-11-10 17:23:58
 * @LastEditors: perli 1003914407@qq.com
 * @LastEditTime: 2023-01-31 14:52:19
 * @FilePath: /min-vue3/src/recativity/effect.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

let activeEffect
let shouldTrack
class ReactiveEffect {
  private _fn: any
  deps = []
  public schedule: Function | undefined
  active = true
  onStop?: () => void
  constructor (fn, scheduler?: Function) {
    this._fn = fn
  }
  run () {
    if (!this.active) {
      return this._fn()
    }
    activeEffect = this
    shouldTrack = true
    const result = this._fn()
    shouldTrack = false
    return result
  }
  stop () {
    if (this.active) {
      cleanUpEffect(this)
      if (this.onStop) {
        this.onStop()
      }
    }
    this.active = false
  }
}
function cleanUpEffect (effect) {
  effect.deps.forEach((dep: any) => {
    dep.delete(effect)
  })
  effect.deps.length = 0
}
const targetMap = new Map()
export function track (target, key) {
  if (!isTracking()) return
  let depMap = targetMap.get(target)
  if (!depMap) {
    depMap = new Map()
    targetMap.set(target, depMap)
  }
  let dep = depMap.get(key)
  if (!dep) {
    dep = new Set()
    depMap.set(key, dep)
  }
  if (dep.has(activeEffect)) return
  dep.add(activeEffect)
  activeEffect.deps.push(dep)
}
function isTracking () {
  return shouldTrack && activeEffect !== undefined
}
export function trigger (target, key) {
  const depsMap = targetMap.get(target)
  const dep = depsMap.get(key)
  for (const effect of dep) {
    if (effect.scheduler) {
      effect.scheduler()
    } else {
      effect.run()
    }
  }
}
export function effect (fn, option: any = {}) {
  const _effect = new ReactiveEffect(fn, option.scheduler)
  extend(_effect, option)
  _effect.run()
  const runner: any = _effect.run.bind(_effect)
  runner.effect = _effect
  return runner
}

export function stop (runner) {
  runner.effect.stop()
}
