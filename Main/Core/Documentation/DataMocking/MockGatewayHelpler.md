# `MockGatewayHelper` Class/Namespace 

The <def>gateway</def> is the **Clean Architecture** context is the polymorphic interface defines the basic transactions 
  with the entities.
It is critical to keep gateways not coupled with any frameworks and/or databased, the one implementations may be replaced
  with another implementation or same gateway.
Particularly, the implementations exchanging by data with the database (local or remote one) may be replaced with mock 
  implementations.

Also, mocking the data, usually we need more that just the data.
Additionally, we may need to:

+ Simulate the data retrieving state, herewith adjust the time (for example, to check is loading placeholder displays correctly)
+ Simulate the data retrieving failure to check does application handle the error correctly.

The `MockGatewayHelper` can take care about the routines.
It also not required to extend your gateways implementations from `MockGatewayHelper` — just use its static methods.

## Public Static Fields
### `localization`

<dl>

  <dt>Type</dt>
  <dd><code>MockGatewayHelper.Localization</code></dd>

  <dt>Is required</dt>
  <dd>Yes</dd>

  <dt>Default Value<dt>
  <dd><code>mockGatewayHelperLocalization__english</code></dd>

</dl>

Used for generating of the messages to output them to console.
Although the English reading skills are required in software development, the usage of native language will make 
  professional growing faster for the engineers which are not English native speakers.

```typescript
type Localization = Readonly<{

  generateErrorSimulationCompletedLog: 
      (compoundParameter: Localization.ErrorSimulationCompletedLog.CompoundParameter) => 
          string;

  generateDataRetrievingSimulationCompletedLog: 
      (compoundParameter: Localization.DataRetrievingSimulationCompletedLog.CompoundParameter) => 
          Localization.DataRetrievingSimulationCompletedLog;

  generateDataSubmittingSimulationCompletedLog: 
      (compoundParameter: Localization.DataSubmittingSimulationCompletedLog.CompoundParameter) => 
          Localization.DataSubmittingSimulationCompletedLog;

}>;

namespace Localization {

  export namespace ErrorSimulationCompletedLog {

    export type CompoundParameter =
      
        Readonly<{
          gatewayName: string;
          transactionName: string;
        }>;

  }


  export type DataRetrievingSimulationCompletedLog = Pick<SuccessLog, "title" | "description">;

  export namespace DataRetrievingSimulationCompletedLog {

    export type CompoundParameter =
      
        Readonly<{
          gatewayName: string;
          transactionName: string;
          formattedRequestParameters?: string;
          formattedResponseData?: string;
        }>;

  }


  export type DataSubmittingSimulationCompletedLog = Pick<SuccessLog, "title" | "description">;

  export namespace DataSubmittingSimulationCompletedLog {

    export type CompoundParameter =
      
        Readonly<{
          gatewayName: string;
          transactionName: string;
          formattedRequestData?: string;
          formattedResponseData?: string;
        }>;

  }

}
```

## Public Static Methods
### `simulateDataRetrieving`

```
(
  dataRetrievingSimulationConfiguration: 
      MockGatewayHelper.DataRetrievingSimulationConfiguration<RequestParameters, ResponseData>
) => Promise<ResponseData>
```

Simulates the data retrieving; here the simulation means that your mock data will be returned
  asynchronously (within the period depending on adjusted minimal and maximal value) as when it
  comes from the server.
Additionally, the error can be simulated.

The single parameter has the object type of the following schema:

