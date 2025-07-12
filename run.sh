#!/bin/bash

# 确保脚本在错误时退出
set -e

# 检查是否安装了Python
if ! command -v python3 &> /dev/null; then
    echo "错误: 未找到Python3，请安装Python3后再试"
    exit 1
fi

# 创建虚拟环境（如果不存在）
if [ ! -d "venv" ]; then
    echo "创建虚拟环境..."
    python3 -m venv venv
fi

# 激活虚拟环境
echo "激活虚拟环境..."
source venv/bin/activate

# 安装依赖
echo "安装依赖..."
pip install -r requirements.txt

# 运行应用
echo "启动Dogbin应用..."
python src/backend/app.py