import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * 判断是否处于调试模式。
 * 调试模式通过 Greasemonkey 的 GM_getValue('debugMode', false) 来控制。
 * @returns {boolean} 如果处于调试模式则返回 true，否则返回 false。
 */
export function isDebugMode(): boolean {
  return true
  // return typeof GM_getValue !== 'undefined' && GM_getValue('debugMode', false)
}

/**
 * 有条件地输出日志，仅在调试模式下输出。
 * @param messages 任何要输出到控制台的消息。
 */
export function log(...messages: any[]): void {
  if (isDebugMode()) {
    console.log('[GitHubEnhance]', ...messages)
  }
}
