import {
  RawObjectDataProcessor,
  stringifyAndFormatArbitraryValue,
  isUndefined,
  isNotUndefined,
  isNull,
  isNotNull
} from "@yamato-daiwa/es-extensions";

import Localization = RawObjectDataProcessor.Localization;
import ValidationErrors = Localization.ValidationErrors;
import ThrowableErrors = Localization.ThrowableErrors;
import Warnings = Localization.Warnings;


export const rawObjectDataProcessorLocalization__russian: Localization = {

  generateSeeMoreSentence: ({ documentationPageAnchor }: Localization.SeeDocumentationSentence.TemplateVariables): string =>
      "Подробнее см. " +
        "https://ee.yamato-daiwa.com/CoreLibrary/Functionality/RawObjectDataProcessor/Children/06-ValidationIssues/" +
        `RawObjectDataProcessor-ValidationIssues.russian.html#${ documentationPageAnchor }`,

  generateValidationErrorMessage(
    {
      title,
      targetPropertyDotSeparatedQualifiedInitialName,
      targetPropertyNewName,
      description,
      targetPropertyValueSpecification,
      targetPropertyValue,
      targetPropertyStringifiedValueBeforeFirstPreValidationModification,
      documentationPageAnchor
    }: Localization.DataForMessagesBuilding
  ): string {
    return [
      `${ title } [ ${ documentationPageAnchor } ]`,
      `\n\n● Свойство/элемент: ${ targetPropertyDotSeparatedQualifiedInitialName ?? "(кореневой)" }`,
      ...isNotNull(targetPropertyNewName) ? [ ` (переименовано в "${ targetPropertyNewName }")` ] : [],
      `\n${ description }`,
      `\n${ this.generateSeeMoreSentence({ documentationPageAnchor }) }`,
      "\n\n●　Спецификация свойства/элемента: ",
      `\n${
        stringifyAndFormatArbitraryValue({
          ...targetPropertyValueSpecification,
          type: this.getLocalizedValueType(RawObjectDataProcessor.normalizeDataType(targetPropertyValueSpecification))
        })
      }`,
      `\n● Реальное значение: ${ stringifyAndFormatArbitraryValue(targetPropertyValue) }`,
      ...isNotUndefined(targetPropertyStringifiedValueBeforeFirstPreValidationModification) ? [
        "\n●　Значение перед первой предвалидационным преобразованием: " +
          targetPropertyStringifiedValueBeforeFirstPreValidationModification
      ] : []
    ].join("");
  },

  generateLanguageDependentErrorNumberHeadingPart: ({ messageNumber }: Readonly<{ messageNumber: number; }>): string =>
      `Ошибка №${ messageNumber }`,


  /* ━━━ Ошибки валидации ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  validationErrors: {

    rawDataIsNotObject: {
      generateMessage:
          ({ actualNativeType, documentationPageAnchor }: ValidationErrors.RawDataIsNotObject.TemplateVariables): string =>
              "Сырые данные, переданные через первый параметр \"RawObjectDataProcessor.process()\" не являются объектом " +
                `и в действительности имеют тип "${ actualNativeType }".\n` +
              rawObjectDataProcessorLocalization__russian.generateSeeMoreSentence({ documentationPageAnchor })
    },

    rawDataIsNull: {
      generateMessage:
          ({ documentationPageAnchor }: ValidationErrors.RawDataIsNull.TemplateVariables): string =>
              "Сырые данные, переданные через первый параметр \"RawObjectDataProcessor.process()\" являются null в то " +
                "время как ожидался объект, не являются null.\n" +
              rawObjectDataProcessorLocalization__russian.generateSeeMoreSentence({ documentationPageAnchor })
    },

    valueTypeDoesNotMatchWithExpected: {
      title: "Несоответствие ожидаемого и реального типов значения",
      generateDescription: (
        { expectedTypeID, actualNativeType }: ValidationErrors.ValueTypeDoesNotMatchWithExpected.TemplateVariables
      ): string =>
          "Ожидалось, что это значение будет иметь тип " +
            `"${ rawObjectDataProcessorLocalization__russian.getLocalizedValueType(expectedTypeID) }", в то время как ` +
            `на самом деле оно имеет тип "${ actualNativeType }".`
    },

    preValidationModificationFailed: {

      title: "Возникновение ошибки при предвалидационном преобразовании",

      generateDescription: (
        { stringifiedCaughtError }: ValidationErrors.PreValidationModificationFailed.TemplateVariables
      ): string =>
          "Предвалидационное преобразование этого свойства/элемента повлекло за собой следующую ошибку. \n" +
            `${ stringifiedCaughtError }\n` +
          "Данные были помечены как невалидные потому что было выбрано \"ErrorHandlingStrategies.markingOfDataAsInvalid\" " +
            "в качестве стратегии обработки ошибки \"onPreValidationModificationFailed\" что не рекомендуется, как как " +
            "проблема момент быть не в данных, а функции, осуществляющей предвалидационные преобразования."

    },


    /* ┅┅┅ Объекты фиксированной схемы ┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅ */
    /* ╍╍╍ Разрешение на undefined ╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍ */
    forbiddenUndefinedValue: {
      title: "Запрещённое значение undefined",
      description:
          "Это свойство/элемент не определено или имеет явное значение `undefied`, что было явно запрещено."
    },

    conditionallyForbiddenUndefinedValue: {

      title: "Условно запрещённое значение `undefined` свойства/элемента",

      generateDescription: (
        {
          verbalConditionWhenUndefinedIsForbiddenWithoutEndOfSentenceMark
        }: ValidationErrors.ConditionallyForbiddenUndefinedValue.TemplateVariables
      ): string =>
          "Данное свойство/элемент имеет значение `undefined`, что запрещено если " +
            `${ verbalConditionWhenUndefinedIsForbiddenWithoutEndOfSentenceMark }, и это условие выполнено.`

    },

    conditionallyForbiddenNonUndefinedValue: {

      title: "Условно запрещённое не-undefined значение свойства/элемента",

      generateDescription: (
        {
          conditionWhenMustBeUndefined
        }: ValidationErrors.ConditionallyForbiddenNonUndefinedValue.TemplateVariables
      ): string =>
          `Данное свойство/элемент имеет значение, отличное от \`undefined\`, что запрещено если ` +
            ` ${ conditionWhenMustBeUndefined }, и это условие выполнено.`

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
