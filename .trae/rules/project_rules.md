# 项目规则文档

## 代码风格规范

### CSS 样式规范

- **优先使用 Tailwind CSS**：所有样式应优先使用 Tailwind CSS 类名，避免内联样式
- **渐变背景处理**：对于复杂的渐变背景，可以保留内联样式，但其他属性应使用 Tailwind 类
- **响应式设计**：使用 Tailwind 的响应式前缀（sm:, md:, lg:, xl:）来处理不同屏幕尺寸
- **颜色透明度**：使用 Tailwind 的透明度语法（如 `bg-white/10` 表示 10% 透明度的白色）

### React 组件规范

- **Hooks 优先**：必须使用 React Hooks（如 useState, useEffect, useContext）进行状态管理和副作用处理。
- **函数式组件**：所有组件都应为函数式组件，避免使用类组件。
- **TypeScript 支持**：所有组件和 Hooks 必须使用 TypeScript，为 props 和 state 提供明确的类型定义，以确保类型安全。
- **状态管理**：
  - 使用 useState 管理组件本地的简单状态。
  - 使用 useReducer 管理具有复杂逻辑的本地状态。
  - 使用 useContext 结合 useState 或 useReducer 进行跨组件状态共享。
- **副作用处理**：使用 useEffect 处理副作用，如 API 请求、事件监听或手动 DOM 操作。务必在返回的清理函数中移除所有订阅和监听器。
- **自定义 Hooks**：可复用的逻辑（如与 Tampermonkey API 交互、状态管理逻辑等）应抽离为自定义 Hooks（use...）。

### 命名规范

- **变量命名**：使用 camelCase 命名法
- **React组件**：使用 PascalCase 命名法
- **CSS 类名**：若需自定义（非 Tailwind），使用 BEM 命名法（Block__Element--Modifier）。
- **文件与目录**：组件文件和目录均使用帕斯卡命名法（PascalCase），例如：src/components/HighlightPanel/HighlightPanel.tsx。

## 技术栈要求

### 前端框架

- **React**：使用最新稳定版本的 React (18+)。
- **UI 组件库**：推荐使用Shadcn UI
- **Tailwind CSS**：样式框架使用 Tailwind CSS

### 开发工具

- **Vite**：构建工具使用 Vite
- **TypeScript**：必须使用 TypeScript 进行开发
- **Biome**：代码格式化和质量检查

### 用户脚本特定要求

- **Tampermonkey API**：正确使用 GM_* API 函数
- **单例模式**：对于如高亮器、设置管理器等全局核心功能，应确保其以单例模式运行，避免重复实例化。
- **内存管理**：在 useEffect 的清理函数中，必须彻底清理定时器 (clearInterval)、事件监听器 (removeEventListener) 及其他可能导致内存泄漏的资源。
- **样式注入与隔离**：
  - 在项目的入口文件（如 main.tsx）中导入主样式文件。
- **权限管理**：在脚本的元数据块（userscript header）中，明确声明所有需要用到的 @grant 权限。
- **运行时机**：默认设置 'run-at': 'document-end'，确保页面 DOM 结构加载完毕后再执行脚本。
- **匹配规则**：合理配置 @match 和 @exclude 规则，确保脚本只在目标页面上运行。
- **外部依赖**：对于 React、ReactDOM 等大型库，推荐使用 @require 通过 CDN 引入，以大幅减小脚本打包体积。
- **样式重置**：**禁止**使用 Tailwind 的 Preflight (样式重置)，避免污染宿主页面的全局样式。

### **性能优化**

- **懒加载**：使用 React.lazy 和 Suspense 对非首屏或不立即使用的组件进行懒加载。
- **大型库按需加载**：通过 CDN @require 引入 React 等库。
- **渲染优化**：
  - 使用 React.memo 对 props 不变的组件进行包裹，避免不必要的重渲染。
  - 使用 useMemo 缓存计算成本高的值。
  - 使用 useCallback 缓存传递给子组件的函数。
- **防抖与节流**：对频繁触发的事件（如窗口大小调整、滚动、用户输入）应用防抖（debounce）或节流（throttle）处理。
- **虚拟列表**：在需要渲染大量数据列表时，应采用虚拟化技术（如 react-window）以提升性能。

### **安全规范**

- **XSS 防护**：绝不使用 dangerouslySetInnerHTML 来渲染任何来自用户或外部 API 的内容。对所有需要渲染的动态内容进行严格的净化和转义。
- **权限最小化**：仅在 @grant 中申请绝对必要的 GM_* 权限。
- **数据存储**：敏感信息应使用 GM_setValue / GM_getValue 进行存储，不要存储在 localStorage 中，因为它可能被页面脚本访问。
- **输入验证**：对所有用户输入（例如从设置面板输入的内容）和通过 GM_getValue 获取的数据进行严格的格式和内容验证。

### **测试要求**

#### **功能测试**

- **核心逻辑**：高亮、导航、配置管理等核心功能必须有单元测试或集成测试覆盖。
- **组件测试**：使用 React Testing Library 和 Jest 对关键组件的交互和渲染进行测试。
- **边界情况**：覆盖空值、超长输入、大量匹配项等边界场景。
- **兼容性**：确保在 Chrome、Firefox 和 Edge 等主流浏览器的最新版 Tampermonkey 或 Greasemonkey 扩展中能正常运行。

#### **性能测试**

- **大文档处理**：在包含大量文本和节点的页面上测试脚本的性能表现和响应速度。
- **内存泄漏**：使用浏览器开发者工具的 Memory 面板检查是否存在内存泄漏。

### **文档与版本管理**

#### **代码注释**

- **组件与 Hooks**：所有自定义组件和 Hooks 必须有清晰的 TSDoc 注释，说明其功能、props参数和返回值。
- **复杂逻辑**：算法或复杂的业务逻辑必须有行内注释进行解释。
- **TODO 标记**：使用 // TODO: 标记待办事项或未完成的功能。

#### **版本管理**

- **Git 提交信息**：遵循 Conventional Commits 规范（如 feat:, fix:, docs:, style:, refactor:, test:, chore:）。

  
