import { request } from 'http';

//导入模板
const fs=require('fs');
const http=require('http');
const path=require('path');
//记录网站更目录
let rootpath=path.join(__dirname,'WWW');
//创建服务器
let server=http.createServer((request,response)=>{
    //返回结果
    response.end('hello');
})
//监听
server.listen(80,'192.168.38.62',()=>{
    console.log("开启成功");
})