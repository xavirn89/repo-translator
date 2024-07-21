import { LanguageItem } from "@/types/languages";

export const promptPhaseOne = (repositoryLanguage: LanguageItem) => {
  return `
  I have several React components files and I need to extract all plain text strings that will be displayed on the webpage for the user. I want these strings organized in a nested JSON format, with each component having its own section. The JSON should look like this example:
  {
    'ComponentName': {
      'MEANINGFUL_TEXT_VARIABLE_NAME': 'Displayed Text',
      ...
    },
    ...
  }
  Please note the following:
  1. Use meaningful and descriptive names for the text variable names based on the context where the text appears in the component.
  2. Only include components that contain displayable text strings. If a component does not contain displayable text strings, do not include it in the JSON.
  3. Ensure that each text variable name is relevant to its usage in the component.
  4. Answer me only the JSON, dont tell me how you did it or anything else.
  5. The language of the repository is ${repositoryLanguage?.name}, If you find any orthographic or grammatical errors, correct while you create the JSON.
  `;
}

export const promptPhaseTwo = (repositoryLanguage: LanguageItem, translationLanguages: LanguageItem[], phase1Response: string | null) => {
  return `
  I have this JSON object that contains all the text strings from my webpage in ${repositoryLanguage.name}. I want that you create copies of the JSON object in ${translationLanguages.map((language) => language.name).join(', ')} with the text strings translated to each language. The JSON objects should look like this example:
  ${phase1Response}
  Please note the following:
  1. Translate only the text strings, do not translate the variable names.
  2. Ensure that the translations are accurate and contextually correct.
  3. Separate each JSON object with triple backticks to ensure clear distinction between different language translations.
  4. Answer me ONLY the JSON objects, dont tell me how you did it or starting or ending messages.
  `;
}