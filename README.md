# didyoumean3

> 1.0.0 beta, i will update in future.

notice: The algorithm is a bit weird on strings less than 2 in length, and I'm still looking for a solution

## usage

```js
type Options = {
  ignore?: boolean, // 'A' -> 'a'
  trim?: boolean, // ' A' -> 'A'
  normalize?: boolean, // '😄' -> '😄'.normalize()
  key?: string | GetVal // string key when you pass a object list, or a function with param the object item
}
didyoumean3(input: string, list: string[] | object[], options: Options)
```

**for example**:

```js
import { didyoumean3 } from 'didyoumean3'

let input = 'insargrm'
let list = ['dasd', 'facebook', 'twitter', 'instagram', 'linkedin'];

didyoumean3(input, list)
// output
//  {
//    first: 'instagram',
//    matches: [{"score": 0.35294117647058826, "target": "instagram"}, {"score": 0.125, "target": "linkedin"}...]
//  }

// also you can pass a object list
list = [{id: 'facebook'}, {id: 'twitter'}, ...]
didyoumean3(input, list, {key: 'id'})
 
```
