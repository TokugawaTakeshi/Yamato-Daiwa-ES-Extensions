import type { ClassRequiredInitializationHasNotBeenExecutedError } from "@yamato-daiwa/es-extensions";


export const classRequiredInitializationHasNotBeenExecutedErrorLocalization__russian:
    ClassRequiredInitializationHasNotBeenExecutedError.Localization =
{
  defaultTitle: "Обязательная инициализация класса не была выполнена",
  generateDescription:
      (
        {
          className,
          initializingMethodName
        }: ClassRequiredInitializationHasNotBeenExecutedError.Localization.DescriptionTemplateVariables
      ): string =>
          `Класс "${ className }" требует инициализацию, но инициализирующий метод "${ initializingMethodName }" ` +
            "не был вызван."
};
