document$.subscribe(function() {
  try {
    const admonitionDivs = document.querySelectorAll('div.admonition');

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
    console.error('执行 admonition 处理时出现错误:', err);
  }
});