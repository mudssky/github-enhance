import { render } from 'react'
import { GitHubEnhancer } from '@/components/GitHubEnhancer'
import {
  getDebugModeStatus,
  isDebugMode,
  log,
  showDebugHelp,
  toggleDebugMode,
} from '@/lib/utils'
import './index.css'
import { $, debounce } from '@mudssky/jsutils'

// GitHub增强脚本 - 添加跳转到其他分析、阅读或开发站点的功能
log('GitHubEnhance 脚本开始运行')

// 将调试模式相关函数暴露到全局对象，方便在控制台中使用
if (typeof window !== 'undefined') {
  window.GitHubEnhance = {
    toggleDebugMode,
    getDebugModeStatus,
    showDebugHelp,
    isDebugMode,
    version: '1.0.0',
  }

  // 在控制台显示调试模式帮助信息
  if (isDebugMode()) {
    console.log(
      '[GitHubEnhance] 调试模式已开启，输入 window.GitHubEnhance.showDebugHelp() 查看帮助',
    )
  } else {
    console.log(
      '[GitHubEnhance] 输入 window.GitHubEnhance.toggleDebugMode(true) 开启调试模式',
    )
  }
}
const areaDom = document.querySelector(
  '#repo-content-pjax-container [data-target="react-partial.reactRoot"]',
)

// 等待页面加载完成后再注入组件
function initializeEnhancer() {
  // 检查是否在GitHub页面
  log('检查当前页面是否为GitHub:', window.location.hostname)
  if (!window.location.hostname.includes('github.com')) {
    log('当前页面不是GitHub，脚本终止')
    return
  }

  // 等待GitHub页面的关键元素加载完成
  const checkAndInject = () => {
    log('开始查找目标元素...')

    // biome-ignore lint/style/noNonNullAssertion: areaDom会确保存在
    const buttons = areaDom!.querySelectorAll('button')
    const codeButton = Array.from(buttons).find((button) => {
      if (button.textContent === 'Code') {
        log('找到目标元素:', button)
        return button
      }
    })

    if (codeButton && !document.querySelector('#github-enhancer-root')) {
      log('找到目标元素:', codeButton)
      const container = document.createElement('div')
      container.id = 'github-enhancer-root'
      container.style.display = 'inline-block'
      container.style.marginLeft = '4px'

      log('创建并注入GitHubEnhancer组件容器')

      // 插入到目标元素旁边
      codeButton.after(container)
      // document.body.appendChild(container)

      log('开始渲染GitHubEnhancer组件')
      render(<GitHubEnhancer />, container)
      log('GitHubEnhancer组件渲染完成')
    } else {
      log('目标元素未找到或组件已存在，继续等待...')
      // 如果元素还没加载，继续等待
      setTimeout(checkAndInject, 500)
    }
  }

  checkAndInject()
}
const debouncedInitializeEnhancer = debounce(initializeEnhancer, 500)
function main() {
  if (!areaDom) {
    log('未找到目标区域元素')
    return
  }
  new MutationObserver(() => {
    debouncedInitializeEnhancer()
  }).observe(areaDom, { subtree: true, childList: true })
}

main()
