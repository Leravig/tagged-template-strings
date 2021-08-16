type UnspliceTuple<T> = {
	[K in keyof T]: (
		T[K] extends Splice<infer X>
		? (unknown extends X ? never : X)
		: never
	)
}

type RespliceTuple<T> = {
	[K in keyof T]: (
		T[K] extends Splice<infer X>
		? (Splice<X> extends Splice<unknown> ? `(data: Not<never>) => string` : Splice<X>)
		: Splice<unknown>
	)
}

export type Interpolatable = { toString: () => string }
type Splice<T> = (data : T) => Interpolatable

export default function ropemaker<
	T extends Splice<never>[],
	S extends RespliceTuple<T>,
> (
	strings : TemplateStringsArray,
	...slots : T extends S ? T : S
) {
	const out = new Array<string|Splice<T>|null>(strings.length + slots.length).fill(null)
	strings.forEach((s, i) => out[i*2] = s)

	return (...interpolations : UnspliceTuple<T>) => out.map(item => typeof item === 'string' ? item : interpolations.shift()).join('')
}
