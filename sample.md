```js - client
const person = {
  name: "Bob",
  age: 31,
};

// api() is an axios extended function that adds the auth header to the API call
api().post(serverUrl + "/set-object", {object: person, type: 'createOrUpdate'})...
```

```ts - server
app.post("/set-object", (req: Request, res: Response): void => {
  // todo - verify auth with req.headers and firebase-admin
  const {objectName, object, type} = req.body
  // abstract to universal updateDbFunction
  switch (type) {
    case 'createIfNew':
      // only create the object if it doesn't already exist
      break;
    case 'createOrReplace':
      // if exists - replace object, else create new object
      break;
    case 'updateAndAppend':
      // update existing keys and add new keys
      break;
    case 'deleteObject':
      // update existing keys and add new keys
      break;
    default:
      const error = {...}
      res.json(error)
      break;
  }
})

app.post("/set-key", (req: Request, res: Response) => {...})
```
