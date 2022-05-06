import {
  RawObjectDataProcessor,
  stringifyAndFormatArbitraryValue,
  insertSubstring
} from "@yamato-daiwa/es-extensions";
import Localization = RawObjectDataProcessor.Localization;


const RawObjectDataProcessorLocalization__Russian: Localization = {

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

    return `${title}` +
        `\n\n●　Свойство / элемент: '${ targetPropertyDotSeparatedQualifiedName }'` +
        `${ insertSubstring(
          targetPropertyNewName,
          { modifier: (targetSubstring: string): string => ` (новое имя: ${ targetSubstring })` }
        ) }` +
        `\n${specificMessagePart}` +
        `\n\n●　Спецификация свойства / элемента: \n${ propertyOrElementSpecification__stringified }` +
        `\n●　Действительное значение: ${ stringifyAndFormatArbitraryValue(targetPropertyValue) }` +
        `${ insertSubstring(targetPropertyStringifiedValueBeforeFirstPreValidationModification, {
          modifier: (targetSubstring: string): string => 
              `\n●　Значение свойства перед первой превалидационной модификацией: ${targetSubstring}`
        }) }`;
  },

  buildErrorMessagesListItemHeading(messageNumber: number): string { return `=== Ошибка №${ messageNumber } ==========`; },

  rawDataIsNullErrorMessage: "Первый параметр 'RawObjectDataProcessor.process' имеет значение null.",

  buildRawDataIsNotObjectErrorMessage: (actualType: string): string =>
      `Первый параметр 'RawObjectDataProcessor.process' не является объектом (object) имеет тип ${actualType}.`,

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
      specificMessagePart: `Ожидалось, что это значение будет иметь тип '${　this.valueType(targetPropertyValueSpecification.type　)}, ' ` +
          `но на самом деле оно имеет тип '${typeof targetPropertyValue}'.`
    };
  },

  buildPreValidationModificationFailedErrorMessageTextData(thrownError: unknown): Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "Предвалидационная модификация повлекла ошибку",
      specificMessagePart: "Предвалидационная модификация стала причиной следующей ошибки:\n" +
          `${stringifyAndFormatArbitraryValue(thrownError)}\n` +
          "Эта предвалидационная модификация будет проигнорирована."
    };
  },


  /* === Обязательность свойств ===================================================================================== */
  requiredPropertyIsMissingErrorMessageTextData: {
    title: "Отсутствие обязательного свойства",
    specificMessagePart: "Данное свойство имеет значение 'undefined', хотя помечено как обязательное"
  },

  buildConditionallyRequiredPropertyIsMissingErrorMessageTextData(
    verbalRequirementCondition: string
  ): Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "Отсутствие условно обязательно свойства",
      specificMessagePart: "Данное свойство имеет значение 'undefined', хотя условие:\n" +
          `'${verbalRequirementCondition}'\n при котором оно обязательно, выполнено.`
    };
  },


  /* === Тип данных null ============================================================================================ */
  nonNullableValueIsNullErrorMessageTextData: {
    title: "Запрещённое null-значение",
    specificMessagePart: "Это значение - 'null', хотя такой вариант не был разрешён спецификацией."
  },


  /* === Индексные массивы ========================================================================================== */
  buildIndexedArrayElementsCountIsLessThanRequiredMinimumErrorMessageTextData(
    { minimalElementsCount, actualElementsCount }: { minimalElementsCount: number; actualElementsCount: number; }
  ): RawObjectDataProcessor.Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "Количество элементов нумерованного массива не достигает минимально ожидаемого значения",
      specificMessagePart: `Это значение типа 'нумерованный массив' имеет ${actualElementsCount} элементов, ` +
          `хотя ожидалось не менее ${minimalElementsCount}.`
    };
  },

  buildIndexedArrayElementsCountIsMoreThanAllowedMaximumErrorMessageTextData(
    { maximalElementsCount, actualElementsCount }: { maximalElementsCount: number; actualElementsCount: number; }
  ): RawObjectDataProcessor.Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "Количество элементов нумерованного массива превышает максимальное ожидаемое значение",
      specificMessagePart: `Это значение типа 'нумерованный массив' имеет ${actualElementsCount} элементов, ` +
          `хотя ожидалось не более ${maximalElementsCount}.`
    };
  },

  buildIndexedArrayElementsCountDoesNotMatchWithSpecifiedExactNumberErrorMessageTextData(
    { exactElementsCount, actualElementsCount }: { exactElementsCount: number; actualElementsCount: number; }
  ): RawObjectDataProcessor.Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "Количество элементов нумерованного массива отлично от ожидаемого фиксированного значения",
      specificMessagePart: `Это значение типа 'нумерованный массив' имеет ${actualElementsCount} элементов, ` +
          `хотя ожидалось ${exactElementsCount}.`
    };
  },

  indexedArrayDisallowedUndefinedElementErrorMessageTextData: {
    title: "Запрещённый пустой (undefined) элемент нумерованного массива",
    specificMessagePart: "Это значение типа 'нумерованный массив' имеет пустой ('undefined') элемент, хотя" +
        "хотя таковые не были разрешены описанием валидных данных."
  },

  indexedArrayDisallowedNullElementErrorMessageTextData: {
    title: "Запрещённый пустой (null) элемент нумерованного массива",
    specificMessagePart: "Это значение типа 'нумерованный массив' имеет пустой ('null') элемент, хотя" +
        "хотя таковые не были разрешены описанием валидных данных."
  },


  /* === Associative arrays ========================================================================================= */
  buildAssociativeArrayEntriesCountIsLessThanRequiredMinimumErrorMessageTextData(
    { minimalEntriesCount, actualEntriesCount }: { minimalEntriesCount: number; actualEntriesCount: number; }
  ): RawObjectDataProcessor.Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "Associative array has less entries than expected minimum",
      specificMessagePart: `This value of associative array type value has ${actualEntriesCount} entries while at least ` +
          `${minimalEntriesCount} expected.`
    };
  },

  buildAssociativeArrayEntriesCountIsMoreThanAllowedMaximumErrorMessageTextData(
    { maximalEntriesCount, actualEntriesCount }: { maximalEntriesCount: number; actualEntriesCount: number; }
  ): RawObjectDataProcessor.Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "Associative array has more entries than expected maximum",
      specificMessagePart: `This value of associative array-type value has ${actualEntriesCount} entries while maximally ` +
          `${maximalEntriesCount} expected.`
    };
  },

  buildAssociativeArrayEntriesCountDoesNotMatchWithSpecifiedExactNumberErrorMessageTextData(
    { exactEntriesCount, actualEntriesCount }: { exactEntriesCount: number; actualEntriesCount: number; }
  ): RawObjectDataProcessor.Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "The count of entries of associative array does not match with expected fixed value",
      specificMessagePart: `This value of associative array-type value has ${exactEntriesCount} entries while ` +
          `exactly ${actualEntriesCount} expected.`
    };
  },

  buildRequiredKeysOfAssociativeArrayAreMissingErrorMessageTextData(
      missingRequiredKeys: Array<string>
  ): Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "Отсутствуют обязательные ключи ассоциативного массива",
      specificMessagePart: "Следующие ключи ассоциативного массива отсутствуют несмотря на то, что помечены как обязательные:\n" +
          `${stringifyAndFormatArbitraryValue(missingRequiredKeys)}`
    };
  },

  buildRequiredAlternativeKeysOfAssociativeArrayAreMissingErrorMessageTextData(
      requiredKeysAlternatives: Array<string>
  ): Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "Отсутствуют альтернативно обязательные ключи",
      specificMessagePart: "One of below keys must present in this associative array-type value, but actually none of them " +
          `presents.\n${stringifyAndFormatArbitraryValue(requiredKeysAlternatives)}`
    };
  },

  buildDisallowedKeysFoundInAssociativeArrayErrorMessageTextData(
      foundDisallowedKeys: Array<string>
  ): Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "Запрещённые ключи ассоциативного массива",
      specificMessagePart: "Нижеследующие ключи присутствуют в этом значении типа 'ассоциативный массив', хотя они были " +
          `запрещены.\n${stringifyAndFormatArbitraryValue(foundDisallowedKeys)}`
    };
  },

  associativeArrayDisallowedUndefinedValueErrorMessageTextData: {
    title: "Не разрешённые значения ассоциативного массива типа 'явный undefined'",
    specificMessagePart: "Это значение ассоциативного массива имеет тип 'undefined', хотя подобные значение не были разрешены."
  },

  associativeArrayDisallowedNullValueErrorMessageTextData: {
    title: "Не разрешённые значения ассоциативного массива типа 'null'",
    specificMessagePart: "Это значение ассоциативного массива имеет тип 'null', хотя подобные значение не были разрешены."
  },


  /* === 値の型 ====================================================================================================== */
  valueType(valueType: Localization.ValuesTypes): string {

    /* [ Theory ] Basically, the switch/case including Number/String/etc constructor is working, but there are some exceptions.
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
      case RawObjectDataProcessor.NumbersSets.naturalNumber: return "Натуральное число";
      case RawObjectDataProcessor.NumbersSets.nonNegativeInteger: return "Неотрицательное целое число";
      case RawObjectDataProcessor.NumbersSets.negativeInteger: return "Отрицательное целое число";
      case RawObjectDataProcessor.NumbersSets.negativeIntegerOrZero: return "Отрицательное целое число или ноль";
      case RawObjectDataProcessor.NumbersSets.anyInteger: return "Целое число любого знака";
      case RawObjectDataProcessor.NumbersSets.positiveDecimalFraction: return "Положительная десятичная дробь";
      case RawObjectDataProcessor.NumbersSets.negativeDecimalFraction: return "Отрицательная десятичная дробь";
      case RawObjectDataProcessor.NumbersSets.decimalFractionOfAnySign: return "Десятичная дробь любого знака";
      case RawObjectDataProcessor.NumbersSets.anyRealNumber: return "Любое действительное число";
    }
  },


  /* === 数型値 ====================================================================================================== */
  buildNumberValueIsNotBelongToExpectedNumbersSetErrorMessageTextData(
    expectedNumberSet: RawObjectDataProcessor.NumbersSets
  ): Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "Несоответствие реального типа данных ожидаемому",
      specificMessagePart: `Вопреки ожиданиям, данное значение не принадлежит тпу ${ this.numbersSet(expectedNumberSet) }.`
    };
  },

  valueIsNotAmongAllowedAlternativesErrorMessageTextData: {
    title: "Неразрешенный вариант значения",
    specificMessagePart: "Это значение отсутствует среди допустимых вариантов."
  },

  buildNumericValueIsSmallerThanRequiredMinimumErrorMessageTextData(
    requiredMinimum: number
  ): Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "Нехватка до наименьшего разрешённого значения",
      specificMessagePart: `Это значение не достигает наименьшего разрешённого ${ requiredMinimum }.`
    };
  },

  buildNumericValueIsGreaterThanAllowedMaximumErrorMessageTextData(
    allowedMaximum: number
  ): Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "Превышение максимально разрешённого значения",
      specificMessagePart: `Это значение превышает максимально разрешённое ${ allowedMaximum }.`
    };
  },


  /* === 文字列型値 =================================================================================================== */
  buildCharactersCountIsLessThanRequiredErrorMessageTextData(
    { minimalCharactersCount, realCharactersCount }: { minimalCharactersCount: number; realCharactersCount: number; }
  ): Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "Нехватка количества символов",
      specificMessagePart: `Это строчное значение имеет ${ realCharactersCount } символов в то время как минимум ` +
          `${ minimalCharactersCount } требуется`
    };
  },

  buildCharactersCountIsMoreThanAllowedErrorMessageTextData(
    { maximalCharactersCount, realCharactersCount }: { maximalCharactersCount: number; realCharactersCount: number; }
  ): Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "Превышение максимального количества символов",
      specificMessagePart: `Это строчное значение имеет ${ realCharactersCount } символов в то время как максимум ` +
          `${ maximalCharactersCount } позволено.`
    };
  },

  buildCharactersCountDoesNotMatchWithSpecifiedErrorMessageTextData(
    { fixedCharactersCount, realCharactersCount }: { fixedCharactersCount: number; realCharactersCount: number; }
  ): Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "Несоответствие требуемому фиксированному числу символов",
      specificMessagePart: `Эта строка имеет ${ realCharactersCount } символов в то время как требуется ровно ` +
          `${ fixedCharactersCount }.`
    };
  },

  buildRegularExpressionMismatchErrorMessageTextData(regularExpression: RegExp): Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "Несоответствие регулярному выражению",
      specificMessagePart: `Это значение не соответствует регулярному выражению \n ${ regularExpression.toString() }`
    };
  },

  /* === 其の他 ====================================================================================================== */
  buildDisallowedBooleanValueVariantErrorMessageTextData(
    disallowedVariant: boolean
  ): Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "Неразрешённый вариант булевского значения",
      specificMessagePart: `Позволено только ${ !disallowedVariant }, но не ${disallowedVariant}.`
    };
  },

  buildIncompatibleValuesTypesAlternativesErrorDescription(
    targetValueSpecification: RawObjectDataProcessor.MultipleTypesAllowedValueSpecification
  ): string {
    return "Значения типа 'ValuesTypesIDs.fixedKeyAndValuePairsObject' (алиас: 'Object'）и" +
        "'ValuesTypesIDs.associativeArrayOfUniformTypeValues'（алиас: Map）не могут быть указанны одновременно " +
        "'ValuesTypesIDs.oneOf', потому как точки зрения ECMAScript имеют тип 'object'. Значение помечено как невалидное.\n" +
        `${ stringifyAndFormatArbitraryValue(targetValueSpecification) }`;
  },

  buildUnsupportedValueTypeErrorMessageTextData(
      propertyDataForMessagesBuilding: RawObjectDataProcessor.Localization.PropertyDataForMessagesBuilding
  ): Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "Неизвестное значение",
      specificMessagePart: `Это значение типа ${ typeof propertyDataForMessagesBuilding.targetPropertyValue } не может ` +
          `быть получено путём преобразования из JSON в нативный ECMAScript объект.`
    };
  },


  buildCustomValidationFailedErrorMessageTextData(
    customValidationDescription: string
  ): Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "Пользовательская валидация не пройдена",
      specificMessagePart: `Это значение не прошло пользовательскую валидацию "${customValidationDescription}".`
    };
  }
}


export default RawObjectDataProcessorLocalization__Russian;
