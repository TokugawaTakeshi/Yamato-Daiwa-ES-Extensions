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
      "См. подробнее " +
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
      `\n\n● Свойство/элемент: ${ targetPropertyDotSeparatedQualifiedInitialName ?? "(корневое)" }`,
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
        "\n●　Значение перед первым предвалидационным преобразованием: " +
          targetPropertyStringifiedValueBeforeFirstPreValidationModification
      ] : []
    ].join("");
  },

  generateLanguageDependentErrorNumberHeadingPart: ({ messageNumber }: Readonly<{ messageNumber: number; }>): string =>
      `Ошибка №${ messageNumber }`,


  /* ━━━ Ошибки валидации ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  /* [ Примечание для рецензоров ]
   * Большинство следующих сообщений являются частью шаблона "generateValidationErrorMessage" выше.
   * В контексте этого шаблона, такие относительные выражения, как "это свойство" или "этот элемент", являются
   *   однозначными. */
  validationErrors: {

    rawDataIsNotObject: {
      generateMessage:
          ({ actualNativeType, documentationPageAnchor }: ValidationErrors.RawDataIsNotObject.TemplateVariables): string =>
              "Данные, переданные через первый параметр \"RawObjectDataProcessor.process()\" не являются объектом " +
                `и в действительности имеют тип "${ actualNativeType }".\n` +
              rawObjectDataProcessorLocalization__russian.generateSeeMoreSentence({ documentationPageAnchor })
    },

    rawDataIsNull: {
      generateMessage:
          ({ documentationPageAnchor }: ValidationErrors.RawDataIsNull.TemplateVariables): string =>
              "Данные, переданные через первый параметр \"RawObjectDataProcessor.process()\" являются null в то " +
                "время как ожидался объект, не являющийся null.\n" +
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

      title: "Возникновение ошибки во время предвалидационных преобразований",

      generateDescription: (
        { stringifiedCaughtError }: ValidationErrors.PreValidationModificationFailed.TemplateVariables
      ): string =>
          "Предвалидационное преобразование этого свойства/элемента повлекло следующую ошибку: \n" +
            `${ stringifiedCaughtError }\n` +
          "Данные были помечены как невалидные потому что было выбрано \"ErrorHandlingStrategies.markingOfDataAsInvalid\" " +
            "в качестве стратегии обработки ошибки \"onPreValidationModificationFailed\" что не рекомендуется."

    },


    /* ┅┅┅ Объекты фиксированной схемы ┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅ */
    /* ╍╍╍ Разрешение на undefined ╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍ */
    forbiddenUndefinedValue: {
      title: "Запрещённое значение undefined",
      description:
          "Это свойство/элемент не определено или имеет явное значение `undefined`, что было явно запрещено."
    },

    conditionallyForbiddenUndefinedValue: {

      title: "Условно запрещённое значение `undefined`",

      generateDescription: (
        {
          verbalConditionWhenUndefinedIsForbiddenWithoutEndOfSentenceMark
        }: ValidationErrors.ConditionallyForbiddenUndefinedValue.TemplateVariables
      ): string =>
          "Это свойство/элемент не определено или имеет явное значение `undefined`, что запрещено если " +
            `${ verbalConditionWhenUndefinedIsForbiddenWithoutEndOfSentenceMark }, и это условие выполнено.`

    },

    conditionallyForbiddenNonUndefinedValue: {

      title: "Условно запрещённое не-undefined значение свойства/элемента",

      generateDescription: (
        {
          verbalConditionWhenMustBeUndefinedWithoutEndOfSentenceMark
        }: ValidationErrors.ConditionallyForbiddenNonUndefinedValue.TemplateVariables
      ): string =>
          "Это свойство/элемент имеет значение, отличное от `undefined`, что запрещено если " +
            ` ${ verbalConditionWhenMustBeUndefinedWithoutEndOfSentenceMark }, и это условие выполнено.`

    },


    /* ╍╍╍ Разрешение на null ╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍ */
    forbiddenNullValue: {
      title: "Запрещённое значение null",
      description: "Это свойство/элемент имеет явное значение `null`, что было явно запрещено."
    },

    conditionallyForbiddenNullValue: {

      title: "Условно запрещённое значение `null`",

      generateDescription: (
        {
          verbalConditionWhenNullIsForbiddenWithoutEndOfSentenceMark
        }: ValidationErrors.ConditionallyForbiddenNullValue.TemplateVariables
      ): string =>
          "Это свойство/элемент имеет значение `null`, что запрещено если " +
            `${ verbalConditionWhenNullIsForbiddenWithoutEndOfSentenceMark }, и это условие выполнено.`

    },

    conditionallyForbiddenNonNullValue: {

      title: "Условно запрещённое не-null значение свойства/элемента",

      generateDescription: (
        {
          verbalConditionWhenMustBeNullWithoutEndOfSentenceMark
        }: ValidationErrors.ConditionallyForbiddenNonNullValue.TemplateVariables
      ): string =>
          "Это свойство/элемент имеет значение, отличное от `null`, что запрещено если " +
            ` ${ verbalConditionWhenMustBeNullWithoutEndOfSentenceMark }, и это условие выполнено.`

    },


    /* ╍╍╍ Другое ╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍ */
    unableToDeletePropertyWithOutdatedKey: {

      title: "Невозможно удалить свойство с устаревшим именем",

      generateDescription: (
        { propertyNewKey }: ValidationErrors.UnableToDeletePropertyWithOutdatedKey.TemplateVariables
      ): string =>
          `Это свойство невозможно удалить после создания его копии с именем "${ propertyNewKey }" потому что оно ` +
            "неконфигурируемо, а в качестве стратегии обработки объекта были выбраны манипуляции с существующим " +
            "объектом, при этом опции `mustLeaveEvenRenamed` не было указано значение `true`."

    },

    unableToChangePropertyDescriptors: {

      title: "Невозможно изменить дескрипторы свойства",

      description:
          "Невозможно изменить дескрипторы данного свойства потому что оно неконфигурируемо, при этом в качестве " +
            "стратегии обработки были выбраны манипуляции с существующим объектом."


    },

    unableToUpdatePropertyValue: {

      title: "Невозможно обновить значение свойства",

      description:
          "Запрошено изменение значения этого свойства через подстановку значения по умолчанию либо предвалидационное " +
            "преобразование, однако это свойство доступно только для чтения."

    },

    unexpectedProperties: {

      title: "Неожидаемые свойства",

      generateDescription:
          ({ unexpectedProperties }: ValidationErrors.UnexpectedProperties.TemplateVariables): string =>
              "Следующие свойства не ожидались:\n" +
                unexpectedProperties.map((propertyKey: string): string => `● ${ propertyKey }`).join("\n")
    },

    customValidationFailed: {
      title: "Пользовательская валидация не пройдена",
      generateDescription:
          ({ customValidationDescription }: ValidationErrors.CustomValidationFailed.TemplateVariables): string =>
              `Следующее значение не прошло пользовательскую валидацию "${ customValidationDescription }".`
    },


    /* ┅┅┅ Ассоциативные массивы ┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅ */
    associativeArrayEntriesCountIsLessThanRequiredMinimum: {
      title: "Недостаточно вхождений у ассоциативного массива",
      generateDescription: (
        {
          actualEntriesCount,
          minimalEntriesCount
        }: ValidationErrors.AssociativeArrayEntriesCountIsLessThanRequiredMinimum.TemplateVariables
      ): string =>
          `Это значение типа "ассоциативный массив" имеет ${ actualEntriesCount } вхождений, ` +
            `хотя затребовано не менее ${ minimalEntriesCount }.`
    },

    associativeArrayPairsCountIsMoreThanAllowedMaximum: {
      title: "Слишком много вхождений у ассоциативного массива",
      generateDescription: (
        {
          maximalEntriesCount,
          actualEntriesCount
        }: ValidationErrors.AssociativeArrayPairsCountIsMoreThanAllowedMaximum.TemplateVariables
      ): string =>
          `Это значение типа "ассоциативный массив" имеет ${ actualEntriesCount } вхождений, ` +
            `хотя затребовано максимум ${ maximalEntriesCount }.`
    },

    associativeArrayPairsCountDoesNotMatchWithSpecifiedExactNumber: {
      title: "Несоответствие количества вхождений ассоциативного массива ожидаемому числу",
      generateDescription: (
        {
          exactEntriesCount,
          actualEntriesCount
        }: ValidationErrors.AssociativeArrayPairsCountDoesNotMatchWithSpecifiedExactNumber.TemplateVariables
      ): string =>
          `Это значение типа "ассоциативный массив" имеет ${ actualEntriesCount } вхождений, ` +
            `хотя затребовано ровно ${ exactEntriesCount }.`
    },

    forbiddenForSpecificKeysUndefinedOrNullValuesFoundInAssociativeArrayTypeObject: {
      title: "Запрещенные для определённых ключей значения undefined/null ассоциативного массива",
      generateDescription: (
        { keysOfEitherUndefinedOrNullValues }:
            ValidationErrors.ForbiddenForSpecificKeysUndefinedOrNullValuesFoundInAssociativeArrayTypeObject.TemplateVariables
      ): string =>
          "Значения следующих ключей ассоциативного массива либо имеют значение null, либо явный undefined, в то время " +
            "как для этих ключей такие значения были запрещены:\n" +
          keysOfEitherUndefinedOrNullValues.
              map((keyOfEitherUndefinedOrNullValue: string): string => `  ● ${ keyOfEitherUndefinedOrNullValue }`).
              join("\n")
    },

    disallowedKeysFoundInAssociativeArray: {
      title: "Запрещённые ключи ассоциативного массива",
      generateDescription: (
        { foundDisallowedKeys }: ValidationErrors.DisallowedKeysFoundInAssociativeArray.TemplateVariables
      ): string =>
          "Следующие ключи присутствуют в данном ассоциативном массиве в то время как эти ключ были запрещены.\n" +
          foundDisallowedKeys.
              map((foundDisallowedKey: string): string => `  ● ${ foundDisallowedKey }`).
              join("\n")
    },


    /* ┅┅┅ Индексные массивы и кортежи ┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅ */
    indexedArrayElementsCountIsLessThanRequiredMinimum: {
      title: "Недостаточно элементов у индексного массива",
      generateDescription: (
        {
          minimalElementsCount,
          actualElementsCount
        }: ValidationErrors.IndexedArrayElementsCountIsLessThanRequiredMinimum.TemplateVariables
      ): string =>
         `Это значение типа "индексный массив" имеет ${ actualElementsCount } элементов, ` +
            `хотя затребовано не менее ${ minimalElementsCount }.`
    },

    indexedArrayElementsCountIsMoreThanAllowedMaximum: {
      title: "Слишком много элементов у индексного массива",
      generateDescription: (
        {
          maximalElementsCount,
          actualElementsCount
        }: ValidationErrors.IndexedArrayElementsCountIsMoreThanAllowedMaximum.TemplateVariables
      ): string =>
          `Это значение типа "индексный массив" имеет ${ actualElementsCount } элементов, ` +
            `хотя затребовано максимум ${ maximalElementsCount }.`
    },

    indexedArrayOrTupleElementsCountDoesNotMatchWithSpecifiedExactNumber: {
      title: "Несоответствие количества элементов индексного массива или кортежа ожидаемому числу",
      generateDescription: (
        {
          exactElementsCount,
          actualElementsCount
        }: ValidationErrors.IndexedArrayOrTupleElementsCountDoesNotMatchWithSpecifiedExactNumber.TemplateVariables
      ): string =>
          `Это значение типа "индексный массив" или "кортеж" имеет ${ actualElementsCount } вхождений, ` +
            `хотя затребовано ровно ${ exactElementsCount }.`
    },


    /* ┅┅┅ Числа ┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅ */
    forbiddenNaN_Value: {
      title: "Запрещённое значение NaN свойства/элемента",
      description:
          "Данное значение числового свойства или элемента имеет значение NaN, что было запрещено в явном виде."
    },

    numericValueIsNotBelongToExpectedNumbersSet: {
      title: "Неверное множество чисел",
      generateDescription: (
        { expectedNumberSet }: ValidationErrors.NumericValueIsNotBelongToExpectedNumbersSet.TemplateVariables
      ): string =>
          "Вопреки ожиданиям, данное значение не принадлежит множеству " +
            `"${ rawObjectDataProcessorLocalization__russian.getLocalizedNumbersSet(expectedNumberSet) }"`
    },

    /* [ Подход ] Применимо также к строкам. */
    valueIsNotAmongAllowedAlternatives: {
      title: "Disallowed Alternative of Value",
      generateDescription: (
        { allowedAlternatives }: ValidationErrors.ValueIsNotAmongAllowedAlternatives.TemplateVariables
      ): string =>
          "Данное значение не является ни одним из допустимых вариантов:\n" +
          allowedAlternatives.map((allowedAlternative: string | number): string =>
              `  ○ ${ allowedAlternative }`).join("\n")
    },

    numericValueIsSmallerThanRequiredMinimum: {
      title: "Недостижение минимального значения",
      generateDescription: (
        { requiredMinimum }: ValidationErrors.NumericValueIsSmallerThanRequiredMinimum.TemplateVariables
      ): string =>
          `Данное значение меньше минимального возможного ${ requiredMinimum }.`
    },

    numericValueIsGreaterThanAllowedMaximum: {
      title: "Превышение максимального значения",
      generateDescription: (
        { allowedMaximum }: ValidationErrors.NumericValueIsGreaterThanAllowedMaximum.TemplateVariables
      ): string =>
          `Данное значение больше минимального допустимого ${ allowedMaximum }.`
    },


    /* ╍╍╍ Строки ╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍ */
    charactersCountIsLessThanRequired: {
      title: "Недостижение минимального количества символов",
      generateDescription: (
        {
          minimalCharactersCount,
          realCharactersCount
        }: ValidationErrors.CharactersCountIsLessThanRequired.TemplateVariables
      ): string =>
          `Данная строка имеет ${ realCharactersCount } символов в то время как затребовано минимум ${ minimalCharactersCount }.`
    },

    charactersCountIsMoreThanAllowed: {
      title: "Превышение максимального количества символов",
      generateDescription: (
        {
          maximalCharactersCount,
          realCharactersCount
        }: ValidationErrors.CharactersCountIsMoreThanAllowed.TemplateVariables
      ): string =>
          `Данная строка имеет ${ realCharactersCount } символов в то время как позволено не более ${ maximalCharactersCount }.`
    },

    charactersCountDoesNotMatchWithSpecified: {
      title: "Несоответствие установленному фиксированному числу символов",
      generateDescription: (
        {
          fixedCharactersCount,
          realCharactersCount
        }: ValidationErrors.CharactersCountDoesNotMatchWithSpecified.TemplateVariables
      ): string =>
          `Данная строка имеет ${ realCharactersCount } символов в ко время как затребовано ровно ${ fixedCharactersCount }.`
    },

    forbiddenCharactersFound: {
      title: "Запрещённые символы",
      generateDescription: (
        { foundForbiddenCharacters }: ValidationErrors.ForbiddenCharactersFound.TemplateVariables
      ): string =>
          "Данная строка включает в себя следующие символы, которые были запрещены:\n" +
            foundForbiddenCharacters.map((character: string): string => `● ${ character }`).join("\n")
    },

    regularExpressionMismatch: {
      title: "Несоответствие регулярному выражения",
      generateDescription: ({ regularExpression }: ValidationErrors.RegularExpressionMismatch.TemplateVariables): string =>
          `Данная строка не соответствует заданному регулярному выражению:\n ${ regularExpression.toString() }`
    },


    /* ╍╍╍ Другие ╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍ */
    disallowedBooleanValueVariant: {
      title: "Запрещённый булевский вариант",
      generateDescription: (
        { disallowedVariant }: ValidationErrors.DisallowedBooleanValueVariant.TemplateVariables
      ): string =>
          `Данное булевское значение является ${ disallowedVariant } в то время как позволено только ${ !disallowedVariant }.`
    },

    unsupportedValueType: {
      title: "Неподдерживаемый тип значения",
      generateDescription:
          ({ targetPropertyType }: ValidationErrors.UnsupportedValueType.TemplateVariables): string =>
              `Данное значение имеет тип ${ targetPropertyType }, который на данный момент не поддерживается как любой ` +
                " другой несовместимый с JSON тип."
    }

  },


  /* ━━━ Бросаемые ошибки ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  /* [ Примечание для рецензоров ]
   * В отличие от сообщений об ошибках валидации, сообщения бросаемых ошибок не являются частью шаблона
   *   "generateValidationErrorMessage", а потому такие выражения, как "это свойство" или "этот элемент" будут уже
   *   неопределёнными. */
  throwableErrors: {

    objectSchemaNotSpecified: {

      title: "Схема объект не определена",

      generateDescription: (
        {
          targetPropertyDotSeparatedQualifiedName,
          documentationPageAnchor
        }: ThrowableErrors.MutuallyExclusiveTransformationsBetweenUndefinedAndNull.TemplateVariables
      ): string =>
          `Схема объекта не определена для "${ targetPropertyDotSeparatedQualifiedName }". ` +
          rawObjectDataProcessorLocalization__russian.generateSeeMoreSentence({ documentationPageAnchor })
    },

    mutuallyExclusiveTransformationsBetweenUndefinedAndNull: {

      title: "Взаимоисключающие преобразования между undefined и null",

      generateDescription: (
        {
          targetPropertyDotSeparatedQualifiedName,
          documentationPageAnchor
        }: ThrowableErrors.MutuallyExclusiveTransformationsBetweenUndefinedAndNull.TemplateVariables
      ): string =>
        "Обоим опциям \"mustTransformUndefinedToNull\" и \"mustTransformNullToUndefined\" установлено булевское значение " +
          `true для свойства "${ targetPropertyDotSeparatedQualifiedName }", что является противоречием. ` +
        rawObjectDataProcessorLocalization__russian.generateSeeMoreSentence({ documentationPageAnchor })
    },

    preValidationModificationFailed: {

      title: "Предвалидационное преобразование привело к ошибке",

      generateDescription: (
        {
          targetPropertyDotSeparatedQualifiedName,
          documentationPageAnchor
        }: ThrowableErrors.PreValidationModificationFailed.TemplateVariables
      ): string =>
        "Произошла ошибка при предвалидационном преобразовании свойства/элемента  " +
          `"${ targetPropertyDotSeparatedQualifiedName }". ` +
        "Эта ошибка была брошена потому что активной стратегией обработки ошибки \"onPreValidationModificationFailed\" " +
          "является \"ErrorHandlingStrategies.throwingOfError\", что по умолчанию. " +
        rawObjectDataProcessorLocalization__russian.generateSeeMoreSentence({ documentationPageAnchor })

    },

    propertyUndefinedabilityNotSpecified: {

      title: "Не указана стратегия обработки undefined-значений",
      generateDescription: (
        {
          targetPropertyDotSeparatedQualifiedName,
          documentationPageAnchor
        }: ThrowableErrors.PropertyUndefinedabilityNotSpecified.TemplateVariables
      ): string =>
        `Не указано, как обрабатывать undefined-значения у свойства "${ targetPropertyDotSeparatedQualifiedName }". ` +
        rawObjectDataProcessorLocalization__russian.generateSeeMoreSentence({ documentationPageAnchor })
    },

    propertyNullabilityNotSpecified: {

      title: "Не указана стратегия обработки undefined-значений",
      generateDescription: (
        {
          targetPropertyDotSeparatedQualifiedName,
          documentationPageAnchor
        }: ThrowableErrors.PropertyNullabilityNotSpecified.TemplateVariables
      ): string =>
          `Не указано, как обрабатывать null-значения у свойства "${ targetPropertyDotSeparatedQualifiedName }". ` +
          rawObjectDataProcessorLocalization__russian.generateSeeMoreSentence({ documentationPageAnchor })

    },

    dataTypeNotSpecified: {

      title: "Неподдерживаемый либо неуказанный тип данных",
      generateDescription: (
        {
          targetPropertyDotSeparatedQualifiedName,
          specifiedStringifiedType,
          documentationPageAnchor
        }: ThrowableErrors.DataTypeNotSpecified.TemplateVariables
      ): string =>
          (
            isUndefined(specifiedStringifiedType) ?
                "Тип данных не был " :
                `Неподдерживаемый тип данных "${ specifiedStringifiedType } был `
          ) +
          `указан для свойства/элемента "${ targetPropertyDotSeparatedQualifiedName }". ` +
          rawObjectDataProcessorLocalization__russian.generateSeeMoreSentence({ documentationPageAnchor })

    },

    unableToDeletePropertyWithOutdatedKey: {

      title: "Невозможно удалить свойство с устаревшим ключом",

      generateDescription: (
        {
          targetPropertyDotSeparatedQualifiedName,
          propertyNewKey,
          documentationPageAnchor
        }: ThrowableErrors.UnableToDeletePropertyWithOutdatedKey.TemplateVariables
      ): string =>
          `Невозможно удалить свойство "${ targetPropertyDotSeparatedQualifiedName }" после после создания его копии ` +
            `с именем "${ propertyNewKey }" потому что оно не конфигурируемо, а в качестве стратегии обработки ` +
            "объекта были выбраны манипуляции с уже существующим объектом, при этом опции \"mustLeaveEvenRenamed\" " +
            "не было указано значение true." +
          rawObjectDataProcessorLocalization__russian.generateSeeMoreSentence({ documentationPageAnchor })

    },

    unableToChangePropertyDescriptors: {

      title: "Невозможно обновить дескрипторы свойств",

      generateDescription: (
        {
          targetPropertyDotSeparatedQualifiedName,
          documentationPageAnchor
        }: ThrowableErrors.UnableToChangePropertyDescriptors.TemplateVariables
      ): string =>
          `Невозможно изменить дескрипторы свойства ${ targetPropertyDotSeparatedQualifiedName }, потому что оно ` +
            "неконфигурируемо, при этом в качестве стратегии обработки были выбраны манипуляции с уже существующим объектом. " +
          rawObjectDataProcessorLocalization__russian.generateSeeMoreSentence({ documentationPageAnchor })

    },

    unableToUpdatePropertyValue: {

      title: "Невозможно обновить значение свойства",

      generateDescription: (
        {
          targetPropertyDotSeparatedQualifiedName,
          documentationPageAnchor
        }: ThrowableErrors.UnableToUpdatePropertyValue.TemplateVariables
      ): string =>
          `Запрошено изменение значение свойства "${ targetPropertyDotSeparatedQualifiedName }" через подстановку ` +
            "значения по умолчанию либо предвалидационное преобразование, однако это свойство доступно только для чтения. " +
          rawObjectDataProcessorLocalization__russian.generateSeeMoreSentence({ documentationPageAnchor })

    },

    mutuallyExclusiveAssociativeArrayKeysLimitations: {

      title: "Взаимоисключающие ограничения ключей ассоциативного массива",

      generateDescription: (
        {
          targetPropertyDotSeparatedQualifiedName,
          documentationPageAnchor
        }: ThrowableErrors.
            MutuallyExclusiveAssociativeArrayKeysLimitations.TemplateVariables
      ): string =>
          "Для " +
              (
                isNull(targetPropertyDotSeparatedQualifiedName) ?
                  "корневого ассоциативного массива " :
                  `ассоциативного массива "${ targetPropertyDotSeparatedQualifiedName }" `
              ) +
              "указаны как разрешённые, так и запрещённые ключи, что является противоречием. " +
              "Возможно указать либо разрешённые ключи, либо запрещённые, но не оба вместе. " +
              rawObjectDataProcessorLocalization__russian.generateSeeMoreSentence({ documentationPageAnchor })
    },

    incompatibleValuesTypesAlternatives: {
      title: "Несовместимые варианты значений",
      generateDescription: (
        {
          isIndexedArrayLikeType,
          documentationPageAnchor
        }: ThrowableErrors.IncompatibleValuesTypesAlternatives.TemplateVariables
      ): string =>
          (
            isIndexedArrayLikeType ?
                "`ValuesTypesIDs.indexedArray` (алиас: `Array`) и `ValuesTypesIDs.tuple`" :
                "`ValuesTypesIDs.fixedSchemaObject` (алиса: `Object`) и `ValuesTypesIDs.associativeArray`"
          ) +
            "являются несовместимыми вариантами для `ValuesTypesIDs.polymorphic` потому что с точки зрения ECMAScript " +
              "оба являются " +
            (isIndexedArrayLikeType ? "`Array`" : "`Object`") +
          rawObjectDataProcessorLocalization__russian.generateSeeMoreSentence({ documentationPageAnchor })
    },

    bothAllowedAndForbiddenCharactersSpecified: {
      title: "Взаимоисключающие ограничения конкретных символов",
      generateDescription: (
        {
          targetPropertyDotSeparatedQualifiedName,
          documentationPageAnchor
        }: ThrowableErrors.BothAllowedAndForbiddenCharactersSpecified.TemplateVariables
      ): string =>
          `Для строкового свойства/элемента "${ targetPropertyDotSeparatedQualifiedName }" указаны как разрешённые, ` +
            "так и запрещённые символы, что является противоречием." +
          "Возможно указать либо разрешённые символы, либо запрещённые, но не оба вместе. " +
          rawObjectDataProcessorLocalization__russian.generateSeeMoreSentence({ documentationPageAnchor })
    }

  },


  /* ━━━ Предупреждения ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  warnings: {

    preValidationModificationFailed: {

      title: "Предвалидационное преобразование привело к ошибке",

      generateDescription: (
        {
          targetPropertyDotSeparatedQualifiedName,
          stringifiedCaughtError,
          documentationPageAnchor
        }: Warnings.PreValidationModificationFailed.TemplateVariables
      ): string =>
          "Произошла ошибка при предвалидационном преобразовании свойства/элемента  " +
            `"${ targetPropertyDotSeparatedQualifiedName }".\n` +
          `${ stringifiedCaughtError }\n` +
          "Эта ошибка была выведена в виде предупреждения потому что активной стратегией обработки ошибки " +
            "\"onPreValidationModificationFailed\" было выбрано " +
            "\"ErrorHandlingStrategies.warningWithoutMarkingOfDataAsInvalid\", что не рекомендуется. " +
          rawObjectDataProcessorLocalization__russian.generateSeeMoreSentence({ documentationPageAnchor })

    },

    unableToDeletePropertyWithOutdatedKey: {

      title: "Невозможно удалить свойство с устаревшим ключом",

      generateDescription: (
        {
          targetPropertyDotSeparatedQualifiedName,
          propertyNewKey,
          documentationPageAnchor
        }: Warnings.UnableToDeletePropertyWithOutdatedKey.TemplateVariables
      ): string =>
          `Невозможно удалить свойство "${ targetPropertyDotSeparatedQualifiedName }" после после создания его копии ` +
            `с именем "${ propertyNewKey }" потому что оно не конфигурируемо, а в качестве стратегии обработки ` +
            "объекта были выбраны манипуляции с уже существующим объектом, при этом опции \"mustLeaveEvenRenamed\" " +
            "не было указано значение true." +
          "Эта ошибка была выведена в виде предупреждения потому что активной стратегией обработки ошибки " +
            "\"onPreValidationModificationFailed\" было выбрано " +
            "\"ErrorHandlingStrategies.warningWithoutMarkingOfDataAsInvalid\", что не рекомендуется. " +
          rawObjectDataProcessorLocalization__russian.generateSeeMoreSentence({ documentationPageAnchor })

    },

    unableToChangePropertyDescriptors: {

      title: "Невозможно обновить дескрипторы свойств",

      generateDescription: (
        {
          targetPropertyDotSeparatedQualifiedName,
          documentationPageAnchor
        }: Warnings.UnableToChangePropertyDescriptors.TemplateVariables
      ): string =>
            `Невозможно изменить дескрипторы свойства ${ targetPropertyDotSeparatedQualifiedName }, потому что оно ` +
            "неконфигурируемо, при этом в качестве стратегии обработки были выбраны манипуляции с уже существующим объектом. " +
          "Эта ошибка была выведена в виде предупреждения потому что активной стратегией обработки ошибки " +
            "\"onPreValidationModificationFailed\" было выбрано " +
            "\"ErrorHandlingStrategies.warningWithoutMarkingOfDataAsInvalid\", что не рекомендуется. " +
          rawObjectDataProcessorLocalization__russian.generateSeeMoreSentence({ documentationPageAnchor })

    },

    unableToUpdatePropertyValue: {

      title: "Невозможно обновить значение свойства",

      generateDescription: (
        {
          targetPropertyDotSeparatedQualifiedName,
          documentationPageAnchor
        }: Warnings.UnableToUpdatePropertyValue.TemplateVariables
      ): string =>
          `Запрошено изменение значение свойства "${ targetPropertyDotSeparatedQualifiedName }" через подстановку ` +
            "значения по умолчанию либо предвалидационное преобразование, однако это свойство доступно только для чтения. " +
          "Эта ошибка была выведена в виде предупреждения потому что активной стратегией обработки ошибки " +
            "\"onPreValidationModificationFailed\" было выбрано " +
            "\"ErrorHandlingStrategies.warningWithoutMarkingOfDataAsInvalid\", что не рекомендуется. " +
          rawObjectDataProcessorLocalization__russian.generateSeeMoreSentence({ documentationPageAnchor })

    }

  },

  getLocalizedValueType(valueTypeID: RawObjectDataProcessor.ValuesTypesIDs): string {

    switch (valueTypeID) {

      case RawObjectDataProcessor.ValuesTypesIDs.number: return "число";
      case RawObjectDataProcessor.ValuesTypesIDs.string: return "строка";
      case RawObjectDataProcessor.ValuesTypesIDs.boolean: return "булевский";

      case RawObjectDataProcessor.ValuesTypesIDs.fixedSchemaObject: return "объект фиксированной структуры";
      case RawObjectDataProcessor.ValuesTypesIDs.associativeArray: return "объект типа «ассоциативный массив»";
      case RawObjectDataProcessor.ValuesTypesIDs.indexedArray: return "индексный массив";
      case RawObjectDataProcessor.ValuesTypesIDs.tuple: return "кортеж";

      case RawObjectDataProcessor.ValuesTypesIDs.ambiguousObject: return "неоднозначный объект";
      case RawObjectDataProcessor.ValuesTypesIDs.ambiguousArray: return "неоднозначный массив";

      case RawObjectDataProcessor.ValuesTypesIDs.polymorphic: return "полиморфный";

    }

  },

  getLocalizedNumbersSet(numberSet: RawObjectDataProcessor.NumbersSets): string {
    switch (numberSet) {
      case RawObjectDataProcessor.NumbersSets.naturalNumber: return "натуральное число";
      case RawObjectDataProcessor.NumbersSets.positiveIntegerOrZero: return "положительное целое число либо ноль";
      case RawObjectDataProcessor.NumbersSets.naturalNumberOrZero: return "натуральное число либо ноль";
      case RawObjectDataProcessor.NumbersSets.negativeInteger: return "отрицательное целое число";
      case RawObjectDataProcessor.NumbersSets.negativeIntegerOrZero: return "отрицательное целое число либо ноль";
      case RawObjectDataProcessor.NumbersSets.anyInteger: return "любое целое число";
      case RawObjectDataProcessor.NumbersSets.positiveDecimalFraction: return "положительная десятичная дробь";
      case RawObjectDataProcessor.NumbersSets.positiveDecimalFractionOrZero: return "положительная десятичная дробь либо ноль";
      case RawObjectDataProcessor.NumbersSets.negativeDecimalFraction: return "отрицательная десятичная дробь";
      case RawObjectDataProcessor.NumbersSets.negativeDecimalFractionOrZero: return "отрицательная десятичная дробь либо ноль";
      case RawObjectDataProcessor.NumbersSets.anyDecimalFraction: return "любая десятичная дробь";
      case RawObjectDataProcessor.NumbersSets.anyDecimalFractionOrZero: return "любая десятичная дробь либо ноль";
      case RawObjectDataProcessor.NumbersSets.anyRealNumber: return "любое действительное число";
      case RawObjectDataProcessor.NumbersSets.positiveRealNumber: return "положительное действительное число";
      case RawObjectDataProcessor.NumbersSets.negativeRealNumber: return "отрицательное действительное число";
      case RawObjectDataProcessor.NumbersSets.positiveRealNumberOrZero: return "положительное действительное число либо ноль";
      case RawObjectDataProcessor.NumbersSets.negativeRealNumberOrZero: return "отрицательное действительное число либо ноль";
    }
  }

};
