var map = new BMapGL.Map("container");    // 创建Map实例
map.centerAndZoom(new BMapGL.Point(113.544504,34.818279), 17);  // 初始化地图,设置中心点坐标和地图级别
map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
map.enableKeyboard(true);           //开启键盘缩放
map.setTilt(30);    //设置地图的倾斜角度

// 添加比例尺控件
var scaleCtrl = new BMapGL.ScaleControl({
    ancho: BMAP_ANCHOR_BOTTOM_LEFT      //设置控件位置
});  
map.addControl(scaleCtrl);
// 添加缩放控件
var zoomCtrl = new BMapGL.ZoomControl({
    ancho: BMAP_ANCHOR_BOTTOM_RIGHT,    // 设置控件位置
    offset: new BMapGL.Size(60, 80)     //设置控件偏移量
});  
map.addControl(zoomCtrl);
//添加3D控件
var navi3DCrtl = new BMapGL.NavigationControl3D();
map.addControl(navi3DCrtl);

//按钮设置
//路况信息开关
var Satellite = true;
function setSatellite() {
    if (Satellite) {
        map.setMapType(BMAP_EARTH_MAP);
        Satellite = false;
    } else {
        map.setMapType(BMAP_NORMAL_MAP);
        Satellite = true;
    }
}
//卫星图层开关
var Traffic = true;
function setTraffic() {
    if (Traffic) {
        map.setTrafficOn();
        Traffic = false;
    } else {
        map.setTrafficOff();
        Traffic = true;
    }
}

//自定义右键菜单
var menu = new BMapGL.ContextMenu();
var txtMenuItem = [
    {
        text:'放大',                             // 定义菜单项的显示文本
        callback: function () {                 // 定义菜单项点击触发的回调函数
            map.zoomIn();
        }
    },
    {
        text:'缩小',
        callback: function () {
            map.zoomOut();
        }
    }
];
for(var i = 0; i < txtMenuItem.length; i++){
menu.addItem(new BMapGL.MenuItem(               // 定义菜单项实例
    txtMenuItem[i].text,                        // 传入菜单项的显示文本
    txtMenuItem[i].callback,                    // 传入菜单项的回调函数
    {
        width: 300,                             // 指定菜单项的宽度
        id: 'menu' + i                          // 指定菜单项dom的id
    }
));
}
map.addContextMenu(menu);                           // 给地图添加右键菜单
