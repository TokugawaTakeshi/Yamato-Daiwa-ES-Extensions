import { ArbitraryValueFormatter } from "../../../Source";


/* [ Execution ] clear; tsx Tests/Manual/Strings/ArbitraryValueFormatter.test.ts */
const switches: Readonly<{
  string: boolean;
  symbol: boolean;
  number: boolean;
  bigint: boolean;
  boolean: boolean;
  undefined: boolean;
  null: boolean;
  function: boolean;
  date: boolean;
  nativeConstructor: boolean;
  objects: Readonly<{
    empty: boolean;
    nested: boolean;
  }>;
  arrays: Readonly<{
    empty: boolean;
    simple: boolean;
    nestedWithPrimitives: boolean;
    nestedWithObjects: boolean;
  }>;
  sets: {
    empty: boolean;
    simple: boolean;
    nestedWithPrimitives: boolean;
    nestedWithObjects: boolean;
  };
  maps: {
    empty: boolean;
    simple: boolean;
    nestedWithPrimitives: boolean;
    nestedWithObjects: boolean;
  };
}> = {
  string: false,
  symbol: false,
  number: false,
  bigint: false,
  boolean: false,
  undefined: false,
  null: false,
  function: false,
  date: false,
  nativeConstructor: false,
  objects: {
    empty: false,
    nested: false
  },
  arrays: {
    empty: false,
    simple: false,
    nestedWithPrimitives: false,
    nestedWithObjects: false
  },
  sets: {
    empty: false,
    simple: false,
    nestedWithPrimitives: false,
    nestedWithObjects: false
  },
  maps: {
    empty: true,
    simple: true,
    nestedWithPrimitives: true,
    nestedWithObjects: true
  }
};


if (switches.string) {
  console.log("=== String ===================================================================================");
  console.log("FOO");
  console.log(ArbitraryValueFormatter.stringifyAndFormat("FOO"));
}

if (switches.symbol) {
  console.log("=== Symbol ===================================================================================");
  console.log(Symbol("FOO"));
  console.log(ArbitraryValueFormatter.stringifyAndFormat(Symbol("FOO")));
}

if (switches.number) {
  console.log("=== Number ===================================================================================");
  console.log(123);
  console.log(ArbitraryValueFormatter.stringifyAndFormat(123));
}

if (switches.bigint) {
  console.log("=== BigInt ===================================================================================");
  console.log(123n);
  console.log(ArbitraryValueFormatter.stringifyAndFormat(123n));
}

if (switches.boolean) {
  console.log("=== Boolean ==================================================================================");
  console.log(true);
  console.log(ArbitraryValueFormatter.stringifyAndFormat(true));
}

if (switches.undefined) {
  console.log("=== Undefined ================================================================================");
  /* eslint-disable-next-line no-undefined -- For testing purposes */
  console.log(undefined);
  /* eslint-disable-next-line no-undefined -- For testing purposes */
  console.log(ArbitraryValueFormatter.stringifyAndFormat(undefined));
}

if (switches.null) {
  console.log("=== Null =====================================================================================");
  console.log(null);
  console.log(ArbitraryValueFormatter.stringifyAndFormat(null));
}

if (switches.function) {

  console.log("=== Function =================================================================================");
  console.log(
    /* eslint-disable-next-line prefer-arrow-callback -- For testing purposes */
    function sample(): string {
      return "TEST";
    }
  );

  console.log(
    ArbitraryValueFormatter.stringifyAndFormat(

      /* eslint-disable-next-line prefer-arrow-callback -- For testing purposes */
      function sample(): string {
        return "TEST";
      }

    )
  );

}


if (switches.date) {

  console.log("=== Date ====================================================================================");
  const currentMoment: Date = new Date();

  console.log(currentMoment);
  console.log(ArbitraryValueFormatter.stringifyAndFormat(currentMoment));
  console.log({ currentMoment });
  console.log(ArbitraryValueFormatter.stringifyAndFormat({ currentMoment }));

}

if (switches.nativeConstructor) {

  console.log("=== Native Constructor =======================================================================");
  console.log(String);
  console.log(ArbitraryValueFormatter.stringifyAndFormat(String));

}

console.log("=== Objects ====================================================================================");
if (switches.objects.empty) {
  console.log({});
  console.log(ArbitraryValueFormatter.stringifyAndFormat({}));
}


if (switches.objects.nested) {

  const sampleObject1: Readonly<{
    alpha1: string;
    bravo1: number;
    charlie1: {
      alpha2: string;
      bravo2: number;
    };
  }> = {
    alpha1: "FOO",
    bravo1: 1,
    charlie1: {
      alpha2: "BAR",
      bravo2: 2
    }
  };

  console.log(sampleObject1);
  console.log(ArbitraryValueFormatter.stringifyAndFormat(sampleObject1));

}

console.log("=== Arrays =====================================================================================");

if (switches.arrays.empty) {

  console.log("--- Empty ------------------------------------------------------------------------------------");

  const emptyArray: Array<string> = [];

  console.log(emptyArray);
  console.log(ArbitraryValueFormatter.stringifyAndFormat(emptyArray));

}

if (switches.arrays.simple) {

  console.log("--- Simple -----------------------------------------------------------------------------------");

  const simpleArray: Array<string> = [ "ALPHA", "BRAVO", "CHARLIE" ];

  console.log(simpleArray);
  console.log(ArbitraryValueFormatter.stringifyAndFormat(simpleArray));

}


