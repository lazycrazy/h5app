import axios from 'axios'
import qs from 'querystring'

let qq_map_key = 'M5EBZ-PKUW5-JLTI5-QSBZ2-DIO6T-JLBB5'

let url_ip = 'http://apis.map.qq.com/ws/location/v1/ip'
let url_place = 'http://apis.map.qq.com/ws/place/v1/search'

// let url_get_ip = 'http://1212.ip138.com/ic.asp'

// let ip = axios.get(url_get_ip).then(res => console.log(res.data.match(/((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)/)[0]))

// import os from 'os'

// function getLocalIP() {
//     var map = [];
//     var ifaces = os.networkInterfaces();
//     console.log(ifaces);
//     for (var dev in ifaces) {
//         if (dev.indexOf('eth0') != -1) {
//             var tokens = dev.split(':');
//             var dev2 = null;
//             if (tokens.length == 2) {
//                 dev2 = 'eth1:' + tokens[1];
//             } else if (tokens.length == 1) {
//                 dev2 = 'eth1';
//             }
//             if (null == ifaces[dev2]) {
//                 continue;
//             }
//             // 找到eth0和eth1分别的ip
//             var ip = null,
//                 ip2 = null;
//             ifaces[dev].forEach(function(details) {
//                 if (details.family == 'IPv4') {
//                     ip = details.address;
//                 }
//             });
//             ifaces[dev2].forEach(function(details) {
//                 if (details.family == 'IPv4') {
//                     ip2 = details.address;
//                 }
//             });
//             if (null == ip || null == ip2) {
//                 continue;
//             }
//             // 将记录添加到map中去
//             if (ip.indexOf('10.') == 0 ||
//                 ip.indexOf('172.') == 0 ||
//                 ip.indexOf('192.') == 0) {
//                 map.push({ "intranet_ip": ip, "internet_ip": ip2 });
//             } else {
//                 map.push({ "intranet_ip": ip2, "internet_ip": ip });
//             }
//         }
//     }
//     return map;
// }
// console.log(getLocalIP());


async function getLocationByIP(ip) {
    let params = {
        key: qq_map_key
    }
    if (ip)
        params.ip = ip
    try {
        let res = await axios.get(url_ip + '?' + qs.stringify(params))
        return res.data
    } catch (ex) {
        throw ex
    }

}
// getLocationByIP().then(res => console.log(res.data))


async function searchPlace(keyword, cityname) {
    let params = {
        key: qq_map_key,
        keyword: encodeURIComponent(keyword),
        boundary: `region(${encodeURIComponent(cityname)},0)`,
        page_size: 10
    }
  
   try {
        let res = await axios.get(url_place + '?' + qs.stringify(params))
        return res.data
    } catch (ex) {
        throw ex
    }
}

export default {
    getLocationByIP,searchPlace
}
