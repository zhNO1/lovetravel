//导入包
const fs=require('fs');
const http=require('http');
const path=require('path');
//导入第三方包
const mime=require('mime');
//记录网站更目录
const rootpath=path.join(__dirname,'WWW');
//建立服务器
let server=http.createServer((request,response)=>{
    // response.setHeader('content-type','text/html;charset=utf-8')
    //生成地址
    let targetpath=path.join(rootpath,request.url);
     //判断存在
     if(fs.existsSync(targetpath)){
        //判断是不是文件还是文件夹
       fs.stat(targetpath,(error,stats)=>{
              //是文件直接读取 并返回
              if(stats.isFile()){
                    console.log(mime.getType(targetpath));
                    //设置文件类型
                    response.setHeader('content-type',mime.getType(targetpath));
                    //读取文件
                    fs.readFile(targetpath,(error,data)=>{
                        response.end(data)
                    })
              }
              //判断是不是文件夹
              if(stats.isDirectory()){
                  console.log(request.url);
                  //读取文件夹并且返回
                  fs.readdir(targetpath,(error,files)=>{
                 //创建目录
                  let tem='';
                  //遍历
                  for (let i = 0; i < files.length; i++) {
                      tem+=`<li>
                      <a href="${request.url}${request.url=='/'?'':'/'}${files[i]}">${files[i]}</a>
                  </li>`;
                  }
                  response.end(`<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 3.2 Final//EN">
                  <html>
                  <head>
                      <title>Index of/ </title>
                  </head>
                  <body>
                      <h1>Index of ${request.url}</h1>
                      <ul>
                          ${tem}
                      </ul>
                  </body>
                  </html>`)
                  })

              }
       })
    } else{
        //404
        response.statusCode=404;
       response.setHeader('content-type','text/html;charset=utf-8')
        response.end(` <!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML 2.0//EN">
        <html><head>
        <title>404 Not Found</title>
        </head><body>
        <h1>Not Found</h1>
        <p>你请求的${request.url} 不在服务器上哦,检查一下呗</p>
        </body></html>`)
    }
})
//监听
server.listen(80,'192.168.38.57',()=>{
    console.log('监听成功');
})