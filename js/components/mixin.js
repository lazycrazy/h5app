import {
    imgBaseUrl
} from 'src/env'

export const getImagePath = {
    methods: {
        getImagePath(path) {
            if (!path)
                return 'http://test.fe.ptdev.cn/elm/elmlogo.jpeg'
            let suffix = path.includes('jpeg') ? '.jpeg' : '.png'
            let url = `/${path.substr(0, 1)}/${path.substr(1, 2)}/${path.substr(3)}${suffix}`
            return imgBaseUrl + url
        }
    }
}
