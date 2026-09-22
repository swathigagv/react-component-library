# React Hooks

* **useState** declares a state variable that you can update directly.
* **useReducer** declares a state variable with the update logic inside a reducer function.
* **useContext** reads and subscribes to a context.
* **useRef** declares a ref. You can hold any value in it, but most often it’s used to hold a DOM node.
* **useImperativeHandle** lets you customize the ref exposed by your component. This is rarely used.
* **useEffect** connects a component to an external system.
* **useLayoutEffect** fires before the browser repaints the screen. You can measure layout here.
* **useInsertionEffect** fires before React makes changes to the DOM. Libraries can insert dynamic CSS here.
* **useEffectEvent** creates a non-reactive event to fire from any Effect hook.
* **useMemo** lets you cache the result of an expensive calculation.
* **useCallback** lets you cache a function definition before passing it down to an optimized component.
* **useTransition** lets you mark a state transition as non-blocking and allow other updates to interrupt it.
* **useDeferredValue** lets you defer updating a non-critical part of the UI and let other parts update first.
* **useDebugValue** lets you customize the label React DevTools displays for your custom Hook.
* **useId** lets a component associate a unique ID with itself. Typically used with accessibility APIs.
* **useSyncExternalStore** lets a component subscribe to an external store.
* **useActionState** allows you to manage state of actions.
