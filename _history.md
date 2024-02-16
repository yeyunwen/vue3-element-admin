# 更加详细的commit的记录

## sidebar添加collapse-expand功能

1. 使用`el-menu-item` 中提供了`#title`插槽，在`collapse`时可以享受ui框架封装的样式。
`SidebarItem` 中 `el-menu-item` 中提供了`#title`插槽，如果将`el-menu-item`的内容封装为一个组件，无法将`icon`和`title`的内容注入指定的插槽，因此取消了Item组件的封装。
同时`el-menu-item`下的`el-icon`也提供了一些样式因此`el-menu-item` 下的svg均包裹在`el-icon`中。
2. 将layout的样式抽离到单独的文件中。

