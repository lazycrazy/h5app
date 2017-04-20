class DB {
	constructor(dbobject) {
		this.db = dbobject;
	}
	executeSql(query, args) {
		var that = this;
		return new Promise(function(resolve, reject) {
			that.db.transaction(function(t) {
					t.executeSql(query, args,
						function(tx, results) {
							Object.prototype.toString.call(results) === '[object SQLError]' ?
								reject(results) : resolve(results)
						},
						//  function(e) {
						function(tx, err) {
							console.log(err);
							reject(err);
						})
				},
				function(err) {
					console.log(err);
					reject(err);
				})
		})
	}
	executeBatchSql(query, args) {
		var that = this;
		return new Promise(function(resolve, reject) {
			that.db.transaction(function(t) {
					for(let arg of args)
						t.executeSql(query, arg,
							function(tx, results) {
								Object.prototype.toString.call(results) === '[object SQLError]' ?
									reject(results) : resolve(results)
							},
							//  function(e) {
							function(tx, err) {
								console.log(err);
								reject(err);
							})
				},
				function(err) {
					console.log(err);
					reject(err);
				})
		})
	}
	sqlIterator(rows) {
		return new SQLIterator(rows);
	}
}

class SQLIterator {
	constructor(rows) {
			this.rows = rows
		}
		*[Symbol.iterator]() {
			for(var i = 0, l = this.rows.length; i < l; i++) {
				yield this.rows.item(i)
			}
		}
}

export default DB;