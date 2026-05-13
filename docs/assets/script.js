document$.subscribe(function() {
  try {
    const highlightDivs = document.querySelectorAll('div.highlight');
    const admonitionDivs = document.querySelectorAll('div.admonition');
    
    // --- 处理 highlight 块 (原逻辑) ---
    highlightDivs.forEach(div => {
      try {
        const pre = div.querySelector('pre');
        if (!pre) return;
        const code = pre.querySelector('code');
        if (!code) return;
        const firstSpan = code.querySelector('span');
        if (!firstSpan) return;
        const text = firstSpan.textContent || '';
        
        let commentContent = null;
        if (text.startsWith('//')) commentContent = text.substring(2).trim();
        else if (text.startsWith('#')) commentContent = text.substring(1).trim();
        else if (text.startsWith('<!--') && text.endsWith('-->')) commentContent = text.substring(4, text.length - 3).trim();
        else if (text.startsWith('/*') && text.endsWith('*/')) commentContent = text.substring(2, text.length - 2).trim();
        
        if (!commentContent) return;
        const match = commentContent.match(/max_lines\s*=\s*(\d+)/);
        if (!match) return;
        
        const N = parseInt(match[1], 10);
        if (isNaN(N) || N <= 0) return;
        
        code.style.maxHeight = `calc(0.772059em * 2 + 1.4em * ${N})`;
        const parentCode = firstSpan.parentNode;
        let prev = firstSpan.previousSibling;
        while (prev && prev.nodeType === Node.TEXT_NODE && /^\s*$/.test(prev.textContent)) {
          const toRemove = prev;
          prev = prev.previousSibling;
          toRemove.remove();
        }
        firstSpan.remove();
        while (parentCode.firstChild && parentCode.firstChild.nodeType === Node.TEXT_NODE && /^\s*$/.test(parentCode.firstChild.textContent)) {
          parentCode.firstChild.remove();
        }
      } catch (err) {
        console.warn('处理 highlight 块时出现错误:', err);
      }
    });

    // --- 补全处理 admonition 块的逻辑 ---
    admonitionDivs.forEach(div => {
      try {
        // 1. 获取内部 class 为 admonition-title 的 p 元素
        const titleP = div.querySelector('p.admonition-title');
        if (!titleP) return;

        // 2. 提取文字内容 (textContent 会自动忽略 ::before 伪元素)
        const text = titleP.textContent.trim();

        // 3. 检查是否以 [plain] 开头
        if (text.startsWith('[plain]')) {
          // 4. 修改字重
          titleP.style.fontWeight = '400';
          titleP.innerText = titleP.innerText.replace('[plain]', '').trim();
           
        }
      } catch (err) {
        console.warn('处理 admonition 块时出现错误:', err);
      }
    });

  } catch (err) {
    console.error('执行 highlight/admonition 处理时出现严重错误:', err);
  }
});