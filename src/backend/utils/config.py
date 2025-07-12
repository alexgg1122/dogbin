#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
应用配置
"""

import os
from typing import Dict, Any


class Config:
    """
    应用配置类
    """
    # 应用设置
    DEBUG = os.environ.get('DEBUG', 'True') == 'True'
    SECRET_KEY = os.environ.get('SECRET_KEY', 'dev-secret-key')
    
    # 服务设置
    HOST = os.environ.get('HOST', '0.0.0.0')
    PORT = int(os.environ.get('PORT', 5000))
    
    # 粘贴设置
    MAX_CONTENT_LENGTH = 1024 * 1024  # 1MB
    DEFAULT_EXPIRATION = 60 * 24 * 7  # 7天（分钟）
    
    @classmethod
    def to_dict(cls) -> Dict[str, Any]:
        """
        将配置转换为字典
        
        返回:
            Dict[str, Any]: 配置字典
        """
        return {key: getattr(cls, key) for key in dir(cls) 
                if not key.startswith('_') and key.isupper()}