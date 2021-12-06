import './../lib/lazy-cascader.css'
import LazyCascader from './../lib/lazy-cascader.umd.min'
import Mock from 'mockjs'

const { CascaderPanel } = LazyCascader
// 模拟整棵树
const MockTree = Mock.mock({
  'array|100': [
    {
      label: '@csentence(6)',
      value: '@string()',
      'children|2': [
        {
          label: '@csentence(6)',
          value: '@string()',
          'children|2': [
            {
              label: '@csentence(6)',
              value: '@string()'
            }
          ]
        }
      ]
    }
  ]
})
// 模拟单个节点
const MockNode = Mock.mock({
  'array|1000': [
    {
      label: '@csentence(6)',
      value: '@string()'
    }
  ]
})

// 模拟单个节点
const MockNodeLess = Mock.mock({
  'array|15': [
    {
      label: '@csentence(6)',
      value: '@string()'
    }
  ]
})


export default {
  title: 'Example/CascaderPanel',
  component: CascaderPanel,
  argTypes: {
    props: { control: { type: 'object' } },
    size: { control: { type: 'select', options: ['medium', 'small', 'mini'] } },
    placeholder: { control: { type: 'text' } },
    disabled: { control: { type: 'boolean' } },
    clearable: { control: { type: 'boolean' } },
    'show-all-levels': { control: { type: 'boolean' } },
    'collapse-tags': { control: { type: 'boolean' } },
    separator: { control: { type: 'text' } },
    filterable: { control: { type: 'boolean' } },
    debounce: { control: { type: 'number', min: 0, step: 100 } }
  }
}

const Template = (args, { argTypes }) => ({
  components: { CascaderPanel },
  props: Object.keys(argTypes),
  template: `
    <div style="margin-top: 100px;">
    <cascader-panel v-bind="$props" style="width: 400px" />
    </div>
  `
})

/**
 * 基础
 */
export const Base = Template.bind()
Base.args = {
  debounce: 300,
  size: 'medium',
  separator: '/',
  placeholder: '请选择',
  visible: true,
  'show-all-levels': true,
  options: MockTree.array
}

/**
 * 远程&单选
 */
export const Lazy = Template.bind({})
Lazy.args = {
  ...Base.args,
  placeholder: '单选时不级联请求下一级',
  props: {
    lazy: true,
    checkStrictly: true,
    selectWithExpand: false,
    lazyLoad (node, resolve) {
      setTimeout(_ => { resolve(MockNode) }, 1000)
    }
  }
}

/**
 * 远程&多选
 */
export const LazyAndMulti = Template.bind({})
LazyAndMulti.args = {
  ...Base.args,
  placeholder: '多选时懒加载取值',
  props: {
    lazy: true,
    multiple: true,
    lazyMultiCheck: true,
    lazyLoad (node, resolve) {
      setTimeout(_ => { resolve(MockNode) }, 1000)
    }
  }
}

/**
 * 远程&懒加载
 */
export const LazyPagination = Template.bind({})
LazyPagination.args = {
  ...Base.args,
  options: MockNodeLess.array,
  placeholder: '懒加载时分页请求数据（开启无限滚动）',
  props: {
    lazy: true,
    infiniteScroll: true,
    selectWithExpand: false,
    lazyLoad(node, resolve) {
      // console.log('aasdfsfasfadfadsf')
      setTimeout(_ => {
        const newData = Mock.mock({
          'array|15': [
            {
              label: '@csentence(6)',
              value: '@string()'
            }
          ]
        })
        resolve({list: newData.array, isEnd: node.pageNo === 2})
      }, 1000)
    }
  }
}
