# ropemaker
## Roid-rage for making strings
### Factories for type-safe string generation

```ts
import ropemaker, { string, number } from `ropemaker`

const cord = ropemaker`
	Alright!
	Put your ${string} on
`
const cable = ropemaker`
	Baby I've been cutting coupons ${string}
	And might I say that you are looking so ${string}, ${string}
`
const hawser = ropemaker`
	Shake it ${string`duration`}
	Rock it like you're ${number`age`}
	Make it ${string`adjective`}, busting back on the ${string`location`}
`

const ropes = [
	cord('glasses'),
	cable('lately', 'fine', 'girl'),
	hawser({
		adjective: 'alright',
		age: 18,
		duration: 'all night',
		location: 'street',
	}),
].join('\n') === `
	Alright!
	Put your glasses on
	Baby I've been cutting coupons lately
	And might I say that you are looking so fine, girl
	Shake it all night
	Rock it like you're 18
	Make it alright, busting back on the street
`
