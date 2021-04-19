<!DOCTYPE html>
<html lang="zh-cn">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>视频详情</title>
    <script src="https://cdn.jsdelivr.net/npm/jquery@3.2.1/dist/jquery.min.js"></script>
    <link rel="stylesheet" href="layui/css/layui.css" media="all">
    <link rel="stylesheet" href="css/video.css">
</head>
<body>
    <h2 class="title">视频检测详情</h2>
    <div class="video-container">
        <video id="video" class="layui-anim layui-anim-upbit" controls="controls" autoplay="autoplay" loop="loop"></video>
    </div>
    
    <div class="picture-container">
        <h3 class="title">病害详情</h3>
        <ul class="flow-default" height="1000px" id="LAY_demo1"></ul>
    </div>
    <script type="text/javascript" src="layui/layui.js"></script>
    <script type="text/javascript" src="js/video.js"></script>
</body>
</html>