<dl>

  <dt><code>requestParameters</code></dt>
  <dd>
    <dl>
      <dt>Type</dt>
      <dd>Object</dd>
      <dt>Schema</dt>
      <dd>Generic</dd>
      <dt>Is Required</dt>
      <dd>Yes</dd>
      <dt>Description</dt>
      <dd>Will be used only for logging when the logging is enabled.</dd>
    </dl>
  </dd>

  <dt><code>getResponseData</code></dt>
  <dd>
    <dl>
      <dt>Type</dt>
      <dd>Function</dd>
      <dt>Parameters</dt>
      <dd>No</dd>
      <dt>Return Value</dt>
      <dd>Your response data (intended to be mocked)</dd>
      <dt>Description</dt>
      <dd>
        This function will be executed only when <code>mustSimulateError</code> option set to <code>false</code> 
          or omitted.
      </dd>
    </dl>
  </dd>

  <dt><code>minimalPendingPeriod__seconds</code></dt>
  <dt><code>maximalPendingPeriod__seconds</code></dt>
  <dd>
    <dl>
      <dt>Type</dt>
      <dd>Number</dd>
      <dt>Number Set</dt>
      <dd>Any positive number</dd>
      <dt>Default value</dt>
      <dd>
        <code>1</code> for <code>minimalPendingPeriod__seconds</code> and  
          <code>2</code> for <code>maximalPendingPeriod__seconds</code>
      </dd>
      <dt>Description</dt>
      <dd>
        Used to simulate the asynchronous behavior (delay) during the simulations of data retrieving simulation.
        Actual period will be a random integer, but not smaller than <code>minimalPendingPeriod__seconds</code>
          and not greater than <code>maximalPendingPeriod__seconds</code>. 
        <code>getResponseData</code> function will be invoked once this period will elapse.
      </dd>
    </dl>
  </dd>

  <dt><code>mustSimulateError</code></dt>
  <dd>
    <dl>
      <dt>Type</dt>
      <dd>Boolean</dd>
      <dt>Default Value</dt>
      <dd><code>false</code></dd>
      <dt>Description</dt>
      <dd>
        If set to <code>true</code>, then <code>DataRetrievingFailedError</code> will be thrown
          once simulated delay will end, and <code>getResponseData</code> will not be invoked.
        Intended to be used for the testing of how your application will react on data retrieving error.
      </dd>
    </dl>
  </dd>

  <dt><code>mustLogResponseData</code></dt>
  <dd>
    <dl>
      <dt>Type</dt>
      <dd>Boolean</dd>
      <dt>Default Value</dt>
      <dd><code>false</code></dd>
      <dt>Description</dt>
      <dd>
        If set to <code>true</code>, then formatted response data will be output to console. 
        Note that this fromatted data may to loo large and possibly truncated by the console.
      </dd>
    </dl>
  </dd>

  <dt><code>gatewayName</code></dt>
  <dd>
    <dl>
      <dt>Type</dt>
      <dd>String</dd>
      <dt>Minimal Characters Count</dt>
      <dd>Not strictly limited but should be as many as represents the meaningful class name</dd>
      <dt>Description</dt>
      <dd>
        Used for logging only.
        Basically the name of class related with exchage of specifc data and implementing the specific gateawy interface,
          e. g. <code>ProductMockGateway</code>, <code>UserMockGateway</code> etc.  
      </dd>
    </dl>
  </dd>

  <dt><code>transactionName</code></dt>
  <dd>
    <dl>
      <dt>Type</dt>
      <dd>String</dd>
      <dt>Minimal Characters Count</dt>
      <dd>Not strictly limited but should be as many as represents the meaningful class name</dd>
      <dt>Description</dt>
      <dd>
        Used for logging only.
        Basically the name of function/method which retrieving the data, or the name of transaction, e. g.
          "productRetrieving", "Retrieving of User By ID" etc.
      </dd>
    </dl>
  </dd>

</dl>


### `simulateDataSubmitting`

```
(
  dataSubmittingSimulationConfiguration: 
      MockGatewayHelper.DataSubmittingSimulationConfiguration<RequestData, ResponseData>
) => Promise<ResponseData>
```

Simulates the data submitting and, optionally, retrieving of response data; here the simulation means that your mock 
  data will be returned asynchronously (within the period depending on adjusted minimal and maximal value) as when it
  comes from the server.
Additionally, the error can be simulated.

Well, this method doing same this as `simulateDataRetrieving` - the difference is the naming rather than
  behavior.
For instance, the argument of `simulateDataRetrieving` has `requestParameters` property while the
  argument of `simulateDataSubmitting` has `requestData` property.
