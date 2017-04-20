export function isPrimitive(value) {

	return value == null || (typeof value !== 'object' && typeof value !== 'function')

}

export function objectValueToString(s) {
	for(let v in Object.values(s)) {
		if(!isPrimitive(v)) {
			v = JSON.stringify(v)
		}
	}
	return s
}