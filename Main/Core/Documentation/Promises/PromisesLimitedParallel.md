// Documentation/Promises/PromisesLimitedParallel.md

# `PromisesLimitedParallel` Class

Runs the promises in parallel herewith limits the number of simultaneously executed promises with the queuing
  of remain promises.


## Problematics

The `Promise.all()` introduced in [ECMAScript® 2027](https://tc39.es/ecma262/multipage/control-abstraction-objects.html#sec-promise.all)
  and [other promises concurrency methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise#promise_concurrency) 
  is the significant API provides the parallelization.
However, the running of large number of promises in parallel may cause the problems.
In such cases, the combination of parallels and queues allows to adjust the stress of the system resources.
It is exactly what `PromisesLimitedParallel` class has been designed for.


## Constructor

Accepts the single parameter of object type with the following properties.
Does not start the execution of specified asynchronous functions.

<dl>

  <dt><code>initialAsynchronousFunctions</code></dt>
  <dd>
    <dl>
      <dt>Type</dt>
      <dd>Array</dd>
      <dt>Element Type</dt>
      <dd>Asynchronous function of any signature</dd>
      <dt>Is Required</dt>
      <dd>No</dd>
      <dt>Description</dt>
      <dd>
        The asynchronous functions which will be stored immideately but not ivoke them yet.
        You can always add more asynchronous functions by <code>enqueueAsynchronousFunctions</code> method.
      </dd>
    </dl>
  </dd>

  <dt><code>maximalParallelPromisesCount</code></dt>
  <dd>
    <dl>
      <dt>Type</dt>
      <dd>Number</dd>
      <dt>Number Set</dt>
      <dd>Natural Number</dd>
      <dt>Is Required</dt>
      <dd>Yes</dd>
      <dt>Description</dt>
      <dd>
        The maximal number of simultaniously exeucted promises.
        If something except a natural number will be specified, the <code>InvalidParameterValueError</code> will be thrown.
        This limitation is the main feature of <code>PromisesLimitedParallel</code> class.
      </dd>
    </dl>  
  </dd>

  <dt><code>mustClearNotExecutedFunctionsQueueIfErrorOccurred</code></dt>
  <dd>
    <dl>
      <dt>Type</dt>
      <dd>Boolean</dd>
      <dt>Is Required</dt>
      <dd>Yes</dd>
      <dt>Description</dt>
      <dd>
        Specifies must the execution of queued promised be canceleld or no when some promises has fail with error.
        In any case it will not stop the asynchronous functions which are aleady being executed.
      </dd>
    </dl>
  </dd>

  <dt><code>onAllPromisesSettled</code></dt>
  <dd>
    <dl>
      <dt>Type</dt>
      <dd>Function</dd>
      <dt>Parameters</dt>
      <dd>No</dd>
      <dt>Return Value</dt>
      <dd>No limitations but basically no return value</dd>
      <dt>Is Required</dt>
      <dd>No</dd>
      <dt>Description</dt>
      <dd>
        If specified then will be called once all promises will be settled whether fulfilled or rejected.
      </dd>
    </dl>
  </dd>

  <dt><code>onPromiseRejected</code></dt>
  <dd>
    <dl>
      <dt>Type</dt>
      <dd>Function</dd>
      <dt>Parameters</dt>
      <dd>
        <dl>
          <dt>Generic Name</dt>
          <dd>error</dd>
          <dt>Type</dt>
          <dd>Unknown</dd>
          <dt>Schema<dt>
          <dt>Is Required</dt>
          <dd>True</dd>
        </dl>
      </dd>
      <dt>Return Value</dt>
      <dd>No limitations but basically no return value</dd>
      <dt>Description</dt>
      <dd>If specified then will be invoked when specific promise will be rejected.</dd>
    </dl>
  </dd>

</dl>


## Public Methods

### `startExecutionIfHasNotStartedYet`

```
(
  newAsynchronousFunctions?: Array<() => Promise<unknown>>
) => PromisesLimitedParallel
```

Obviously from method's name, starting execution if execution has not stared yet.

Optionally, new asynchronous functions can be passed.
Even if executing in progress, these new function will be enqueued.


### `enqueueAsynchronousFunctions`

```
(
  newAsynchronousFunctions: Array<() => Promise<unknown>>
) => void
```

Obviously from method's name, enqueuing the asynchronous functions.

This method does not start the execution of asynchronous functions.
To start the execution, the `startExecutionIfHasNotStartedYet` method must be invoked.


## Public Getters

### `isExecutingNow`

<dl>

  <dt>Type</dt>
  <dd>Boolean</dd>

  <dt>Is undefined/null Possible</dt>
  <dd>No</dd>

</dl>

Intended to used for checking does asynchronous functions are being executing now.


### `currentlyExecutedFunctionsCount`

<dl>

  <dt>Type</dt>
  <dd>Number</dd>

  <dt>Numbers set</dt>
  <dd>Natural Number</dd>

  <dt>Is undefined/null Possible</dt>
  <dd>No</dd> 

</dl>

Indicated how many functions are been executed now.
This number can not be greater than `maximalParallelPromisesCount`, the option defined via contructor.


### `queuedFunctionsCount`

<dl>

  <dt>Type</dt>
  <dd>Number</dd>

  <dt>Numbers set</dt>
  <dd>Natural Number</dd>

  <dt>Is undefined/null Possible</dt>
  <dd>No</dd> 

</dl>

Indicated how many functions are enqueued (not being executed now).



## Example

Let us set `3` as maximal number of parallel promises and prepare the following functions:

|Function Number   | Executing Duration (Seconds)  |
|---|---|
| #1-1  | 4  |
| #1-2  | 2  |
| #1-3  | 2  |
| #2-1  | 2  |
| #2-2  | 2  |


Additionally, once `3` second passed, we will enqueue 2 function, both with 2 second duration. 
The expected flow will be as in the picture below:

[//]: # (Waiting for the picture)

```typescript
import { secondsToMilliseconds } from "../../../Source";
import PromisesLimitedParallel from "../../../Source/Promises/PromisesLimitedParallel";


/* eslint-disable-next-line prefer-const --
 * Looks like the ESLint bug - the variable cannot be `const` if not initialized immediately. */
let stopwatch: NodeJS.Timeout;

const promisesLimitedParallel: PromisesLimitedParallel =

    new PromisesLimitedParallel({

      initialAsynchronousFunctions: [

        async (): Promise<void> =>
            new Promise<void>(
              (resolve: () => void): void => {
                setTimeout(
                  (): void => {
                    console.log("Function #1-1, executing complete.");
                    resolve();
                  },
                  secondsToMilliseconds(4)
                );
              }
            ),

        async (): Promise<void> =>
            new Promise<void>(
              (resolve: () => void): void => {
                setTimeout(
                  (): void => {
                    console.log("Function #1-2, executing complete.");
                    resolve();
                  },
                  secondsToMilliseconds(2)
                );
              }
            ),

        async (): Promise<void> =>
            new Promise<void>(
              (resolve: () => void): void => {
                setTimeout(
                  (): void => {
                    console.log("Function #1-3, executing complete.");
                    resolve();
                  },
                  secondsToMilliseconds(2)
                );
              }
            ),

        async (): Promise<void> =>
            new Promise<void>(
              (resolve: () => void): void => {
                setTimeout(
                  (): void => {
                    console.log("Function #2-1, executing complete.");
                    resolve();
                  },
                  secondsToMilliseconds(2)
                );
              }
            ),

        async (): Promise<void> =>
            new Promise<void>(
              (resolve: () => void): void => {
                setTimeout(
                  (): void => {
                    console.log("Function #2-2, executing complete.");
                    resolve();
                  },
                  secondsToMilliseconds(2)
                );
              }
            )

      ],

      maximalParallelPromisesCount: 3,

      mustClearNotExecutedFunctionsQueueIfErrorOccurred: false,

      onAllPromisesSettled(): void { clearTimeout(stopwatch); }

    }).

        startExecutionIfHasNotStartedYet();


let secondsPassed: number = 0;

stopwatch =
    setInterval(
      (): void => {

        secondsPassed++;
        console.log(`${ secondsPassed } s`);

        if (secondsPassed === 3) {

          promisesLimitedParallel.enqueueAsynchronousFunctions([

            async (): Promise<void> =>
                new Promise<void>(
                  (resolve: () => void): void => {
                    setTimeout(
                      (): void => {
                        console.log("Function #3-1, executing complete.");
                        resolve();
                      },
                      secondsToMilliseconds(2)
                    );
                  }
                ),

            async (): Promise<void> =>
                new Promise<void>(
                  (resolve: () => void): void => {
                    setTimeout(
                      (): void => {
                        console.log("Function #3-2, executing complete.");
                        resolve();
                      },
                      secondsToMilliseconds(2)
                    );
                  }
                )

          ]);

        }

      },
      secondsToMilliseconds(1)
    );
```

Although `console.log(`${ secondsPassed } s`);` displays earlier than log from the bodies of above functions,
  the output is fully matching with expectations:

TODO Waiting for Image

[//]: # (TODO Waiting for Image)

