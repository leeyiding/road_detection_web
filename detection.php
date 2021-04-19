<!DOCTYPE html>
<html lang="zh-cn">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>病害智能检测</title>
    <script src="https://cdn.jsdelivr.net/npm/jquery@3.2.1/dist/jquery.min.js"></script>
    <link rel="stylesheet" href="layui/css/layui.css" media="all">
    <link rel="stylesheet" href="css/detection.css">
</head>
<body>
    <div class="upload-form">
        <h3 class="form-title">病害智能检测</h3>
        <div class="layui-upload layui-anim layui-anim-scale">
            <div class="layui-upload-list">
                <table class="layui-table">
                <thead>
                    <tr>
                        <th>文件名</th>
                        <th>大小</th>
                        <th>状态</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody id="demoList"></tbody>
                </table>
            </div>
            <button type="button" class="layui-btn layui-btn-normal" id="testList"><i class="layui-icon"></i>选择多文件</button>
            <button type="button" class="layui-btn" id="testListAction">开始上传</button>
        </div> 
    </div>

    <div class="upload-table">
        <h3 class="table-title">检测结果</h3>
        <table id="demo" lay-filter="test"></table>
    </div>
    
    <!-- 表格右侧工具条 -->
    <script type="text/html" id="barDemo">
        <a class="layui-btn layui-btn-xs" lay-event="details">详情</a>
        <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del">删除</a>
    </script>

    <script type="text/javascript" src="layui/layui.js"></script>
    <script type="text/javascript" src="js/detection.js"></script>
</body>
</html>
