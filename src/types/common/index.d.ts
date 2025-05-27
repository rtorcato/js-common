/** Prettify a type for better intellisense */
export type Prettify<T> = { [K in keyof T]: T[K] } & {}

// export type Prettify<T> = {
// 	[K in keyof T]: T[K]
// }

/** Merge two types, with B overriding A */
export type Merge<A, B> = Omit<A, keyof B> & B
