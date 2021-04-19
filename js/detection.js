//多文件列表示例
layui.use('upload', function(){
  var $ = layui.jquery,upload = layui.upload;
  
  //多文件列表示例
  var demoListView = $('#demoList')
  ,uploadListIns = upload.render({
    elem: '#testList'
    ,url: 'api.php?operate=upload' //改成您自己的上传接口
    ,accept: 'file'
    ,multiple: true
    ,auto: false
    ,bindAction: '#testListAction'
    ,choose: function(obj){   
      var files = this.files = obj.pushFile(); //将每次选择的文件追加到文件队列
      //读取本地文件
      obj.preview(function(index, file, result){
        var tr = $(['<tr id="upload-'+ index +'">'
          ,'<td>'+ file.name +'</td>'
          ,'<td>'+ (file.size/1024).toFixed(1) +'kb</td>'
          ,'<td>等待上传</td>'
          ,'<td>'
            ,'<button class="layui-btn layui-btn-xs demo-reload layui-hide">重传</button>'
            ,'<button class="layui-btn layui-btn-xs layui-btn-danger demo-delete">删除</button>'
          ,'</td>'
        ,'</tr>'].join(''));
        
        //单个重传
        tr.find('.demo-reload').on('click', function(){
          obj.upload(index, file);
        });
        
        //删除
        tr.find('.demo-delete').on('click', function(){
          delete files[index]; //删除对应的文件
          tr.remove();
          uploadListIns.config.elem.next()[0].value = ''; //清空 input file 值，以免删除后出现同名文件不可选
        });
        
        demoListView.append(tr);
      });
    }
    ,done: function(res, index, upload){
      if(res.code == 0){ //上传成功
        var tr = demoListView.find('tr#upload-'+ index)
        ,tds = tr.children();
        tds.eq(2).html('<span style="color: #5FB878;">上传成功</span>');
        tds.eq(3).html(''); //清空操作
        return delete this.files[index]; //删除文件队列已经上传成功的文件
      }else{
          var tr = demoListView.find('tr#upload-'+ index)
          ,tds = tr.children();
          tds.eq(2).html('<span style="color: #FF5722;">' + res.msg +'</span>'); // 显示接口返回的错误信息
      }
      this.error(index, upload);
    }
    ,error: function(index, upload){
      var tr = demoListView.find('tr#upload-'+ index)
      ,tds = tr.children();
      tds.eq(2).html('<span style="color: #FF5722;">上传失败：</span>' + tds.eq(2).html());
      tds.eq(3).find('.demo-reload').removeClass('layui-hide'); //显示重传
    }
  });
});



// 构造列表结构
layui.use('table', function() {
    var table = layui.table;
    //第一个实例
    table.render({
        elem: '#demo',
        page: false,//开启分页
        toolbar: true,
        defaultToolbar: ['filter', 'print', 'exports'],
        url: 'api.php?operate=inquire',
        cols: [
            [ //表头
                {
                    field: 'id',
                    title: 'id',
                    sort: true,
                    align: 'center',
                    width: 150,
                }, {
                    field: 'name',
                    title: '文件名称',
                    align: 'center',
                    width: 300,
                }, {
                    field: 'type',
                    title: '类型',
                    align: 'center',
                    width: 150,
                    sort: true,
                }, {
                    field: 'uploadTime',
                    title: '上传时间',
                    align: 'center',
                    width: 200,
                    sort: true,
                }, {
                    field: 'status',
                    title: '状态',
                    align: 'center',
                    width: 150,
                }, {
                    field: 'damageType',
                    title: '损伤类型',
                    align: 'center',
                    sort: true,
                }, { 
                    title:'操作',
                    toolbar: '#barDemo', 
                    align: 'center',
		    width: 300,
                    }
            ],
        ],
        done: function (res) {
            console.log(res);
        }
    });

    // 绑定按钮监听事件
    table.on('tool(test)', function(obj){
      var data = obj.data;
      var line1 = "<span>id：" + data.id + "</span><br>";
      var line2 = "<span>名称："+ data.name + "</span><br>";
      var line3 = "<span>待检图片：</span><img src=" + data.picUri + "><br>";
      var line4 = "<span>上传时间：" + data.uploadTime + "</span><br>";
      var line5 = "<span>状态：" + data.status + "</span><br>";
      if(data.resultUri == null){
        var line6 = "";
      }else{
        var line6 ="<span>检测结果：</span><img width='520px' height='520px' src=" + data.resultUri + "><br>";
      }
      line7 = "<span>病害类型：" + data.damageType + "</span><br>";
      line8 = "<span>高度：" + data.height + "</span><br>";
      line9 = "<span>宽度：" + data.width + "</span><br>";
      line10 = "<span>面积：" + data.area + "</span><br>"; 
      var content = "<div style='margin:20px auto;'>" + line1 + line2 + line3 + line4 + line5 + line6 + line7 + line8 + line9 + line10 + "</div>";

      if(obj.event === 'del'){
        layer.confirm('真的删除行么', function(index){
          obj.del();
          $.get("api.php?operate=delete&id=" + data.id);
          layer.close(index);
        });
      } else if(obj.event === 'details'){
        if(data.type == "图片"){
          layer.open({
            type: 1,
            area: ['700px', '600px'],
            title: '详情',
            maxmin: true,
            content: content,
          });
        }else{
          if(data.status == "已检测") {
            window.location.href = "video.php?id=" + data.id;
          }else{
            layer.msg('视频检测中，请稍后再试', {icon: 0});
          }
          
        }
      }
    });

});



