/**
 * markdown-it-mermaid 插件
 * 将 ```mermaid 代码块转换为 <div class="mermaid"> 标签，
 * 由页面中加载的 mermaid.js 进行渲染。
 *
 * 替代已停止维护的 markdown-it-mermaid@0.2.5
 *
 * @author RJ.Wang
 * @date 2026-04-16
 */

function markdownItMermaid(md) {
  const defaultFence = md.renderer.rules.fence.bind(md.renderer.rules);

  md.renderer.rules.fence = (tokens, idx, options, env, self) => {
    const token = tokens[idx];
    if (token.info.trim().toLowerCase() === 'mermaid') {
      return `<div class="mermaid">${md.utils.escapeHtml(token.content)}</div>`;
    }
    return defaultFence(tokens, idx, options, env, self);
  };
}

module.exports = markdownItMermaid;