The logging message also will be a little bit different.

The single parameter has the object type of the following schema:

<dl>

  <dt><code>requestData</code></dt>
  <dd>
    <dl>
      <dt>Type</dt>
      <dd>Object</dd>
      <dt>Schema</dt>
      <dd>Generic</dd>
      <dt>Is Required</dt>
      <dd>Yes</dd>
      <dt>Description</dt>
      <dd>Will be used only for logging when the logging is enabled.</dd>
    </dl>
  </dd>

  <dt><code>getResponseData</code></dt>
  <dd>
    <dl>
      <dt>Type</dt>
      <dd>Function</dd>
      <dt>Parameters</dt>
      <dd>No</dd>
      <dt>Return Value</dt>
      <dd>Your response data (intended to be mocked)</dd>
      <dt>Description</dt>
      <dd>
        This function will be executed only when <code>mustSimulateError</code> option set to <code>false</code> 
           or omitted.
        If the transaction intended only to submit the data but not expect any response data, return the null, or empty
          array, or like.
      </dd>
    </dl>
  </dd>

  <dt><code>minimalPendingPeriod__seconds</code></dt>
  <dt><code>maximalPendingPeriod__seconds</code></dt>
  <dd>
    <dl>
      <dt>Type</dt>
      <dd>Number</dd>
      <dt>Number Set</dt>
      <dd>Any positive number</dd>
      <dt>Default value</dt>
      <dd>
        <code>1</code> for <code>minimalPendingPeriod__seconds</code> and  
          <code>2</code> for <code>maximalPendingPeriod__seconds</code>
      </dd>
      <dt>Description</dt>
      <dd>
        Used to simulate the asynchronous behavior (delay) during the data submitting simulation.
        Actual period will be a random integer, but not smaller than <code>minimalPendingPeriod__seconds</code>
          and not greater than <code>maximalPendingPeriod__seconds</code>. 
        <code>getResponseData</code> function will be invoked once this period will elapse.
      </dd>
    </dl>
  </dd>

  <dt><code>mustSimulateError</code></dt>
  <dd>
    <dl>
      <dt>Type</dt>
      <dd>Boolean</dd>
      <dt>Default Value</dt>
      <dd><code>false</code></dd>
      <dt>Description</dt>
      <dd>
        If set to <code>true</code>, then <code>DataSubmittingFailedError</code> will be thrown
          once simulated delay will end, and <code>getResponseData</code> will not be invoked.
        Intended to be used for the testing of how your application will react on data submitting error.
      </dd>
    </dl>
  </dd>

  <dt><code>mustLogResponseData</code></dt>
  <dd>
    <dl>
      <dt>Type</dt>
      <dd>Boolean</dd>
      <dt>Default Value</dt>
      <dd><code>false</code></dd>
      <dt>Description</dt>
      <dd>
        If set to <code>true</code>, then formatted response data will be output to console.
        Note that this fromatted data may to loo large and possibly truncated by the console.
      </dd>
    </dl>
  </dd>

  <dt><code>gatewayName</code></dt>
  <dd>
    <dl>
      <dt>Type</dt>
      <dd>String</dd>
      <dt>Minimal Characters Count</dt>
      <dd>Not strictly limited but should be as many as represents the meaningful class name</dd>
      <dt>Description</dt>
      <dd>
        Used for logging only.
        Basically the name of class related with exchage of specifc data and implementing the specific gateawy interface,
          e. g. <code>ProductMockGateway</code>, <code>UserMockGateway</code> etc.
      </dd>
    </dl>
  </dd>

  <dt><code>transactionName</code></dt>
  <dd>
    <dl>
      <dt>Type</dt>
      <dd>String</dd>
      <dt>Minimal Characters Count</dt>
      <dd>Not strictly limited but should be as many as represents the meaningful class name</dd>
      <dt>Description</dt>
      <dd>
        Used for logging only.
        Basically the name of function/method which retrieving the data, or the name of transaction, e. g.
          "productAdding", "Updating of User By ID" etc.
      </dd>
    </dl>
  </dd>

</dl>
