# DefaultApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**getApiMapByName**](DefaultApi.md#getapimapbyname) | **GET** /api/map/{name} |  |
| [**getApiMaps**](DefaultApi.md#getapimaps) | **GET** /api/maps |  |



## getApiMapByName

> GetApiMapByName200Response getApiMapByName(name)



Parse a map by name

### Example

```ts
import {
  Configuration,
  DefaultApi,
} from '';
import type { GetApiMapByNameRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new DefaultApi();

  const body = {
    // string
    name: name_example,
  } satisfies GetApiMapByNameRequest;

  try {
    const data = await api.getApiMapByName(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **name** | `string` |  | [Defaults to `undefined`] |

### Return type

[**GetApiMapByName200Response**](GetApiMapByName200Response.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Parsed map data |  -  |
| **400** | Validation Error |  -  |
| **404** | Map not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getApiMaps

> Array&lt;string&gt; getApiMaps()



List all map names

### Example

```ts
import {
  Configuration,
  DefaultApi,
} from '';
import type { GetApiMapsRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new DefaultApi();

  try {
    const data = await api.getApiMaps();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

This endpoint does not need any parameter.

### Return type

**Array<string>**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Map names |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

