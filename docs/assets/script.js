document$.subscribe(function() {
  try {
    const highlightDivs = document.querySelectorAll('div.highlight');
    
    highlightDivs.forEach(div => {
      try {
        const pre = div.querySelector('pre');
        if (!pre) return;
        
        const code = pre.querySelector('code');
        if (!code) return;
        
        const firstSpan = code.querySelector('span');
        if (!firstSpan) return;
        
        const text = firstSpan.textContent || '';
        
        // 检测注释
        let commentContent = null;
        if (text.startsWith('//')) {
          commentContent = text.substring(2).trim();
        } else if (text.startsWith('#')) {
          commentContent = text.substring(1).trim();
        } else if (text.startsWith('<!--') && text.endsWith('-->')) {
          commentContent = text.substring(4, text.length - 3).trim();
        } else if (text.startsWith('/*') && text.endsWith('*/')) {
          commentContent = text.substring(2, text.length - 2).trim();
        }
        
        if (!commentContent) return;
        
        const match = commentContent.match(/max_lines\s*=\s*(\d+)/);
        if (!match) return;
        
        const N = parseInt(match[1], 10);
        if (isNaN(N) || N <= 0) return;
        
        // 应用 max-height
        code.style.maxHeight = `calc(0.772059em * 2 + 1.4em * ${N})`;
        
        const parentCode = firstSpan.parentNode;
        
        // 1. 移除 firstSpan 前面的所有空白文本节点（如 <code> 与第一个 span 之间的换行符）
        let prev = firstSpan.previousSibling;
        while (prev && prev.nodeType === Node.TEXT_NODE && /^\s*$/.test(prev.textContent)) {
          const toRemove = prev;
          prev = prev.previousSibling;
          toRemove.remove();
        }
        
        // 2. 删除注释 span 本身
        firstSpan.remove();
        
        // 3. 删除现在开头的空白文本节点（即原 firstSpan 后方的空白节点）
        while (parentCode.firstChild && 
               parentCode.firstChild.nodeType === Node.TEXT_NODE && 
               /^\s*$/.test(parentCode.firstChild.textContent)) {
          parentCode.firstChild.remove();
        }
        
      } catch (err) {
        console.warn('处理 highlight 块时出现错误:', err);
      }
    });
  } catch (err) {
    console.error('执行 highlight 注释处理时出现严重错误:', err);
  }
});