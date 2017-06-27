/**
 * 配置编译环境和线上环境之间的切换
 * 
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 * 
 */
let baseUrl;
let routerMode;
const imgBaseUrl = 'https://fuss10.elemecdn.com';
const baseImgPath = 'static/';
const imgPath = 'http://orzqmn6l7.bkt.clouddn.com/'
let api_url = 'http://localhost:3001'
if (process.env.NODE_ENV == 'development') {
    baseUrl = 'http://orzqmn6l7.bkt.clouddn.com/';
    routerMode = 'hash'
} else {
    baseUrl = 'https://mainsite-restapi.ele.me';
    routerMode = 'hash'
}

export {
    baseUrl,
    routerMode,
    imgBaseUrl,
    baseImgPath,
    api_url,
    imgPath
}
