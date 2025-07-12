/**
 * 比熊犬网页的JavaScript功能
 */

document.addEventListener('DOMContentLoaded', function() {
    // 平滑滚动功能
    setupSmoothScrolling();
    
    // 导航高亮功能
    setupNavHighlighting();
    
    // 图片点击放大功能
    setupImageZoom();
    
    // 页面加载动画
    animateOnScroll();
    
    console.log('比熊犬网页脚本已加载');
});

/**
 * 设置平滑滚动功能
 */
function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // 计算目标位置（考虑固定导航栏的高度）
                const navHeight = document.querySelector('nav').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * 设置导航高亮功能
 */
function setupNavHighlighting() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('nav a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        const navHeight = document.querySelector('nav').offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 100; // 提前一点高亮
            const sectionHeight = section.offsetHeight;
            
            if (window.pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // 添加active类的样式
    const style = document.createElement('style');
    style.textContent = `
        nav a.active {
            color: #ff6a88 !important;
            border-bottom: 2px solid #ff6a88;
        }
    `;
    document.head.appendChild(style);
}

/**
 * 设置图片点击放大功能
 */
function setupImageZoom() {
    const galleryImages = document.querySelectorAll('.gallery-item img');
    
    galleryImages.forEach(img => {
        img.addEventListener('click', function() {
            // 创建模态框
            const modal = document.createElement('div');
            modal.classList.add('image-modal');
            
            // 创建大图
            const largeImg = document.createElement('img');
            largeImg.src = this.src;
            
            // 创建关闭按钮
            const closeBtn = document.createElement('span');
            closeBtn.classList.add('close-modal');
            closeBtn.innerHTML = '&times;';
            closeBtn.addEventListener('click', function() {
                document.body.removeChild(modal);
                document.body.style.overflow = 'auto';
            });
            
            // 点击模态框背景关闭
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    document.body.removeChild(modal);
                    document.body.style.overflow = 'auto';
                }
            });
            
            // 添加元素到模态框
            modal.appendChild(closeBtn);
            modal.appendChild(largeImg);
            
            // 添加模态框到body
            document.body.appendChild(modal);
            document.body.style.overflow = 'hidden'; // 防止背景滚动
        });
    });
    
    // 添加模态框样式
    const style = document.createElement('style');
    style.textContent = `
        .image-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }
        
        .image-modal img {
            max-width: 90%;
            max-height: 90%;
            object-fit: contain;
            border: 5px solid white;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
        }
        
        .close-modal {
            position: absolute;
            top: 20px;
            right: 30px;
            color: white;
            font-size: 40px;
            font-weight: bold;
            cursor: pointer;
        }
    `;
    document.head.appendChild(style);
}

/**
 * 设置页面滚动动画
 */
function animateOnScroll() {
    const elements = document.querySelectorAll('.section, .card, .gallery-item');
    
    // 初始隐藏所有元素
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // 检查元素是否在视口中
    function checkVisibility() {
        elements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const windowHeight = window.innerHeight || document.documentElement.clientHeight;
            
            // 当元素进入视口时显示
            if (rect.top <= windowHeight * 0.8) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    }
    
    // 初始检查
    checkVisibility();
    
    // 滚动时检查
    window.addEventListener('scroll', checkVisibility);
}