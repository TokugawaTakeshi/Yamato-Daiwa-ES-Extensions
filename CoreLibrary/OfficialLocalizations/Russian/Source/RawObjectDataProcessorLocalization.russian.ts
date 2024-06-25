import {
  RawObjectDataProcessor,
  stringifyAndFormatArbitraryValue,
  insertSubstring
} from "@yamato-daiwa/es-extensions";
import Localization = RawObjectDataProcessor.Localization;


export const rawObjectDataProcessorLocalization__russian: Localization = {

  errorMessageBasicTemplate(
    {
      targetPropertyDotSeparatedQualifiedName,
      targetPropertyNewName,
      targetPropertyValue,
      targetPropertyValueSpecification,
      targetPropertyStringifiedValueBeforeFirstPreValidationModification,
      title,
      specificMessagePart
    }: Localization.DataForMessagesBuilding
  ): string {

    const propertyOrElementSpecification__stringified: string = stringifyAndFormatArbitraryValue({
      ...targetPropertyValueSpecification,
      type: this.valueType(targetPropertyValueSpecification.type)
    });

    return title +
        `\n\n●　Свойство / элемент: '${ targetPropertyDotSeparatedQualifiedName }'` +
        insertSubstring(
          targetPropertyNewName,
          { modifier: (targetSubstring: string): string => ` (новое имя: ${ targetSubstring })` }
        ) +
        `\n${ specificMessagePart }` +
        `\n\n●　Спецификация свойства / элемента: \n${ propertyOrElementSpecification__stringified }` +
        `\n●　Действительное значение: ${ stringifyAndFormatArbitraryValue(targetPropertyValue) }` +
        insertSubstring(
          targetPropertyStringifiedValueBeforeFirstPreValidationModification,
          {
            modifier: (targetSubstring: string): string =>
                `\n●　Значение свойства перед первой предвалидационной модификацией: ${ targetSubstring }`
          }
        );

  },

  buildErrorMessagesListItemHeading(messageNumber: number): string { return `=== Ошибка №${ messageNumber } ==========`; },

  rawDataIsNullErrorMessage: "Первый параметр 'RawObjectDataProcessor.process' имеет значение null.",

  buildRawDataIsNotObjectErrorMessage: (actualType: string): string =>
      `Первый параметр 'RawObjectDataProcessor.process' не является объектом (object) имеет и тип '${ actualType }'.`,

  buildValueTypeDoesNotMatchWithExpectedErrorMessageTextData(
    {
      targetPropertyValue,
      targetPropertyValueSpecification
    }: Pick<Localization.PropertyDataForMessagesBuilding, "targetPropertyValue"> & {
      targetPropertyValueSpecification: Exclude<
        RawObjectDataProcessor.CertainTypeValueSpecification,
        RawObjectDataProcessor.MultipleTypesAllowedValueSpecification
      >;
    }
  ): Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "Несоответствие ожидаемого и реального типов значения",
      specificMessagePart:
          `Ожидалось, что это значение будет иметь тип '${ this.valueType(targetPropertyValueSpecification.type) }, ' ` +
          `в то время как на самом деле оно имеет тип '${ typeof targetPropertyValue }'.`
    };
  },

  buildPreValidationModificationFailedErrorMessageTextData(thrownError: unknown): Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "Предвалидационная модификация повлекла ошибку",
      specificMessagePart: "Предвалидационная модификация повлекла за собой возникновение ошибки:\n" +
          `${ stringifyAndFormatArbitraryValue(thrownError) }\n` +
          "Эта предвалидационная модификация будет проигнорирована."
    };
  },


  /* === Обязательность свойств ===================================================================================== */
  requiredPropertyIsMissingErrorMessageTextData: {
    title: "Отсутствие обязательного свойства",
    specificMessagePart: "Данное свойство имеет значение 'undefined', хотя помечено как обязательное."
  },

  buildConditionallyRequiredPropertyIsMissingErrorMessageTextData(
    verbalRequirementCondition: string
  ): Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "Отсутствие условно обязательно свойства",
      specificMessagePart: "Данное свойство имеет значение 'undefined', хотя условие:\n" +
          `'${ verbalRequirementCondition }'\n при котором оно обязательно, выполнено.`
    };
  },


  /* === Тип данных null ============================================================================================ */
  nonNullableValueIsNullErrorMessageTextData: {
    title: "Запрещённое null-значение",
    specificMessagePart: "Это значение - null, хотя такой вариант не был разрешён спецификацией."
  },


  /* === Индексные массивы ========================================================================================== */
  buildIndexedArrayElementsCountIsLessThanRequiredMinimumErrorMessageTextData(
    { minimalElementsCount, actualElementsCount }: Readonly<{ minimalElementsCount: number; actualElementsCount: number; }>
  ): RawObjectDataProcessor.Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "Количество элементов нумерованного массива не достигает минимального ожидаемого значения",
      specificMessagePart: `Это значение типа 'нумерованный массив' имеет ${ actualElementsCount } элементов, ` +
          `хотя ожидалось не менее ${ minimalElementsCount }.`
    };
  },

  buildIndexedArrayElementsCountIsMoreThanAllowedMaximumErrorMessageTextData(
    { maximalElementsCount, actualElementsCount }: Readonly<{ maximalElementsCount: number; actualElementsCount: number; }>
  ): RawObjectDataProcessor.Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "Количество элементов нумерованного массива превышает максимальное ожидаемое значение",
      specificMessagePart: `Это значение типа 'нумерованный массив' имеет ${ actualElementsCount } элементов, ` +
          `хотя ожидалось не более ${ maximalElementsCount }.`
    };
  },

  buildIndexedArrayElementsCountDoesNotMatchWithSpecifiedExactNumberErrorMessageTextData(
    { exactElementsCount, actualElementsCount }: Readonly<{ exactElementsCount: number; actualElementsCount: number; }>
  ): RawObjectDataProcessor.Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "Количество элементов нумерованного массива отлично от ожидаемого фиксированного значения",
      specificMessagePart: `Это значение типа 'нумерованный массив' имеет ${ actualElementsCount } элементов, ` +
          `хотя ожидалось ровно ${ exactElementsCount }.`
    };
  },

  indexedArrayDisallowedUndefinedElementErrorMessageTextData: {
    title: "Запрещённый пустой (undefined) элемент нумерованного массива",
    specificMessagePart: "Это значение типа 'нумерованный массив' имеет пустой ('undefined') элемент, хотя" +
        "хотя таковые не были разрешены спецификацией валидных данных."
  },

  indexedArrayDisallowedNullElementErrorMessageTextData: {
    title: "Запрещённый пустой (null) элемент нумерованного массива",
    specificMessagePart: "Это значение типа 'нумерованный массив' имеет пустой ('null') элемент, хотя" +
        "хотя таковые не были разрешены спецификацией валидных данных."
  },


  /* === Ассоциативные массивы ====================================================================================== */
  buildAssociativeArrayEntriesCountIsLessThanRequiredMinimumErrorMessageTextData(
    { minimalEntriesCount, actualEntriesCount }: Readonly<{ minimalEntriesCount: number; actualEntriesCount: number; }>
  ): RawObjectDataProcessor.Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "Количество вхождений ассоциативного массива не достигает минимального ожидаемого значения",
      specificMessagePart: `Это значение типа 'ассоциативный массив' имеет ${ actualEntriesCount } вхождений, ` +
          `хотя ожидалось не менее ${ minimalEntriesCount }.`
    };
  },

  buildAssociativeArrayEntriesCountIsMoreThanAllowedMaximumErrorMessageTextData(
    { maximalEntriesCount, actualEntriesCount }: Readonly<{ maximalEntriesCount: number; actualEntriesCount: number; }>
  ): RawObjectDataProcessor.Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "Количество вхождений ассоциативного массива превышает максимальное ожидаемое значение",
      specificMessagePart: `Это значение типа 'ассоциативный массив' имеет ${ actualEntriesCount } вхождений, ` +
          `хотя ожидалось не более ${ maximalEntriesCount }.`
    };
  },

  buildAssociativeArrayEntriesCountDoesNotMatchWithSpecifiedExactNumberErrorMessageTextData(
    { exactEntriesCount, actualEntriesCount }: Readonly<{ exactEntriesCount: number; actualEntriesCount: number; }>
  ): RawObjectDataProcessor.Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "Количество вхождений ассоциативного массива отлично от ожидаемого фиксированного значения",
      specificMessagePart: `Это значение типа 'ассоциативный массив' имеет ${ actualEntriesCount } вхождений, ` +
          `хотя ожидалось ровно ${ exactEntriesCount }.`
    };
  },

  buildRequiredKeysOfAssociativeArrayAreMissingErrorMessageTextData(
    missingRequiredKeys: ReadonlyArray<string>
  ): Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "Отсутствуют объявленные обязательными ключи ассоциативного массива",
      specificMessagePart: "Следующие ключи этого ассоциативного массива отсутствуют несмотря на то, что помечены как " +
          `обязательные:\n ${ stringifyAndFormatArbitraryValue(missingRequiredKeys) }`
    };
  },

  buildRequiredAlternativeKeysOfAssociativeArrayAreMissingErrorMessageTextData(
    requiredKeysAlternatives: ReadonlyArray<string>
  ): Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "Отсутствуют альтернативно обязательные ключи",
      specificMessagePart: "Один из следующих ключей обязан присутствовать в этом ассоциативном массиве, хотя на самом " +
          `деле ни одного из них нет.\n${ stringifyAndFormatArbitraryValue(requiredKeysAlternatives) }`
    };
  },

  buildDisallowedKeysFoundInAssociativeArrayErrorMessageTextData(
    foundDisallowedKeys: ReadonlyArray<string>
  ): Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "Запрещённые ключи ассоциативного массива",
      specificMessagePart: "Нижеследующие ключи присутствуют в этом значении типа 'ассоциативный массив', хотя они были " +
          `запрещены.\n${ stringifyAndFormatArbitraryValue(foundDisallowedKeys) }`
    };
  },

  associativeArrayDisallowedUndefinedValueErrorMessageTextData: {
    title: "Неразрешённые значения ассоциативного массива типа 'undefined'",
    specificMessagePart: "Это значение ассоциативного массива имеет тип 'undefined', хотя такие значение не были разрешены."
  },

  associativeArrayDisallowedNullValueErrorMessageTextData: {
    title: "Неразрешённые значения ассоциативного массива типа 'null'",
    specificMessagePart: "Это значение ассоциативного массива имеет тип 'null', хотя такие значение не были разрешены."
  },


  /* === Типы значений ============================================================================================== */
  valueType(valueType: Localization.ValuesTypes): string {

    /* [ Теория ] Обычно блок switch/case нормально работает с конструкторами типа Number, String, однако есть редкие исключения.
     * https://stackoverflow.com/q/69848208/4818123
     * https://stackoverflow.com/q/69848689/4818123
     *  */
    const targetValueTypeID: RawObjectDataProcessor.ValuesTypesIDs = RawObjectDataProcessor.
    getNormalizedValueTypeID(valueType);

    switch (targetValueTypeID) {
      case RawObjectDataProcessor.ValuesTypesIDs.number: return "Число";
      case RawObjectDataProcessor.ValuesTypesIDs.string: return "Строка";
      case RawObjectDataProcessor.ValuesTypesIDs.boolean: return "Булевский тип";
      case RawObjectDataProcessor.ValuesTypesIDs.indexedArrayOfUniformElements: return "Индексный массив однородных элементов";
      case RawObjectDataProcessor.ValuesTypesIDs.fixedKeyAndValuePairsObject: return "Объект с фиксированными ключами";
      case RawObjectDataProcessor.ValuesTypesIDs.associativeArrayOfUniformTypeValues:
          return "Ассоциативный массив однородных элементов";
      case RawObjectDataProcessor.ValuesTypesIDs.oneOf: return "Позволено несколько типов";
    }
  },

  numbersSet(numberSet: RawObjectDataProcessor.NumbersSets): string {
    switch (numberSet) {
      case RawObjectDataProcessor.NumbersSets.naturalNumber: return "Натуральные числа";
      case RawObjectDataProcessor.NumbersSets.nonNegativeInteger: return "Неотрицательные целые числа";
      case RawObjectDataProcessor.NumbersSets.negativeInteger: return "Отрицательный целый числа";
      case RawObjectDataProcessor.NumbersSets.negativeIntegerOrZero: return "Отрицательное целое число или ноль";
      case RawObjectDataProcessor.NumbersSets.anyInteger: return "Целое число любого знака";
      case RawObjectDataProcessor.NumbersSets.positiveDecimalFraction: return "Положительная десятичная дробь";
      case RawObjectDataProcessor.NumbersSets.negativeDecimalFraction: return "Отрицательная десятичная дробь";
      case RawObjectDataProcessor.NumbersSets.decimalFractionOfAnySign: return "Десятичная дробь любого знака";
      case RawObjectDataProcessor.NumbersSets.anyRealNumber: return "Любое действительное число";
    }
  },


  /* === Числовые значения ========================================================================================== */
  buildNumberValueIsNotBelongToExpectedNumbersSetErrorMessageTextData(
    expectedNumberSet: RawObjectDataProcessor.NumbersSets
  ): Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "Несоответствие реального подмножества чисел данных ожидаемому",
      specificMessagePart: "Вопреки ожиданиям, данное значение не принадлежит множеству " +
          `'${ this.numbersSet(expectedNumberSet) }'.`
    };
  },

  buildValueIsNotAmongAllowedAlternativesErrorMessageTextData(
    allowedAlternatives: ReadonlyArray<string>
  ): Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "Недопустимый вариант значения",
      specificMessagePart:
          "Это значение отсутствует среди перечисленных ниже допустимых вариантов.\n" +
          allowedAlternatives.map((allowedAlternative: string): string => `  ○ ${ allowedAlternative }`).join("\n")
    };
  },

  buildNumericValueIsSmallerThanRequiredMinimumErrorMessageTextData(
    requiredMinimum: number
  ): Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "Нехватка до наименьшего разрешённого значения",
      specificMessagePart: `Это числовое значение не достигает минимально разрешённого ${ requiredMinimum }.`
    };
  },

  buildNumericValueIsGreaterThanAllowedMaximumErrorMessageTextData(
    allowedMaximum: number
  ): Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "Превышение максимально разрешённого значения",
      specificMessagePart: `Это числовое значение превышает максимально разрешённое ${ allowedMaximum }.`
    };
  },


  /* === Строковые значения ========================================================================================== */
  buildCharactersCountIsLessThanRequiredErrorMessageTextData(
    { minimalCharactersCount, realCharactersCount }: Readonly<{ minimalCharactersCount: number; realCharactersCount: number; }>
  ): Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "Нехватка количества символов",
      specificMessagePart: `Это строчное значение имеет ${ realCharactersCount } символов, в то время как требуется минимум ` +
          `${ minimalCharactersCount }.`
    };
  },

  buildCharactersCountIsMoreThanAllowedErrorMessageTextData(
    { maximalCharactersCount, realCharactersCount }: Readonly<{ maximalCharactersCount: number; realCharactersCount: number; }>
  ): Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "Превышение максимального количества символов",
      specificMessagePart: `Это строчное значение имеет ${ realCharactersCount } символов, в то время как позволено ` +
          `максимум ${ maximalCharactersCount }.`
    };
  },

  buildCharactersCountDoesNotMatchWithSpecifiedErrorMessageTextData(
    { fixedCharactersCount, realCharactersCount }: Readonly<{ fixedCharactersCount: number; realCharactersCount: number; }>
  ): Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "Несоответствие требуемому фиксированному числу символов",
      specificMessagePart: `Эта строка имеет ${ realCharactersCount } символов, в то время как требуется ровно ` +
          `${ fixedCharactersCount }.`
    };
  },

  buildRegularExpressionMismatchErrorMessageTextData(regularExpression: RegExp): Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "Несоответствие регулярному выражению",
      specificMessagePart: `Это значение не соответствует регулярному выражению \n ${ regularExpression.toString() }`
    };
  },


  /* === Другое ====================================================================================================== */
  buildDisallowedBooleanValueVariantErrorMessageTextData(
    disallowedVariant: boolean
  ): Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "Неразрешённый вариант булевского значения",
      specificMessagePart: `Позволено только ${ !disallowedVariant }, но не ${ disallowedVariant }.`
    };
  },

  buildIncompatibleValuesTypesAlternativesErrorDescription(
    targetValueSpecification: RawObjectDataProcessor.MultipleTypesAllowedValueSpecification
  ): string {
    return "Значения типа 'ValuesTypesIDs.fixedKeyAndValuePairsObject' (алиас: 'Object'）и" +
        "'ValuesTypesIDs.associativeArrayOfUniformTypeValues'（алиас: Map）не могут быть указанны одновременно как варианты " +
        "'ValuesTypesIDs.oneOf', потому как точки зрения ECMAScript оба имеют тип 'object'. Значение помечено как невалидное.\n" +
        stringifyAndFormatArbitraryValue(targetValueSpecification);
  },

  buildUnsupportedValueTypeErrorMessageTextData(
    propertyDataForMessagesBuilding: RawObjectDataProcessor.Localization.PropertyDataForMessagesBuilding
  ): Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "Неизвестное значение",
      specificMessagePart: `Это значение типа ${ typeof propertyDataForMessagesBuilding.targetPropertyValue } не может ` +
          "быть получено путём преобразования из JSON в нативный ECMAScript объект, а RawObjectDataProcessor поддерживает " +
          "только данные, совместимые с форматом JSON."
    };
  },


  buildCustomValidationFailedErrorMessageTextData(
    customValidationDescription: string
  ): Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "Пользовательская валидация не пройдена",
      specificMessagePart: `Это значение не прошло пользовательскую валидацию '${ customValidationDescription }'.`
    };
  }
};