if (switches.arrays.nestedWithPrimitives) {

  console.log("--- Nested with Primitives -------------------------------------------------------------------");

  const arrayWithNestedOneOfPrimitives: Array<Array<string | number>> = [
    [ "ALPHA", "BRAVO", "CHARLIE" ],
    [ 1, 2, 3 ]
  ];

  console.log(arrayWithNestedOneOfPrimitives);
  console.log(ArbitraryValueFormatter.stringifyAndFormat(arrayWithNestedOneOfPrimitives));

}


if (switches.arrays.nestedWithObjects) {

  console.log("--- Array with Nested Objects ----------------------------------------------------------------");

  const arrayWithNestedObjects: Array<{
    id: number;
    name: string;
    details: {
      category: string;
      active: boolean;
    };
  }> = [
    {
      id: 1,
      name: "First item",
      details: {
        category: "A",
        active: true
      }
    },
    {
      id: 2,
      name: "Second item",
      details: {
        category: "B",
        active: false
      }
    }
  ];

  console.log(arrayWithNestedObjects);
  console.log(ArbitraryValueFormatter.stringifyAndFormat(arrayWithNestedObjects));

}


if (Object.values(switches.sets).includes(true)) {

  console.log("=== Sets =====================================================================================");

  if (switches.sets.empty) {

    console.log("--- Empty ----------------------------------------------------------------------------------");

    const emptySet: Set<string> = new Set([]);

    console.log(emptySet);
    console.log(ArbitraryValueFormatter.stringifyAndFormat(emptySet));

  }

  if (switches.sets.simple) {

    console.log("--- Simple ---------------------------------------------------------------------------------");

    const simpleSet: Set<string> = new Set([ "ALPHA", "BRAVO", "CHARLIE" ]);

    console.log(simpleSet);
    console.log(ArbitraryValueFormatter.stringifyAndFormat(simpleSet));

  }

  if (switches.sets.nestedWithPrimitives) {

    console.log("--- Nested with Primitives -------------------------------------------------------------------");

    const setWithNestedOneOfPrimitives: Set<Set<string | number>> = new Set([
      new Set([ "ALPHA", "BRAVO", "CHARLIE" ]),
      new Set([ 1, 2, 3 ])
    ]);

    console.log(setWithNestedOneOfPrimitives);
    console.log(ArbitraryValueFormatter.stringifyAndFormat(setWithNestedOneOfPrimitives));

  }

  if (switches.sets.nestedWithObjects) {

    console.log("--- Set with Nested Objects -----------------------------------------------------------------");

    const arrayWithNestedObjects: Set<{
      id: number;
      name: string;
      details: {
        category: string;
        active: boolean;
      };
    }> = new Set([
      {
        id: 1,
        name: "First item",
        details: {
          category: "A",
          active: true
        }
      },
      {
        id: 2,
        name: "Second item",
        details: {
          category: "B",
          active: false
        }
      }
    ]);

    console.log(arrayWithNestedObjects);
    console.log(ArbitraryValueFormatter.stringifyAndFormat(arrayWithNestedObjects));

  }


}


if (Object.values(switches.maps).includes(true)) {

  console.log("=== Maps =====================================================================================");

  if (switches.maps.empty) {

    console.log("--- Empty ----------------------------------------------------------------------------------");

    const sampleMap: Map<string, string> = new Map();

    console.log(sampleMap);
    console.log(ArbitraryValueFormatter.stringifyAndFormat(sampleMap));

  }

  if (switches.maps.simple) {

    console.log("--- Simple ---------------------------------------------------------------------------------");

    const sampleMap: Map<string, string> = new Map([
      [ "ALPHA", "FOO" ],
      [ "BRAVO", "BAR" ]
    ]);

    console.log(sampleMap);
    console.log(ArbitraryValueFormatter.stringifyAndFormat(sampleMap));

  }

  if (switches.maps.nestedWithPrimitives) {

    console.log("--- Nested with Primitives -----------------------------------------------------------------");

    const setWithNestedOneOfPrimitives: Map<
      Map<string | number, string | number>, Map<string | number, string | number>
    > = new Map([
      [
        new Map<string | number, string | number>([
          [ "key1", "value1" ],
          [ 2, 100 ]
        ]),
        new Map<string | number, string | number>([
          [ "innerKey", "innerValue" ],
          [ 1, "mixed" ]
        ])
      ],
      [
       new Map<string | number, string | number>([
         [ 1, "numeric key" ],
         [ "string", 200 ]
       ]),
       new Map<string | number, string | number>([
         [ 42, 42 ],
         [ "test", "test" ]
       ])
      ]
    ]);

    console.log(setWithNestedOneOfPrimitives);
    console.log(ArbitraryValueFormatter.stringifyAndFormat(setWithNestedOneOfPrimitives));

  }

  if (switches.maps.nestedWithObjects) {

    console.log("--- Map With Nested Objects ----------------------------------------------------------------");

    const mapWithNestedObjects: Map<{
      id: number;
      type: string;
    }, {
      id: number;
      name: string;
      details: {
        category: string;
        active: boolean;
      };
    }> = new Map([
      [
        {
          id: 1,
          type: "primary"
        },
        {
          id: 1,
          name: "First item",
          details: {
            category: "A",
            active: true
          }
        }
      ],
      [
        {
          id: 2,
          type: "secondary"
        },
        {
          id: 2,
          name: "Second item",
          details: {
            category: "B",
            active: false
          }
        }
      ]
    ]);

    console.log(mapWithNestedObjects);
    console.log(ArbitraryValueFormatter.stringifyAndFormat(mapWithNestedObjects));

  }

}
