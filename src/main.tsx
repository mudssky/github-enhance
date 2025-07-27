import { render } from 'react'
import { GitHubEnhancer } from '@/components/GitHubEnhancer'
import { log } from '@/lib/utils'
import './index.css'

// GitHub增强脚本 - 添加跳转到其他分析、阅读或开发站点的功能
log('GitHubEnhance 脚本开始运行')

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

    const buttons = document.querySelectorAll(
      '#repo-content-pjax-container [data-target="react-partial.reactRoot"] button',
    )
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
      container.style.marginLeft = '8px'

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

// 页面加载完成后初始化
log('检查document.readyState:', document.readyState)
if (document.readyState === 'loading') {
  log('DOMContentLoaded事件监听器已添加')
  document.addEventListener('DOMContentLoaded', initializeEnhancer)
} else {
  log('页面已加载，直接初始化增强功能')
  initializeEnhancer()
}

// 监听页面变化（GitHub是SPA）
const lastUrl = location.href
log('开始监听URL变化，初始URL:', lastUrl)
// new MutationObserver(() => {
//   const url = location.href
//   if (url !== lastUrl) {
//     log('URL发生变化:', lastUrl, '->', url)
//     lastUrl = url
//     log('延迟1秒后重新初始化增强功能...')
//     setTimeout(initializeEnhancer, 1000) // 给页面一些时间来渲染
//   }
// }).observe(document, { subtree: true, childList: true })
