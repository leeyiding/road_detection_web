<?php
    header('Content-type:text/html;charset=utf-8');
    $conn = mysqli_connect('localhost:3306','xxxx','xxxxxx') or die('数据库连接失败');

    function useSQL($conn,$sql) {
        $res = mysqli_query($conn,$sql);
        if(!$res){
            echo 'SQL执行错误，编号：' . mysqli_errno($conn) . '<br>';
            echo 'SQL执行错误，信息：' . mysqli_error($conn) . '<br>';
            exit;
        }
        return $res;
    }

    useSQL($conn,'set names utf8');
    useSQL($conn,'use road');
?>