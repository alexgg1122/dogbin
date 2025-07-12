#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Paste模型测试
"""

import unittest
import sys
import os
import datetime

# 添加src目录到Python路径
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'src', 'backend')))

from models.paste import Paste


class TestPaste(unittest.TestCase):
    """
    测试Paste模型
    """
    
    def test_create_paste(self):
        """
        测试创建粘贴功能
        """
        content = "测试内容"
        title = "测试标题"
        syntax = "python"
        
        paste = Paste.create(content=content, title=title, syntax=syntax)
        
        self.assertEqual(paste.content, content)
        self.assertEqual(paste.title, title)
        self.assertEqual(paste.syntax, syntax)
        self.assertIsNotNone(paste.id)
        self.assertIsInstance(paste.created_at, datetime.datetime)
        self.assertIsNone(paste.expires_at)
    
    def test_get_by_id(self):
        """
        测试通过ID获取粘贴
        """
        content = "测试内容2"
        paste = Paste.create(content=content)
        
        retrieved_paste = Paste.get_by_id(paste.id)
        
        self.assertIsNotNone(retrieved_paste)
        self.assertEqual(retrieved_paste.content, content)
        self.assertEqual(retrieved_paste.id, paste.id)
    
    def test_expiration(self):
        """
        测试粘贴过期功能
        """
        content = "过期测试"
        # 设置为1分钟后过期
        paste = Paste.create(content=content, expiration=1)
        
        self.assertIsNotNone(paste.expires_at)
        self.assertTrue(paste.expires_at > datetime.datetime.now())
        
        # 模拟过期（直接修改过期时间）
        paste.expires_at = datetime.datetime.now() - datetime.timedelta(minutes=1)
        Paste._storage[paste.id] = paste  # 更新存储
        
        # 尝试获取已过期的粘贴
        retrieved_paste = Paste.get_by_id(paste.id)
        self.assertIsNone(retrieved_paste)
    
    def test_get_recent(self):
        """
        测试获取最近粘贴
        """
        # 清空存储
        Paste._storage.clear()
        
        # 创建多个粘贴
        for i in range(5):
            Paste.create(content=f"内容{i}")
        
        recent_pastes = Paste.get_recent(3)
        
        self.assertEqual(len(recent_pastes), 3)
        # 验证是按创建时间倒序排列的
        for i in range(len(recent_pastes) - 1):
            self.assertTrue(recent_pastes[i].created_at >= recent_pastes[i+1].created_at)


if __name__ == '__main__':
    unittest.main()