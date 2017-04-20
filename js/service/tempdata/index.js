import * as home from './home'
import * as city from './city'
import * as msite from './msite'
import * as search from './search'
import * as food from './food'
import * as shop from './shop'
import * as login from './login'
import * as confirm from './confirm'
import * as order from './order'
import * as service from './service'
import * as addDetail from './addDetail'
import * as addresspart from './address'
import * as vip from './vip'
import * as hongbao from './hongbao'

import { objectValueToString } from '../../util'
import _ from 'lodash'
//初始化数据到websqldb
//import da from '../websql-da'
//let city = _(home.groupcity).values().flatten().map(o => {
//	o.hotcity = home.hotcity.some(h => h.id === o.id)
//	o.default_city = o.id === home.guesscity.id
//	return o
//}).uniqBy('id').value()
//da.createTable('city', Object.keys(city[0]))
//da.addRows('city', city)
//
//let location = city.searchData
//da.createTable('location', Object.keys(location[0]))
//da.addRows('location', location)
//
//let food_type = msite.foodTypes
//da.createTable('food_type', Object.keys(food_type[0]))
//da.addRows('food_type', food_type)
//
//let shoplist = _(msite.shopList).map(objectValueToString).value()
//da.createTable('shop', Object.keys(shoplist[0]))
//da.addRows('shop', shoplist) 

let cityGuess = () => Promise.resolve(home.guesscity)
let hotcity = () => Promise.resolve(home.hotcity)
let groupcity = () => Promise.resolve(home.groupcity)
let currentcity = number => Promise.resolve(city.currentcity)
let searchplace = (cityid, value) => Promise.resolve(city.searchdata)
let msiteAdress = geohash => Promise.resolve(msite.msiteAdress)
let msiteFoodTypes = geohash => Promise.resolve(msite.foodTypes)
let shopList = (latitude, longitude, offset) => Promise.resolve(msite.shopList)
let searchRestaurant = (geohash, keyword) => Promise.resolve(search.searchData)
let foodCategory = (latitude, longitude) => Promise.resolve(food.category)
let foodDelivery = (latitude, longitude) => Promise.resolve(food.delivery)
let foodActivity = (latitude, longitude) => Promise.resolve(food.activity)
let shopDetails = (shopid, latitude, longitude) => Promise.resolve(shop.shopDetails)
let foodMenu = restaurant_id => Promise.resolve(shop.shopMenu)
let getRatingList = (offset, tag_name = '') => Promise.resolve(shop.ratingList)
let ratingScores = shopid => Promise.resolve(shop.scores)
let ratingTags = shopid => Promise.resolve(shop.tage)
let mobileCode = phone => Promise.resolve(login.validate_token)

let accountLogin = (username, password, captcha_code) => Promise.resolve(login.userInfo)
let checkExsis = (checkNumber, type) => Promise.resolve(login.checkExsis)
let sendMobile = (sendData, captcha_code, type, password) => Promise.resolve(login.send)
let getcaptchas = () => Promise.resolve(login.cpatchs)

let checkout = (geohash, entities) => Promise.resolve(confirm.checkout)
let getRemark = (id, sig) => Promise.resolve(confirm.remark)
let getAddress = (id, sig) => Promise.resolve(confirm.addressList)
let searchNearby = keyword => Promise.resolve(confirm.searchAddress)
let postAddAddress = (userId, address, address_detail, geohash, name, phone, phone_bk, poi_type, sex, tag, tag_type) => Promise.resolve(confirm.addAddress)
let placeOrders = (user_id, cart_id, address_id, description, entities, geohash, sig) => Promise.resolve(confirm.palceOrder)
let rePostVerify = (cart_id, sig, type) => Promise.resolve(confirm.verfiyCode)
let validateOrders = ({
	user_id,
	cart_id,
	address_id,
	description,
	entities,
	geohash,
	sig,
	validation_code,
	validation_token
}) => Promise.resolve(confirm.orderSuccess)
let payRequest = (merchantOrderNo, userId) => Promise.resolve(confirm.payDetail)
let getService = () => Promise.resolve(service.serviceData)
let vipCart = (id, number, password) => Promise.resolve(vip.vipcart)
let getHongbaoNum = id => Promise.resolve(hongbao.dataList)
let getExpired = id => Promise.resolve(hongbao.expired)
let exChangeHongbao = (id, exchange_code, captcha_code) => Promise.resolve(hongbao.exchange)
let getUser = () => Promise.resolve(login.userInfo)
let getOrderList = (user_id, offset) => Promise.resolve(order.orderList)
let getOrderDetail = (user_id, orderid) => Promise.resolve(order.orderDetail)
let getAddressList = (user_id) => Promise.resolve(addresspart.address)
let getSearchAddress = (keyword) => Promise.resolve(addDetail.addData)
let deleteAddress = (userid, addressid) => Promise.resolve(vip.vipcart)
let sendLogin = (code, mobile, validate_token) => Promise.resolve(login.userInfo)

export {
	cityGuess,
	hotcity,
	groupcity,
	currentcity,
	searchplace,
	msiteAdress,
	msiteFoodTypes,
	shopList,
	searchRestaurant,
	foodCategory,
	foodDelivery,
	foodActivity,
	shopDetails,
	foodMenu,
	getRatingList,
	ratingScores,
	ratingTags,
	mobileCode,
	accountLogin,
	checkExsis,
	sendMobile,
	checkout,
	getRemark,
	getAddress,
	getcaptchas,
	searchNearby,
	postAddAddress,
	placeOrders,
	rePostVerify,
	validateOrders,
	payRequest,
	getService,
	vipCart,
	getHongbaoNum,
	getExpired,
	exChangeHongbao,
	getUser,
	sendLogin,
	getOrderList,
	getOrderDetail,
	getAddressList,
	getSearchAddress,
	deleteAddress
}