#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Dogbin 后端主应用
"""

from flask import Flask, jsonify, request
from api import routes
from utils import config


def create_app():
    """
    创建并配置Flask应用实例
    
    返回:
        Flask: 配置好的Flask应用实例
    """
    app = Flask(__name__)
    app.config.from_object(config.Config)
    
    # 注册路由
    routes.register_routes(app)
    
    return app


if __name__ == "__main__":
    app = create_app()
    app.run(host="0.0.0.0", port=5000, debug=True)