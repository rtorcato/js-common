// React example

// useEffect(() => {
//     const controller = new AbortController()

//     window.addEventListener('resize', handleResize, {
//       signal: controller.signal,
//     })
//     window.addEventListener('hashchange', handleHashChange, {
//       signal: controller.signal,
//     })
//     window.addEventListener('storage', handleStorageChange, {
//       signal: controller.signal,
//     })

//     return () => {
//       // Calling `.abort()` removes ALL event listeners
//       // associated with `controller.signal`. Gone!
//       controller.abort()
//     }
//   }, [])
