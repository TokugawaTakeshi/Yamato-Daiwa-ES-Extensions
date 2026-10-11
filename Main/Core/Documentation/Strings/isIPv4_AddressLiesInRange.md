# isIPv4AddressLiesInRange

```
(
  compoundParameter: {
    comparedIP_Address: string;
    minimalIP_Address: string;
    maximalIP_Address: string;
  }
): boolean
```

Check does specified IP address lies in specific range.

```typescript
console.log(isIPv4AddressLiesInRange({
  comparedIP_Address: "127.0.0.2",
  minimalIP_Address: "127.0.0.1",
  maximalIP_Address: "127.255.255.254"
})); // => true
```

## Real use cases

This function is being used by [Yamato Daiwa Backend](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Backend) framework
to decide is specified  as parameter of `Server.initializeAndStart` method IP address the **localhost**:   

```typescript
import { Server, Request, Response, ProtocolDependentDefaultPorts } from "@yamato-daiwa/backend";
import { HTTP_Methods } from "@yamato-daiwa/es-extensions";


Server.initializeAndStart({
  IP_Address: "127.0.0.1",
  HTTP: { port: ProtocolDependentDefaultPorts.HTTP },
  routing: [
    {
      route: { HTTP_Method: HTTP_Methods.get, pathTemplate: "/" },
      async handler(request: Request, response: Response): Promise<void> {
        return response.submitWithSuccess({
          HTML_Content: "<h1>Hello, world!</h1>"
        });
      }
    }
  ]
});
```

Thanks to it, the `http://localhost:80/` will work same as `http://127.0.0.1:80/`.
