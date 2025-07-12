#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Paste模型定义
"""

import datetime
import uuid
from dataclasses import dataclass
from typing import Optional, Dict, List, ClassVar


@dataclass
class Paste:
    """
    表示一个文本粘贴的模型
    """
    content: str
    title: str
    syntax: str
    created_at: datetime.datetime
    id: str
    expires_at: Optional[datetime.datetime] = None
    
    # 内存存储 - 在实际应用中应替换为数据库
    _storage: ClassVar[Dict[str, 'Paste']] = {}
    
    @classmethod
    def create(cls, content: str, title: str = "未命名", 
              syntax: str = "plain", expiration: Optional[int] = None) -> 'Paste':
        """
        创建新的粘贴
        
        参数:
            content: 粘贴的文本内容
            title: 粘贴的标题
            syntax: 语法高亮类型
            expiration: 过期时间（分钟），None表示永不过期
            
        返回:
            Paste: 新创建的粘贴对象
        """
        now = datetime.datetime.now()
        paste_id = str(uuid.uuid4())[:8]  # 生成短ID
        
        # 计算过期时间
        expires_at = None
        if expiration is not None:
            expires_at = now + datetime.timedelta(minutes=expiration)
        
        # 创建粘贴对象
        paste = cls(
            id=paste_id,
            content=content,
            title=title,
            syntax=syntax,
            created_at=now,
            expires_at=expires_at
        )
        
        # 存储粘贴
        cls._storage[paste_id] = paste
        return paste
    
    @classmethod
    def get_by_id(cls, paste_id: str) -> Optional['Paste']:
        """
        通过ID获取粘贴
        
        参数:
            paste_id: 粘贴的唯一标识符
            
        返回:
            Optional[Paste]: 找到的粘贴对象，如果不存在则返回None
        """
        paste = cls._storage.get(paste_id)
        
        # 检查是否过期
        if paste and paste.expires_at and paste.expires_at < datetime.datetime.now():
            del cls._storage[paste_id]  # 删除过期的粘贴
            return None
            
        return paste
    
    @classmethod
    def get_recent(cls, limit: int = 10) -> List['Paste']:
        """
        获取最近创建的粘贴
        
        参数:
            limit: 返回的最大数量
            
        返回:
            List[Paste]: 最近创建的粘贴列表
        """
        now = datetime.datetime.now()
        
        # 过滤掉过期的粘贴
        valid_pastes = [
            p for p in cls._storage.values() 
            if not p.expires_at or p.expires_at > now
        ]
        
        # 按创建时间排序并限制数量
        return sorted(
            valid_pastes, 
            key=lambda p: p.created_at, 
            reverse=True
        )[:limit]