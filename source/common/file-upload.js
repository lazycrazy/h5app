


import axios from 'axios'
import qs from 'querystring'

let qq_map_key = 'M5EBZ-PKUW5-JLTI5-QSBZ2-DIO6T-JLBB5'

let url_ip = 'http://apis.map.qq.com/ws/location/v1/ip'
let url_place = 'http://apis.map.qq.com/ws/place/v1/search' 


async function uploadImg(keyword, cityname) {
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
     uploadImg
}
