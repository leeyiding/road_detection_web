<!DOCTYPE html> 
<html>
<head> 
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no" /> 
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" /> 
    <title>Hello, World</title> 
    <script type="text/javascript" src="https://api.map.baidu.com/api?v=1.0&type=webgl&ak=xK7CpIyEM1oGHvgaukOGwZwUftw2mwTs"></script>
    <script src="http://libs.baidu.com/jquery/2.0.0/jquery.min.js"></script>
    <link rel="stylesheet" type="text/css" href="css/main.css">
</head> 
  
<body> 
    <div id="container"></div>
    <div class="input-card">
        <div class="input-item">
            <button class="btn" id="upload-btn" ><a href="detection.php">上传路况</a></button>
            <button class="btn" onclick="setTraffic()">路况开关</button>
            <button class="btn" onclick="setSatellite()">卫星图开关</button>
        </div>
    </div>
    <script type="text/javascript" src="js/main.js"></script>
    <script type="text/javascript" src="js/marker.js"></script>
</body> 
</html>