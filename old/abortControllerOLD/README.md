[](https://kettanaito.com/blog/dont-sleep-on-abort-controller)

```javascript

const controller = new AbortController()

window.addEventListener('resize', listener, { signal: controller.signal })

controller.abort()
```