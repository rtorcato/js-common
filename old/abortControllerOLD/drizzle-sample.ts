// const db = drizzle(options)

// const controller = new AbortController()
// const transaction = makeCancelableTransaction(db)

// await transaction(
//   async (tx) => {
//     await tx
//       .update(accounts)
//       .set({ balance: sql`${accounts.balance} - 100.00` })
//       .where(eq(users.name, 'Dan'))
//     await tx
//       .update(accounts)
//       .set({ balance: sql`${accounts.balance} + 100.00` })
//       .where(eq(users.name, 'Andrew'))
//   },
//   { signal: controller.signal }
// )

// import { TransactionRollbackError } from 'drizzle-orm'

// function makeCancelableTransaction(db) {
//   return (callback, options = {}) => {
//     return db.transaction((tx) => {
//       return new Promise((resolve, reject) => {
//         // Rollback this transaction if the abort event is dispatched.
//         options.signal?.addEventListener('abort', async () => {
//           reject(new TransactionRollbackError())
//         })

//         return Promise.resolve(callback.call(this, tx)).then(resolve, reject)
//       })
//     })
//   }
// }
