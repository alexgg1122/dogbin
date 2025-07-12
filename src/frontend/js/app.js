/**
 * Dogbin 前端应用脚本
 */

// DOM元素
const elements = {
    // 编辑器元素
    editorContainer: document.querySelector('.editor-container'),
    pasteTitle: document.getElementById('paste-title'),
    pasteContent: document.getElementById('paste-content'),
    syntaxSelect: document.getElementById('syntax-select'),
    expirationSelect: document.getElementById('expiration-select'),
    saveButton: document.getElementById('save-button'),
    charCount: document.querySelector('.char-count'),
    
    // 查看元素
    viewContainer: document.querySelector('.view-container'),
    viewTitle: document.getElementById('view-title'),
    viewDate: document.getElementById('view-date'),
    viewSyntax: document.getElementById('view-syntax'),
    viewContent: document.getElementById('view-content'),
    copyButton: document.getElementById('copy-button'),
    newButton: document.getElementById('new-button'),
    rawButton: document.getElementById('raw-button')
};

// API端点
const API = {
    BASE_URL: '/api',
    CREATE_PASTE: '/api/paste',
    GET_PASTE: (id) => `/api/paste/${id}`
};

/**
 * 初始化应用
 */
function initApp() {
    // 检查URL是否包含粘贴ID
    const path = window.location.pathname;
    const pasteId = path.startsWith('/paste/') ? path.substring(7) : null;
    
    if (pasteId) {
        loadPaste(pasteId);
    } else {
        showEditor();
    }
    
    // 添加事件监听器
    setupEventListeners();
}

/**
 * 设置事件监听器
 */
function setupEventListeners() {
    // 字符计数
    elements.pasteContent.addEventListener('input', updateCharCount);
    
    // 保存按钮
    elements.saveButton.addEventListener('click', savePaste);
    
    // 复制按钮
    elements.copyButton.addEventListener('click', copyToClipboard);
    
    // 新建按钮
    elements.newButton.addEventListener('click', () => {
        window.location.href = '/';
    });
    
    // 原始按钮
    elements.rawButton.addEventListener('click', () => {
        const path = window.location.pathname;
        if (path.startsWith('/paste/')) {
            window.location.href = `/raw${path}`;
        }
    });
    
    // 初始更新字符计数
    updateCharCount();
}

/**
 * 更新字符计数
 */
function updateCharCount() {
    const count = elements.pasteContent.value.length;
    elements.charCount.textContent = `${count} 字符`;
}

/**
 * 显示编辑器
 */
function showEditor() {
    elements.editorContainer.classList.remove('hidden');
    elements.viewContainer.classList.add('hidden');
}

/**
 * 显示查看界面
 */
function showViewer() {
    elements.editorContainer.classList.add('hidden');
    elements.viewContainer.classList.remove('hidden');
}

/**
 * 保存粘贴
 */
async function savePaste() {
    const content = elements.pasteContent.value.trim();
    
    if (!content) {
        alert('请输入要分享的内容');
        return;
    }
    
    // 禁用保存按钮
    elements.saveButton.disabled = true;
    elements.saveButton.textContent = '保存中...';
    
    try {
        const response = await fetch(API.CREATE_PASTE, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: elements.pasteTitle.value.trim() || '未命名',
                content: content,
                syntax: elements.syntaxSelect.value,
                expiration: parseInt(elements.expirationSelect.value, 10) || null
            })
        });
        
        if (!response.ok) {
            throw new Error('保存失败');
        }
        
        const data = await response.json();
        
        // 重定向到新创建的粘贴
        window.location.href = data.url;
        
    } catch (error) {
        console.error('保存粘贴时出错:', error);
        alert(`保存失败: ${error.message}`);
        
        // 重新启用保存按钮
        elements.saveButton.disabled = false;
        elements.saveButton.textContent = '保存';
    }
}

/**
 * 加载粘贴
 * @param {string} id - 粘贴ID
 */
async function loadPaste(id) {
    try {
        const response = await fetch(API.GET_PASTE(id));
        
        if (!response.ok) {
            throw new Error('未找到粘贴');
        }
        
        const paste = await response.json();
        
        // 更新查看界面
        elements.viewTitle.textContent = paste.title;
        elements.viewDate.textContent = formatDate(new Date(paste.created_at));
        elements.viewSyntax.textContent = paste.syntax;
        elements.viewContent.textContent = paste.content;
        elements.viewContent.className = paste.syntax;
        
        // 应用语法高亮
        hljs.highlightElement(elements.viewContent);
        
        // 显示查看界面
        showViewer();
        
    } catch (error) {
        console.error('加载粘贴时出错:', error);
        alert(`加载失败: ${error.message}`);
        showEditor();
    }
}

/**
 * 复制内容到剪贴板
 */
async function copyToClipboard() {
    try {
        await navigator.clipboard.writeText(elements.viewContent.textContent);
        
        // 更新按钮文本
        const originalText = elements.copyButton.textContent;
        elements.copyButton.textContent = '已复制!';
        
        // 3秒后恢复原始文本
        setTimeout(() => {
            elements.copyButton.textContent = originalText;
        }, 3000);
        
    } catch (error) {
        console.error('复制到剪贴板时出错:', error);
        alert('复制失败，请手动复制');
    }
}

/**
 * 格式化日期
 * @param {Date} date - 日期对象
 * @returns {string} 格式化的日期字符串
 */
function formatDate(date) {
    return new Intl.DateTimeFormat('zh-CN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }).format(date);
}

// 初始化应用
document.addEventListener('DOMContentLoaded', initApp);