import Main from '@/components/main'
import parentView from '@/components/parent-view'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [
  {path: '/',name: '_home',redirect: '/home',component: Main,meta: {hideInMenu: true},
    children: [
      {path: '/home',name: 'home',meta: {hideInMenu: true,title: '首页',icon: 'md-home'},
        component: () => import('@/view/single-page/home')
      }
    ]
  },
  {path: '/data_statistics',name: 'data_statistics',meta: {icon: 'ios-analytics',title: '数据统计'},component: Main,
    children: [
      {path: 'user_statistics',name: 'user_statistics',meta: {icon: 'ios-contact',title: '用户统计'},
        component: () => import('@/view/myview/data_statistics/user_statistics/user_statistics.vue')
      },
      {path: 'strategy_statistics',name: 'strategy_statistics',meta: {icon: 'md-git-network',title: '策略统计'},
        component: () => import('@/view/myview/data_statistics/strategy_statistics/strategy_statistics.vue')
      },
    ]
  },
  {path: '/financial_management',name: 'financial_management',meta: {icon: 'logo-usd',title: '财务管理'},component: Main,
    children: [
      {path: 'level_management',name: 'level_management',meta: {icon: 'md-funnel',title: '级别管理'},
        component: () => import('@/view/myview/financial_management/level_management/level_management.vue')
      },
      {path: 'strategic_interest_earnings',name: 'strategic_interest_earnings',meta: {icon: 'md-albums',title: '策略利息收益表'},
        component: () => import('@/view/myview/financial_management/strategic_interest_earnings/strategic_interest_earnings.vue')
      },
      {path: 'transaction_commission_income',name: 'transaction_commission_income',meta: {icon: 'md-albums',title: '交易佣金收益表'},
        component: () => import('@/view/myview/financial_management/transaction_commission_income/transaction_commission_income.vue')
      },
    ]
  },
  {path: '/customer_management',name: 'customer_management',meta: {icon: 'md-contact',title: '客户管理'},component: Main,
    children: [
      {path: 'customer_list',name: 'customer_list',meta: {icon: 'md-contact',title: '客户列表'},
        component: () => import('@/view/myview/customer_management/customer_list/customer_list.vue')
      },
      {path: 'customer_expense_statistics',name: 'customer_expense_statistics',meta: {icon: 'md-albums',title: '客户费用统计表'},
        component: () => import('@/view/myview/customer_management/customer_expense_statistics/customer_expense_statistics.vue')
      },
      {path: 'recharge_management',name: 'recharge_management',meta: {icon: 'logo-usd',title: '充值管理'},
        component: () => import('@/view/myview/customer_management/recharge_management/recharge_management.vue')
      },
      {path: 'contract_audit',name: 'contract_audit',meta: {icon: 'md-checkmark-circle-outline',title: '合约审核'},
        component: () => import('@/view/myview/customer_management/contract_audit/contract_audit.vue')
      },
      {path: 'customer_withdrawal_audit',name: 'customer_withdrawal_audit',meta: {icon: 'md-checkmark-circle-outline',title: '客户提现审核'},
        component: () => import('@/view/myview/customer_management/customer_withdrawal_audit/customer_withdrawal_audit.vue')
      },
    ]
  },
  {path: '/salesman_management',name: 'salesman_management',meta: {icon: 'md-person',title: '业务员管理'},component: Main,
    children: [
      {path: 'salesman_list',name: 'salesman_list',meta: {icon: 'md-person',title: '业务员列表'},
        component: () => import('@/view/myview/salesman_management/salesman_list/salesman_list.vue')
      },
      {path: 'salesman_income_statistics',name: 'salesman_income_statistics',meta: {icon: 'md-albums',title: '业务员收益统计'},
        component: () => import('@/view/myview/salesman_management/salesman_income_statistics/salesman_income_statistics.vue')
      },
      {path: 'salesman_withdrawal_audit',name: 'salesman_withdrawal_audit',meta: {icon: 'md-checkmark-circle-outline',title: '业务员提现审核'},
        component: () => import('@/view/myview/salesman_management/salesman_withdrawal_audit/salesman_withdrawal_audit.vue')
      },
    ]
  },
  {path: '/manager_management',name: 'manager_management',meta: {icon: 'ios-person-outline',title: '经理管理'},component: Main,
    children: [
      {path: 'manager_list',name: 'manager_list',meta: {icon: 'ios-person-outline',title: '经理列表'},
        component: () => import('@/view/myview/manager_management/manager_list/manager_list.vue')
      },
      {path: 'manager_income_statistics',name: 'manager_income_statistics',meta: {icon: 'md-albums',title: '经理收益统计'},
        component: () => import('@/view/myview/manager_management/manager_income_statistics/manager_income_statistics.vue')
      },
      {path: 'manager_withdrawal_audit',name: 'manager_withdrawal_audit',meta: {icon: 'md-checkmark-circle-outline',title: '经理提现审核'},
        component: () => import('@/view/myview/manager_management/manager_withdrawal_audit/manager_withdrawal_audit.vue')
      },
    ]
  },
  {path: '/majordomo_management',name: 'majordomo_management',meta: {icon: 'ios-person',title: '总监管理'},component: Main,
    children: [
      {path: 'majordomo_list',name: 'majordomo_list',meta: {icon: 'ios-person',title: '总监列表'},
        component: () => import('@/view/myview/majordomo_management/majordomo_list/majordomo_list.vue')
      },
      {path: 'majordomo_income_statistics',name: 'majordomo_income_statistics',meta: {icon: 'md-albums',title: '总监收益统计'},
        component: () => import('@/view/myview/majordomo_management/majordomo_income_statistics/majordomo_income_statistics.vue')
      },
      {path: 'majordomo_withdrawal_audit',name: 'majordomo_withdrawal_audit',meta: {icon: 'md-checkmark-circle-outline',title: '总监提现审核'},
        component: () => import('@/view/myview/majordomo_management/majordomo_withdrawal_audit/majordomo_withdrawal_audit.vue')
      },
    ]
  },
  {path: '/contract_list',name: 'contract_list',meta: {icon: 'ios-photos',title: '合约列表'},component: Main,
    children: [
      {path: 'contract_free',name: 'contract_free',meta: {icon: 'ios-star',title: '免费体验合约'},
        component: () => import('@/view/myview/contract_list/contract_free/contract_free.vue')
      },
      {path: 'contract_day',name: 'contract_day',meta: {icon: 'ios-star-outline',title: '短期策略合约'},
        component: () => import('@/view/myview/contract_list/contract_day/contract_day.vue')
      },
      {path: 'contract_month',name: 'contract_month',meta: {icon: 'ios-star-half',title: '中期策略合约'},
        component: () => import('@/view/myview/contract_list/contract_month/contract_month.vue')
      },
      {path: 'contract_reciprocity',name: 'contract_reciprocity',meta: {icon: 'md-star-outline',title: '互惠合约'},
        component: () => import('@/view/myview/contract_list/contract_reciprocity/contract_reciprocity.vue')
      },
    ]
  },
  {path: '/transaction_recordv',name: 'transaction_recordv',meta: {icon: 'ios-clipboard-outline',title: '交易记录'},component: Main,
    children: [
      {path: 'stock_positions',name: 'stock_positions',meta: {icon: 'md-arrow-up',title: '股票提仓'},
        component: () => import('@/view/myview/transaction_recordv/stock_positions/stock_positions.vue')
      },
      {path: 'delegate_record',name: 'delegate_record',meta: {icon: 'ios-calendar-outline',title: '委托记录'},
        component: () => import('@/view/myview/transaction_recordv/delegate_record/delegate_record.vue')
      },
      {path: 'withdrawal_record',name: 'withdrawal_record',meta: {icon: 'ios-calendar-outline',title: '撤单记录'},
        component: () => import('@/view/myview/transaction_recordv/withdrawal_record/withdrawal_record.vue')
      },
      {path: 'transaction_record',name: 'transaction_record',meta: {icon: 'ios-calendar-outline',title: '成交记录'},
        component: () => import('@/view/myview/transaction_recordv/transaction_record/transaction_record.vue')
      },
      {path: 'transaction_flow',name: 'transaction_flow',meta: {icon: 'md-water',title: '交易流水'},
        component: () => import('@/view/myview/transaction_recordv/transaction_flow/transaction_flow.vue')
      },
    ]
  },
  {path: '/transaction_settings',name: 'transaction_settings',meta: {icon: 'ios-settings',title: '交易设置'},component: Main,
    children: [
      {path: 'account_settings',name: 'account_settings',meta: {icon: 'ios-settings-outline',title: '账号设置'},
        component: () => import('@/view/myview/transaction_settings/account_settings/account_settings.vue')
      },
      {path: 'stock_setup',name: 'stock_setup',meta: {icon: 'md-settings',title: '股票设置'},
        component: () => import('@/view/myview/transaction_settings/stock_setup/stock_setup.vue')
      },
      {path: 'ex_rights',name: 'ex_rights',meta: {icon: 'ios-redo',title: '除权除息'},
        component: () => import('@/view/myview/transaction_settings/ex_rights/ex_rights.vue')
      },
      {path: 'parameter_setting',name: 'parameter_setting',meta: {icon: 'md-settings',title: '参数设置'},
        component: () => import('@/view/myview/transaction_settings/parameter_setting/parameter_setting.vue')
      },
      {path: 'holiday_setting',name: 'holiday_setting',meta: {icon: 'md-settings',title: '节假日设置'},
        component: () => import('@/view/myview/transaction_settings/holiday_setting/holiday_setting.vue')
      },
    ]
  },
  {path: '/front_management',name: 'front_management',meta: {icon: 'ios-desktop-outline',title: '前台管理'},component: Main,
    children: [
      {path: 'advertisement_management',name: 'advertisement_management',meta: {icon: 'ios-image-outline',title: '广告管理'},
        component: () => import('@/view/myview/front_management/advertisement_management/advertisement_management.vue')
      },
      {path: 'question_management',name: 'question_management',meta: {icon: 'ios-outlet-outline',title: '问答管理'},
        component: () => import('@/view/myview/front_management/question_management/question_management.vue')
      },
      {path: 'company_announcement',name: 'company_announcement',meta: {icon: 'md-volume-up',title: '公司公告'},
        component: () => import('@/view/myview/front_management/company_announcement/company_announcement.vue')
      },
    ]
  },
  {path: '/system_management',name: 'system_management',meta: {icon: 'ios-apps',title: '系统管理'},component: Main,
    children: [
      {path: 'system_setup',name: 'system_setup',meta: {icon: 'md-settings',title: '系统设置'},
        component: () => import('@/view/myview/system_management/system_setup/system_setup.vue')
      },
      {path: 'cache_management',name: 'cache_management',meta: {icon: 'md-thunderstorm',title: '缓存管理'},
        component: () => import('@/view/myview/system_management/cache_management/cache_management.vue')
      },
      {path: 'abandoned_picture_management',name: 'abandoned_picture_management',meta: {icon: 'md-thunderstorm',title: '废用图片管理'},
        component: () => import('@/view/myview/system_management/abandoned_picture_management/abandoned_picture_management.vue')
      },
      {path: 'role_management',name: 'role_management',meta: {icon: 'ios-people',title: '角色管理'},
        component: () => import('@/view/myview/system_management/role_management/role_management.vue')
      },
      {path: 'back_management',name: 'back_management',meta: {icon: 'ios-people-outline',title: '后台管理员'},
        component: () => import('@/view/myview/system_management/back_management/back_management.vue')
      },
      {path: 'white_list',name: 'white_list',meta: {icon: 'ios-person-add-outline',title: 'IP白名单'},
        component: () => import('@/view/myview/system_management/white_list/white_list.vue')
      },
    ]
  },
















  {path: '/login',name: 'login',meta: {title: 'Login - 登录',hideInMenu: true},component: () => import('@/view/login/login.vue')},
  // {path: '/',name: '_home',redirect: '/home',component: Main,meta: {hideInMenu: true,notCache: true},
  //   children: [
  //     {path: '/home',name: 'home',meta: {hideInMenu: true,title: '首页',notCache: true,icon: 'md-home'},
  //       component: () => import('@/view/single-page/home')
  //     }
  //   ]
  // },
  {path: '/message',name: 'message',component: Main,
    meta: {hideInBread: true, hideInMenu: true},
    children: [
      {path: 'message_page',name: 'message_page',
        meta: {icon: 'md-notifications',title: '消息中心'},
        component: () => import('@/view/single-page/message/index.vue')
      }
    ]
  },
  {path: '/components',name: 'components',meta: {icon: 'logo-buffer',title: '组件',hideInMenu: true},component: Main,
    children: [
      {path: 'count_to_page',name: 'count_to_page',meta: {icon: 'md-trending-up',title: '数字渐变'},
        component: () => import('@/view/components/count-to/count-to.vue')
      },
      {path: 'drag_list_page',name: 'drag_list_page',meta: {icon: 'ios-infinite',title: '拖拽列表'},
        component: () => import('@/view/components/drag-list/drag-list.vue')
      },
      {path: 'tree_table_page',name: 'tree_table_page',meta: {icon: 'md-git-branch',title: '树状表格'},
        component: () => import('@/view/components/tree-table/index.vue')
      },
      {path: 'cropper_page',name: 'cropper_page',meta: {icon: 'md-crop',title: '图片裁剪'},
        component: () => import('@/view/components/cropper/cropper.vue')
      },
      {path: 'tables_page',name: 'tables_page',meta: {icon: 'md-grid',title: '多功能表格'},
        component: () => import('@/view/components/tables/tables.vue')
      },
      {path: 'split_pane_page',name: 'split_pane_page',meta: {icon: 'md-pause',title: '分割窗口' },
        component: () => import('@/view/components/split-pane/split-pane.vue')
      },
      {path: 'markdown_page',name: 'markdown_page',meta: {icon: 'logo-markdown',title: 'Markdown编辑器'},
        component: () => import('@/view/components/markdown/markdown.vue')
      },
      {path: 'editor_page',name: 'editor_page',meta: {icon: 'ios-create', title: '富文本编辑器' },
        component: () => import('@/view/components/editor/editor.vue')
      },
      {path: 'icons_page',name: 'icons_page',meta: {icon: '_bear',title: '自定义图标'},
        component: () => import('@/view/components/icons/icons.vue')
      }
    ]
  },
  {path: '/update',name: 'update',meta: {icon: 'md-cloud-upload',title: '数据上传',hideInMenu: true },component: Main,
    children: [
      {path: 'update_table_page',
        name: 'update_table_page',
        meta: {
          icon: 'ios-document',
          title: '上传Csv'
        },
        component: () => import('@/view/update/update-table.vue')
      },
      {
        path: 'update_paste_page',
        name: 'update_paste_page',
        meta: {
          icon: 'md-clipboard',
          title: '粘贴表格数据'
        },
        component: () => import('@/view/update/update-paste.vue')
      }
    ]
  },
  {
    path: '/excel',
    name: 'excel',
    meta: {
      icon: 'ios-stats',
      title: 'EXCEL导入导出',hideInMenu: true
    },
    component: Main,
    children: [
      {
        path: 'upload-excel',
        name: 'upload-excel',
        meta: {
          icon: 'md-add',
          title: '导入EXCEL'
        },
        component: () => import('@/view/excel/upload-excel.vue')
      },
      {
        path: 'export-excel',
        name: 'export-excel',
        meta: {
          icon: 'md-download',
          title: '导出EXCEL'
        },
        component: () => import('@/view/excel/export-excel.vue')
      }
    ]
  },
  {
    path: '/tools_methods',
    name: 'tools_methods',
    meta: {
      hideInBread: true,hideInMenu: true
    },
    component: Main,
    children: [
      {
        path: 'tools_methods_page',
        name: 'tools_methods_page',
        meta: {
          icon: 'ios-hammer',
          title: '工具方法',
          beforeCloseName: 'before_close_normal'
        },
        component: () => import('@/view/tools-methods/tools-methods.vue')
      }
    ]
  },
  {
    path: '/i18n',
    name: 'i18n',
    meta: {
      hideInBread: true,hideInMenu: true
    },
    component: Main,
    children: [
      {
        path: 'i18n_page',
        name: 'i18n_page',
        meta: {
          icon: 'md-planet',
          title: 'i18n - {{ i18n_page }}'
        },
        component: () => import('@/view/i18n/i18n-page.vue')
      }
    ]
  },
  {
    path: '/error_store',
    name: 'error_store',
    meta: {
      hideInBread: true,hideInMenu: true
    },
    component: Main,
    children: [
      {
        path: 'error_store_page',
        name: 'error_store_page',
        meta: {
          icon: 'ios-bug',
          title: '错误收集'
        },
        component: () => import('@/view/error-store/error-store.vue')
      }
    ]
  },
  {
    path: '/error_logger',
    name: 'error_logger',
    meta: {
      hideInBread: true,
      hideInMenu: true
    },
    component: Main,
    children: [
      {
        path: 'error_logger_page',
        name: 'error_logger_page',
        meta: {
          icon: 'ios-bug',
          title: '错误收集',hideInMenu: true
        },
        component: () => import('@/view/single-page/error-logger.vue')
      }
    ]
  },
  {
    path: '/directive',
    name: 'directive',
    meta: {
      hideInBread: true,hideInMenu: true
    },
    component: Main,
    children: [
      {
        path: 'directive_page',
        name: 'directive_page',
        meta: {
          icon: 'ios-navigate',
          title: '指令',hideInMenu: true
        },
        component: () => import('@/view/directive/directive.vue')
      }
    ]
  },
  {
    path: '/multilevel',
    name: 'multilevel',
    meta: {
      icon: 'md-menu',
      title: '多级菜单',hideInMenu: true
    },
    component: Main,
    children: [
      {
        path: 'level_2_1',
        name: 'level_2_1',
        meta: {
          icon: 'md-funnel',
          title: '二级-1'
        },
        component: () => import('@/view/multilevel/level-2-1.vue')
      },
      {
        path: 'level_2_2',
        name: 'level_2_2',
        meta: {
          access: ['super_admin'],
          icon: 'md-funnel',
          showAlways: true,
          title: '二级-2'
        },
        component: parentView,
        children: [
          {
            path: 'level_2_2_1',
            name: 'level_2_2_1',
            meta: {
              icon: 'md-funnel',
              title: '三级'
            },
            component: () => import('@/view/multilevel/level-2-2/level-2-2-1.vue')
          },
          {
            path: 'level_2_2_2',
            name: 'level_2_2_2',
            meta: {
              icon: 'md-funnel',
              title: '三级'
            },
            component: () => import('@/view/multilevel/level-2-2/level-2-2-2.vue')
          }
        ]
      },
      {
        path: 'level_2_3',
        name: 'level_2_3',
        meta: {
          icon: 'md-funnel',
          title: '二级-3'
        },
        component: () => import('@/view/multilevel/level-2-3.vue')
      }
    ]
  },
  {
    path: '/argu',
    name: 'argu',
    meta: {
      hideInMenu: true
    },
    component: Main,
    children: [
      {
        path: 'params/:id',
        name: 'params',
        meta: {
          icon: 'md-flower',
          title: route => `{{ params }}-${route.params.id}`,
          notCache: true,
          beforeCloseName: 'before_close_normal'
        },
        component: () => import('@/view/argu-page/params.vue')
      },
      {
        path: 'query',
        name: 'query',
        meta: {
          icon: 'md-flower',
          title: route => `{{ query }}-${route.query.id}`,
          notCache: true
        },
        component: () => import('@/view/argu-page/query.vue')
      }
    ]
  },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/404.vue')
  }
]
