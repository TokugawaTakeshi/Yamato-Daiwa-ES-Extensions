import type { ClassRequiredInitializationHasNotBeenExecutedError } from "@yamato-daiwa/es-extensions";


const ClassRequiredInitializationHasNotBeenExecutedErrorLocalization__Russian:
    ClassRequiredInitializationHasNotBeenExecutedError.Localization = {

  defaultTitle: "Обязательная инициализация класса не была выполнена",
  generateDescription:
      (
        namedParameters: ClassRequiredInitializationHasNotBeenExecutedError.Localization.DescriptionTemplateNamedParameters
      ): string =>
          `Класс '${ namedParameters.className }' требует инициализацию, но инициализирующий метод ` +
          `'${ namedParameters.initializingMethodName }' не был вызван.`
};


export default ClassRequiredInitializationHasNotBeenExecutedErrorLocalization__Russian;
