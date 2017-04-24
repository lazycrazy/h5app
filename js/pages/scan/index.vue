<template>
	<div>
		<div id="bcid">
		</div>
		<div id="btns">
			<input type="button" @click="beginScan" id="start" value="重新扫描" />
			<input type="button" @click="stopScan" id="stop" value="中止扫描" />
			<input type="button" @click="openData" id="open" value="打开数据库" />
			<input type="button" @click="insertData" id="insert" value="插入数据" />
			<input type="button" @click="readData" id="read" value="读取数据" />
		</div>
		<label>信息：</label>
		<p id="result">{{ msg }}</p>
	</div>
</template>

<script>
	export default {
		name: 'scan',
		data() {
			return {
				msg: 'Welcome ',
				scan: null,
				db: null
			}
		},
		methods: {
			onmarked: function(type, result, file) {
				switch(type) {
					case plus.barcode.QR:
						type = 'QR';
						break;
					case plus.barcode.EAN13:
						type = 'EAN13';
						break;
					case plus.barcode.EAN8:
						type = 'EAN8'
						break;
					default:
						type = '其它' + type;
						break;
				}
				result = result.replace(/\n/g, '');
				this.msg += 'type: ' + type + '\n result: ' + result + '\n ';
			},
			beginScan: function() {
				this.scan.start({
					vibrate: true
				})
				this.msg += '\n' + '开始扫描'
			},
			stopScan: function() {
				this.scan.cancel()
				this.msg += '\n' + '中止扫描';
			},
			insertData: function() {
				if(!this.db)
					this.openData();
				this.db.transaction((context) => {
					try {
						context.executeSql('CREATE TABLE IF NOT EXISTS testTable1 (id, name)');
						for(var i = 0; i < 10; i++) {
							var sql = 'INSERT INTO testTable1 (id, name) VALUES (?, ?)'
							context.executeSql(sql, [i, "sam" + i]);
							this.msg += '\n' + sql;
						}
					} catch(e) {
						alert(e.message ? e.message : e.toString())
					}
				});
			},
			openData: function() {
				try {
					this.db = openDatabase('testdb1', '1.0', 'test DB', 20 * 1024 * 1024);
				} catch(err) {
					alert(err.message ? err.message : err.toString());  
				}
			},

			readData: function() {
				if(!this.db)
					this.openData();

				this.db.readTransaction((context) => {
					this.msg += '\n' + '开始读取数据';
					context.executeSql('SELECT * FROM testTable1', [], (context, results) => {
						try {
							var len = results.rows.length,
								i;
							this.msg += '\n 读取到' + len + "条数据";
							for(i = 0; i < len; i++) {
								this.msg += '\n 读取到' + 'id: ' + results.rows.item(i).id + '  name: ' + results.rows.item(i).name
							}
							this.msg += '\n 读取结束';
						} catch(err) {
							alert(err.message ? err.message : err.toString());  
						}
					}, (tx, err) => {              
						alert(err.message ? err.message : err.toString());  
					});
				});

			}
		},
		mounted: function() {
			if(window.plus) {
				this.scan = new plus.barcode.Barcode('bcid')
				this.scan.onmarked = this.onmarked;
				this.scan.start({
					vibrate: true
				})
			} else
				document.addEventListener('plusready', () => {
					this.scan = new plus.barcode.Barcode('bcid')
					this.scan.onmarked = this.onmarked;
					this.scan.start({
						vibrate: true
					})
				}, false);
		},
		beforeDestroy: function() {
			if(this.scan) {
				this.scan.close();
				this.scan = null;
			}
		}
	}
</script>

<style scoped>
	#bcid {
		background: #FFFFFF;
		width: 100%;
		height: 230px;
	}
	
	#result {
		width: 100%;
		height: 50px;
	}
	
	input[type=button] {
		width: 140px;
		height: 40px;
		user-select: none;
	}
	
	#btns {
		width: 100%;
		height: 120px;
		text-align: center;
		box-sizing: border-box;
		padding: 0px, 10px, 0px, 20px;
	}
</style>