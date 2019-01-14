<script>
export default {
  name: 'menu-tree',
  props: {
    list: {
      type: Array,
      default: () => []
    },
    collapsed: {
      type: Boolean,
      default: false
    },
    turnToPage: {
      type: Function,
      default: () => { console.log('no method')}
    }
  },
  computed: {
    iconSize () {
      return this.collapsed? 28: 22
    }
  },
  methods: {
    buildTooltip (h, item) {
      const { iconSize, turnToPage } = this
      return h('Tooltip', {
          style: {
            display: 'block',
            textAlign: 'center',
            padding: '20px 0',
            cursor: 'pointer'
          },
          props: {
            transfer: true,
            placement: 'right'
          },
          on: {
          }
        }, [
          h('div', [
              h('Icon', {
                props: {
                  type: item.meta.icon,
                  size: iconSize
                },
                on: {
                  'click': () => { turnToPage(item)} 
                }
              })
            ]
          ),
          h('div', {
              slot: 'content'
            }, 
            item.meta.title
          ),
        ]
      )
    },
    buildDropdown (h, item) {
      const { iconSize, buildDropdown, turnToPage } = this
      return h('Dropdown', {
          style: {
            display: 'block',
            textAlign: 'center',
            padding: '20px 0',
            cursor: 'pointer',
            color: '#fff'
          },
          props: {
            transfer: true,
            placement: 'right-start'
          },
          on: {
            'on-click': turnToPage
          }
        }, [
          h('div', [
            h('Icon', {
              props: {
                type: item.meta.icon,
                size: iconSize
              }
            })
          ]),
          h('DropdownMenu', {
              slot: 'list'
            }, 
            item.children.map(child => {
              if (child.children) {
                return buildDropdown(h, child)
              } else {
                return h('DropdownItem', {
                  props: {
                    name: child.name
                  }
                }, [
                  h('Icon', {
                    props: {
                      type: child.meta.icon,
                      size: iconSize
                    }
                  }),
                  child.meta.title
                ])
              }
            })
          ),
        ]
      )
    },
    buildSubmenu (h, item) {
      const { iconSize, buildSubmenu, buildMenuItem } = this
      return h('Submenu', {
          props: {
            name: item.name
          }
        }, [
          h('template', {
            slot: 'title'
          }, [
            h('Icon', {
              props: {
                type: item.meta.icon,
                size: iconSize
              }
            }),
            item.meta.title
          ]),
          ...item.children.map(child => {
            if (child.children) {
              return buildSubmenu(h, child)
            } else {
              return buildMenuItem(h, child)
            }
          })
        ]
      )
    },
    buildMenuItem (h, item) {
      const { iconSize } = this
      return h('MenuItem', {
        props: {
          name: item.name
        }
      }, [
        h('Icon', {
          props: {
            type: item.meta.icon,
            size: iconSize
          }
        }),
        item.meta.title
      ])
    }
  },
  render (h) {
    const { list, collapsed, buildTooltip, buildDropdown, buildSubmenu, buildMenuItem } = this
    return h('div', list.map((item) => {
      if (collapsed) {
        if (item.children) {
          return buildDropdown(h, item)
        } else {
          return buildTooltip(h, item)
        }
      } else {
        if (item.children) {
          return buildSubmenu(h, item)
        } else {
          return buildMenuItem(h, item)
        }
      }
    }))
  }
}
</script>
