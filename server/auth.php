<?php
if ($_POST['action'] === "signin") {
   echo signIn();
}

if ($_POST['action'] === "login") {
    echo logIn();
}


function logIn() {
    $nickname = $_POST["nickname"];
    $password = $_POST["password"];
    $db = dataBase();
    $res = mysqli_query($db, "SELECT `password` FROM `user` where `name`='".$nickname."'");
    $user = mysqli_fetch_assoc($res);
    if ( !$user ) return "this user no exist";
    if ( $user["password"] === $password ) {
        setcookie("nick",$nickname);
        return "true";
    }else return "false";
}

function signIn () {
    $nickname = $_POST["nickname"];
    $password = $_POST["password"];
    $db = dataBase();
    $res = mysqli_query($db, "SELECT `name` FROM `user`");
    while ($user = mysqli_fetch_assoc($res)) {
        if ($nickname === $user["name"]){
            return "nickname is exist";
        }    
    }
    $res = mysqli_query($db, 'INSERT INTO `user` (`name`, `password`) VALUES ("'.$nickname.'","'.$password.'")');
    if($res) return "user add to table";
};

function dataBase() {
    $db_conf = [
        "host" => "localhost",
        "user" => "root",
        "pass" => "",
        "name" => "art-cafe"
    ];
    return mysqli_connect($db_conf["host"],$db_conf["user"],$db_conf["pass"],$db_conf["name"]);
}
