import { ClassRequiredInitializationHasNotBeenExecutedError } from "@yamato-daiwa/es-extensions";


const ClassRequiredInitializationHasNotBeenExecutedErrorLocalization__Russian:
    ClassRequiredInitializationHasNotBeenExecutedError.Localization = {

  defaultTitle: "Обязательная инициализация класса не была выполнена",
  genericDescriptionPartTemplate:
      (
          parametersObject: ClassRequiredInitializationHasNotBeenExecutedError.Localization.
              GenericDescriptionPartTemplateParameters
      ): string =>
          `Класс ${parametersObject.className} требует инициализации, но инициализирующий метод ` +
          `${parametersObject.initializingMethodName} не был вызван.`
};


export default ClassRequiredInitializationHasNotBeenExecutedErrorLocalization__Russian;
