const isLeaf = el => !el.getAttribute('aria-owns')

const focusNode = el => {
  if (!el) return
  el.focus()
  !isLeaf(el) && el.click()
}

const checkNode = el => {
  if (!el) return

  const input = el.querySelector('input')
  if (input) {
    input.click()
  } else if (isLeaf(el)) {
    el.click()
  }
}

const getSibling = (el, distance) => {
  const { parentNode } = el
  if (parentNode) {
    const siblings = parentNode.querySelectorAll('.elp-cascader-node[tabindex="-1"]')
    const index = Array.prototype.indexOf.call(siblings, el)
    return siblings[index + distance] || null
  }
  return null
}

const getMenuIndex = (el) => {
  if (!el) return
  const pieces = el.id.split('-')
  return Number(pieces[pieces.length - 2])
}


/**
 * 获取指定位置元素，支持负数
 * @param arr
 * @param index 可小于0
 */
export const getArrayEle = (arr, index) => {
  if (index < 0 && arr.length + index >= 0) return arr[arr.length + index]
  else if (index >= 0) return arr[index]
  return undefined;
}


export {
  focusNode,
  checkNode,
  getSibling,
  getMenuIndex
}
