const toArray = (value: unknown) => {
  if (Array.isArray(value)) return value
  if (value == null) return []
  return [value]
}

const toNumber = (value: unknown) => {
  if (typeof value === 'number') return value
  if (typeof value === 'string' && /-?\d+(\.\d+)?/.test(value)) return Number(value)
  if (typeof value === 'string' && !isNaN(Date.parse(value))) return new Date(value).getTime()
  if (typeof value === 'boolean') return value ? 1 : 0
  return NaN
}

const deepClone = <T>(value: T): T => {
  return JSON.parse(JSON.stringify(value))
}

// 校验函数
const validateByWhereRuleFns: Record<string, (v: unknown, r: unknown) => boolean> = {
  eq: (v: unknown, r: unknown) => v === r,
  ne: (v: unknown, r: unknown) => v !== r,
  gt: (v: unknown, r: unknown) => toNumber(v) > toNumber(r),
  gte: (v: unknown, r: unknown) => toNumber(v) >= toNumber(r),
  lt: (v: unknown, r: unknown) => toNumber(v) < toNumber(r),
  lte: (v: unknown, r: unknown) => toNumber(v) <= toNumber(r),
  in: (v: unknown, r: unknown) => toArray(r).includes(v),
  nin: (v: unknown, r: unknown) => !toArray(r).includes(v),
  like: (v: unknown, r: unknown) => String(v).includes(String(r)),
  nlike: (v: unknown, r: unknown) => !String(v).includes(String(r)),
  all: (v: unknown, r: unknown) => toArray(r).every((i) => toArray(v).includes(i)),
  nall: (v: unknown, r: unknown) => !toArray(r).every((i) => toArray(v).includes(i)),
  any: (v: unknown, r: unknown) => toArray(r).some((i) => toArray(v).includes(i)),
  nany: (v: unknown, r: unknown) => !toArray(r).some((i) => toArray(v).includes(i))
}

/**
 * 根据 where 规则校验对象数据
 * @param {object} object 校验数据
 * @param {object} where 校验规则
 * @returns
 */
function validateByWhere (object: Record<string, unknown>, where: Record<string, any>) {
  if (!object) return false
  if (!where) return true
  return Object.entries(where).every(([whereKey, rules]) => {
    if (rules === '') return true
    if (!rules || typeof rules !== 'object') rules = { eq: rules }
    return Object.keys(rules).every((fnKey) => {
      const fn = validateByWhereRuleFns[fnKey]
      if (!fn) return true
      const value = object[whereKey]
      const rule = rules[fnKey]
      return fn(value, rule)
    })
  })
}

class PageListSearch {
  #data: Record<string, any>[] = []
  #fieldsMap: Set<string> = new Set()
  #optionsMap: Map<string, Set<any>> = new Map()

  constructor (data: Record<string, any>[] = []) {
    this.#data = deepClone(data)

    this.#fieldsMap.clear()
    this.#optionsMap.clear()
    for (const item of this.#data) {
      for (const key of Object.keys(item)) {
        this.#fieldsMap.add(key)
        if (!this.#optionsMap.has(key)) {
          this.#optionsMap.set(key, new Set())
        }
        this.#optionsMap.get(key)?.add(item[key])
      }
    }
  }

  // 筛选
  async filter (fields?: Record<string, any>): Promise<Record<string, any>[]> {
    if (!fields) return this.all()
    const result = this.#data.filter((item) => {
      if (typeof item === 'object') {
        return validateByWhere(item, fields)
      }
      return false
    })
    return deepClone(result)
  }

  // 获取过滤字段全部选项
  async getOptions<VK extends string = 'value', LK extends string = 'label'> (
    field: string,
    options?: { valueKey?: VK; labelKey?: LK }
  // eslint-disable-next-line no-unused-vars
  ): Promise<{ [key in VK | LK]: any }[]> {
    const defaultOptions = { valueKey: 'value' as VK, labelKey: 'label' as LK }
    const { valueKey, labelKey } = { ...defaultOptions, ...options }
    const result = Array.from(this.#optionsMap.get(field) || []).map((value) => {
      // eslint-disable-next-line no-unused-vars
      return { [valueKey]: value, [labelKey]: value } as { [key in VK | LK]: any }
    })
    return deepClone(result)
  }

  async getOptionsValues (field: string) {
    const result = await this.getOptions(field, { valueKey: 'value' })
    return result.map((item) => item.value)
  }

  // 获取全部数据
  async all () {
    return deepClone(this.#data)
  }

  // 搜索分页
  async search (fields: Record<string, any> = {}, current = 1, size = 10) {
    const data = await this.filter(fields)
    const total = data.length
    const start = (current - 1) * size
    const end = start + size
    return {
      current,
      size,
      total,
      records: data.slice(start, end)
    }
  }
}

export default PageListSearch
