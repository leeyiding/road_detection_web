layui.use('flow', function(){
    function getQueryVariable(variable){
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i=0;i<vars.length;i++) {
                var pair = vars[i].split("=");
                if(pair[0] == variable){return pair[1];}
        }
        return(false);
    }
    var id = getQueryVariable("id");

    $.get("api.php?operate=inquireVideo&id=" + id,function (data){
        var json = $.parseJSON(data);
        var flow = layui.flow;

        // 改变视频scr
        $("video").attr("src",json.videoUri);

        flow.load({
        elem: '#LAY_demo1' //流加载容器
        //   ,scrollElem: '#LAY_demo1' //滚动条所在元素，一般不用填，此处只是演示需要。
        ,done: function(page, next){ //执行下一页的回调
            
            //模拟数据插入
            setTimeout(function(){
            var lis = [];
            for(var i = 0; i < json.data.length ; i++){
                var line1 = '<img src="'+ json['data'][i]['picUri'] +'"><br>';
                var line2 = '<span>长度：'+ json['data'][i]['damageLong'] + '</span>';
                var line3 = '<span>宽度：'+ json['data'][i]['damageWide'] + '</span>';
                var line4 = '<span>面积：'+ json['data'][i]['damageArea'] + '</span>';
                lis.push('<li class="layui-anim layui-anim-scale">' + line1 + '<div class = "damage-info">' + line2 + line3 + line4 +  '</div></li>')
            }
            
            //执行下一页渲染，第二参数为：满足“加载更多”的条件，即后面仍有分页
            //pages为Ajax返回的总页数，只有当前页小于总页数的情况下，才会继续出现加载更多
            next(lis.join(''), page < 1); //假设总页数为 10
            }, 500);
        }
        });
      });
});