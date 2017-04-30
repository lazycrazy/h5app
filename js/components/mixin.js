import {
    imgBaseUrl
} from 'src/env'



import {
    getStyle
} from 'src/util'

import _ from 'lodash'

export const loadMore = {
    directives: {
        'load-more': {
            bind: (el, binding) => {
                let loading = false
                    //下面隐藏部分少于20
                const lowEnough = () => {
                    let pageHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight)
                    let viewportHeight = window.innerHeight ||
                        document.documentElement.clientHeight ||
                        document.body.clientHeight || 0
                    let scrollTopHeight = window.pageYOffset ||
                        document.documentElement.scrollTop ||
                        document.body.scrollTop || 0
                        // console.log(pageHeight, viewportHeight, scrollTopHeight, pageHeight - viewportHeight - scrollTopHeight)
                    return pageHeight - viewportHeight - scrollTopHeight < 70
                }
                el.listener = _.throttle(() => {
                    if (loading) return
                    if (lowEnough()) {
                        loading = true
                        binding.value().then(
                            () => loading = false)
                    }
                }, 200)
                document.addEventListener('scroll', el.listener, false)
            },
            unbind: (el) => {
                document.removeEventListener('scroll', el.listener, false)
            }
        }
    }
}



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
