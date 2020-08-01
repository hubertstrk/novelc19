<script>

import { browserLanguage } from '@/js/helper'

var getChildrenTextContent = function (children) {
  return children.map(function (node) {
    return node.children
      ? getChildrenTextContent(node.children)
      : node.text
  }).join('')
}

export default {
  render: function (createElement) {
    const value = getChildrenTextContent(this.$slots.default)
    const intl = new Intl.NumberFormat(browserLanguage)
    return createElement(
      'div',
      [
        createElement('span', {
          domProps: {
            innerHTML: intl.format(value)
          }
        }, this.$slots.default)
      ]
    )
  }
}
</script>
