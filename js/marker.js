//http请求json文件
var req = new Request("http://39.106.70.75/project1/data1.json", {method: 'GET', cache: 'reload'});
fetch(req).then(function(response) {
  return response.json();
}).then(function(json) {
  console.log(json.data.length);
  //循环遍历json项目
  for(var i=0;i<json.data.length;i++){
    var longitude = json.data[i].longitude;     //获取经度
    var latitude = json.data[i].latitude;       //获取纬度
    var img = json.data[i].uri;                 //获取图片
    var point = new BMapGL.Point(longitude, latitude);
    var marker =new BMapGL.Marker(point);       //将标注添加到地图中
    map.addOverlay(marker);                     // 将标注添加到地图中
    addClickHandler(point,marker,img,longitude,latitude);
  }
});

//添加信息窗
function addClickHandler(point,marker,img,longitude,latitude){
        var text = "<img width=529px height=396px src=" + img + "><br><span>当前坐标：(  " + longitude + "," + latitude + "  )</span>";
        var opts = {
            width : 800,     // 信息窗口宽度
            height: 600,     // 信息窗口高度
            title : "实拍图" , // 信息窗口标题
            message:"勘测图"
        }
        var infoWindow = new BMapGL.InfoWindow(text, opts);  // 创建信息窗口对象
        marker.addEventListener("click", function(){          
    	    map.openInfoWindow(infoWindow, point); //开启信息窗口
        }); 
}