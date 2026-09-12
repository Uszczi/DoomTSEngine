
# GetApiMapByName200Response


## Properties

Name | Type
------------ | -------------
`name` | string
`vertices` | [Array&lt;GetApiMapByName200ResponseVerticesInner&gt;](GetApiMapByName200ResponseVerticesInner.md)
`linedefs` | [Array&lt;GetApiMapByName200ResponseLinedefsInner&gt;](GetApiMapByName200ResponseLinedefsInner.md)
`things` | [Array&lt;GetApiMapByName200ResponseThingsInner&gt;](GetApiMapByName200ResponseThingsInner.md)
`bounds` | [GetApiMapByName200ResponseBounds](GetApiMapByName200ResponseBounds.md)

## Example

```typescript
import type { GetApiMapByName200Response } from ''

// TODO: Update the object below with actual values
const example = {
  "name": null,
  "vertices": null,
  "linedefs": null,
  "things": null,
  "bounds": null,
} satisfies GetApiMapByName200Response

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as GetApiMapByName200Response
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


