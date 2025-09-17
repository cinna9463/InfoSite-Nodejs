import * as http from 'http';
import * as path from 'path';

import * as fs from 'fs';

function get_page(page_name)
{
    let page_data;
    page_name = path.extname(page_name)=='' ? page_name+'.html' : page_name;
    
    try
    {
        page_data = fs.readFileSync(page_name,'utf8');
    }
    catch(err)
    {
        page_data = fs.readFileSync('404.html','utf8')
    }
    return page_data;
}

function handler(req,res)
{
    let page_name = req.url.substring(1);

    const page_data = get_page(page_name);

    res.status=200;
    res.setHeader('Content-Type', 'text/html');
    res.end(page_data);

}

const server = http.createServer(handler);

server.listen(443,()=>
{
    console.log('server is listening at port : 8080');
});

server.on('request', (req)=>
{
    console.log('new connection');
    console.log(req.headers.host);
    console.log(req.url);
});

server.on('close', ()=>
{
    console.log('connection closed');
});