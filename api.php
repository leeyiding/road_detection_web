<?php
    header('Content-type:text/html;charset=utf-8');
    include_once 'mysql.php';
    
    // 构造数据库查询函数
    function getData($conn) {
        $sql = "select * from detection_list";
        $res = useSQL($conn,$sql);
        $list = array();
        while($row = mysqli_fetch_assoc($res)){
            $list[] = $row;
        }
        
        $res = array("code"=>0,"msg"=>"","count"=>count($list),"data"=> $list);
        echo json_encode($res);
    }

    //查询视频
    function getVideoData($conn,$id){
        // 获取视频链接
        $sql = "select resultUri from detection_list where id = {$id}";
        $result = useSQL($conn,$sql);
        $row = mysqli_fetch_array($result);
        $videoUri = $row[0];
        //获取视频截帧图片
        $sql = "select * from picture_list where id = {$id}";
        $res = useSQL($conn,$sql);
        $list = array();
        while($row = mysqli_fetch_assoc($res)){
            $list[] = $row;
        }
        $res = array("videoUri"=> $videoUri,"data"=> $list);
        echo json_encode($res);
    }

    // 文件上传函数
    function uploadFile($conn) {
        $file = $_FILES["file"]; 
        if ($file==null) {
            exit(json_encode(array('code'=>1, 'msg'=>'未上传文件')));
        }

        $allowedExts = array("jpeg", "jpg", "png","mp4");
        $temp = explode(".", $file["name"]);
        $extension = end($temp);     // 获取文件后缀名
        if ((($file["type"] == "image/gif") || ($file["type"] == "image/jpeg") || ($file["type"] == "image/jpg") || ($file["type"] == "image/png") || ($file["type"] == "video/mp4"))&& in_array($extension, $allowedExts)) {
            if ($file["error"] > 0)
            {
                exit(json_encode(array('code'=>3, 'msg'=>'文件上传失败')));
            }
            else
            {
                if (file_exists("../test/project4/before/" . $file["name"]))
                {   
                    exit(json_encode(array('code'=>4, 'msg'=>'文件已存在')));
                }
                else
                {
                    move_uploaded_file($file["tmp_name"], "../test/project4/before/" . $file["name"]);
                    // 数据入库
                    $name = $file['name'];
                    if(($file["type"] == "image/gif") || ($file["type"] == "image/jpeg") || ($file["type"] == "image/jpg") || ($file["type"] == "image/png")){
                        $type = '图片';
                    }elseif($file["type"] == "video/mp4"){
                        $type = '视频';
                    }
                    $picUri = 'http://39.106.70.75/project4/before/' . $file['name'];
                    $uploadTime = date("Y-m-d H:i:s");
                    $status = '待检测';
                    $sql = "insert into detection_list values(null,'{$name}','{$type}','{$picUri}','{$uploadTime}','{$status}',null,null,null,null,null)";
                    useSQL($conn,$sql); 
                    exit(json_encode(array('code'=>0, 'msg'=>'','data'=>json_encode(array('src'=>$picUri)))));
                }
            }
        }else {
            exit(json_encode(array('code'=>2, 'msg'=>'非法的文件格式')));
        }
    }

    //文件删除
    function delData($conn,$id){
        $sql = "select name from detection_list where id = {$id}";
        $result = useSQL($conn,$sql);
        $row = mysqli_fetch_array($result);
        $name = $row[0];
        // 数据库删除记录
        $sql = 'delete from detection_list where id = ' .$id;
        useSQL($conn,$sql);
        //删除相应文件
        if(file_exists('../test/project4/before/' . $name)){
            unlink('../test/project4/before/' . $name);
        }
        if(file_exists('../test/project4/after/' . $name)){
            unlink('../test/project4/after/' . $name);
        }
    }

    if(isset($_GET['operate'])) {
        if($_GET['operate'] == 'inquire'){
            getData($conn);
        }elseif ($_GET['operate'] == 'upload') {
            uploadFile($conn);
        }elseif ($_GET['operate'] == 'inquireVideo'){
            $id = isset($_GET['id']) ? (integer)$_GET['id'] : 0;
            getVideoData($conn,$id);
        }elseif ($_GET['operate'] == 'delete') {
            $id = isset($_GET['id']) ? (integer)$_GET['id'] : 0;
            delData($conn,$id);
        }
    } else {
        echo "无效的请求";
    }
?>