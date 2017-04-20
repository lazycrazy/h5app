import DB from './websql-promise'
import array from 'lodash'

function InitWebSqlDB() {
	let db = openDatabase('test', '1.0', 'test DB', 20 * 1024 * 1024);
	return db;
}

let db = null
if(!db) {
	db = new DB(InitWebSqlDB());
	//	if(db)
	//		createTables()
}

function alertError(err) {
	console.log(err)
	alert(err.message)
}

function createTables() {

	db.executeSql('create table if not exists abcd (cd,name,telephone,address)').catch(alertError)

}

function createTable(tablename, fields) {

	db.executeSql(`create table if not exists ${tablename} (${fields.join()})`).catch(alertError)

}

function addRows(tablename, rows) {
	if(!rows) return;
	if(!Array.isArray(rows))
		rows = [rows]
	let cols = _(rows[0]).keys().value()
	let values = _(row).map(r => _(r).values().value()).value()
	db.executeBatchSql(`insert into ${tablename}(${cols.join()}) values(${Array(cols.length).fill('?').join()})`, values).catch(alertError)
}

function deleteRows(tablename, cdi) {
	let sql = `delete from ${tablename}`,
		values
	if(params) {
		let cdi = _(cdi).keys().map(k => k + '=?').value().join(' and ')
		values = _(cdi).values().value()
		sql += ` where ${cdi}`
	}

	db.executeSql(sql, values).catch(alertError)

}

function updateRows(tablename, nvalues, cdi) {
	let ncdi = _(nvalues).keys().map(k => k + '=?').value().join()
	let nval = _(nvalues).values().value()
	let sql = `update ${tablename} set ${ncdi} `,
		values = nval
	if(cdi) {
		let cdi = _(cdi).keys().map(k => k + '=?').value().join(' and ')
		values = values.concat(_(cdi).values().value())
		sql += ` where ${cdi}`
	}
	db.executeSql(sql, values).catch(alertError)
}
async function getRows(tablename, params) {
	let sql = `select * from ${tablename}`,
		values, rs
	if(params) {
		let cdi = _(params).keys().map(f => f + '=?').join()
		values = _(params).values().value()
		sql += ' where ' + cdi
	}
	try {
		rs = await db.executeSql(sql, values)
		rs = db.sqlIterator(rs.rows)
	} catch(e) {
		alertError(e)
	}
	return rs
}

export default {
	createTable,
	addRows,
	deleteRows,
	updateRows,
	getRows
}