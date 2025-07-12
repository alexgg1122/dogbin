#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
API路由定义
"""

from flask import Blueprint, jsonify, request
from models.paste import Paste

# 创建蓝图
api_bp = Blueprint('api', __name__, url_prefix='/api')


@api_bp.route('/paste', methods=['POST'])
def create_paste():
    """
    创建新的文本粘贴
    
    返回:
        JSON: 包含新创建的粘贴信息
    """
    data = request.get_json()
    
    if not data or 'content' not in data:
        return jsonify({'error': '缺少必要的内容字段'}), 400
    
    # 创建新的粘贴
    paste = Paste.create(
        content=data['content'],
        title=data.get('title', '未命名'),
        syntax=data.get('syntax', 'plain'),
        expiration=data.get('expiration', None)
    )
    
    return jsonify({
        'id': paste.id,
        'url': f"/paste/{paste.id}",
        'title': paste.title,
        'created_at': paste.created_at.isoformat()
    }), 201


@api_bp.route('/paste/<paste_id>', methods=['GET'])
def get_paste(paste_id):
    """
    获取指定ID的粘贴内容
    
    参数:
        paste_id: 粘贴的唯一标识符
        
    返回:
        JSON: 包含粘贴的详细信息
    """
    paste = Paste.get_by_id(paste_id)
    
    if not paste:
        return jsonify({'error': '未找到指定的粘贴'}), 404
    
    return jsonify({
        'id': paste.id,
        'title': paste.title,
        'content': paste.content,
        'syntax': paste.syntax,
        'created_at': paste.created_at.isoformat(),
        'expires_at': paste.expires_at.isoformat() if paste.expires_at else None
    })


def register_routes(app):
    """
    注册所有路由到Flask应用
    
    参数:
        app: Flask应用实例
    """
    app.register_blueprint(api_bp)