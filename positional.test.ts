import test from 'ava'
import ropemaker, { Interpolatable } from './positional.js'

//

function any (data : Interpolatable) {
	return data
}

function string (data : string) {
	return data
}

function number (data : number) {
	return data
}

//

test('simple string without interpolation', t => {
	const rope = ropemaker`I'm a simple string`
	t.is(
		rope(),
		'I\'m a simple string'
	)
})

test('string with a simple interpolation', t => {
	const rope = ropemaker`I'm an ${string} string`
	t.is(
		rope('interpolated'),
		'I\'m an interpolated string'
	)
})

test('string with multiple interpolations', t => {
	const rope = ropemaker`I'm an ${string} string ${string} ${string} ${string}`
	t.is(
		rope('interpolated', 'several', 'times', 'over'),
		'I\'m an interpolated string several times over'
	)
})

test('string with typed interpolations', t => {
	const rope = ropemaker`I'm an ${any} string ${number} ${string} ${(_?: undefined) => 'over'}`
	t.is(
		rope({toString: ()=>'interpolated'}, 7, 'times', undefined),
		'I\'m an interpolated string 7 times over'
	)
})
