const files = import.meta.glob('./*.ts', { eager: true })

const modules: Record<string, any> = {}
for (const key of Object.keys(files)) {
  if (key === './index.ts') continue
  const module = files[key] as any
  modules[key.replace(/(\.\/|\.ts)/g, '')] = module.default || module
}

export const service = <{
  xfqs: typeof import('./xfqs')
}>modules

export default service
