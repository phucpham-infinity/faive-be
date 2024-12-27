module.exports = {
  prompt: async ({ inquirer }) => {
    const { pascalCase, camelCase } = await import("change-case");

    return inquirer
      .prompt([
        {
          type: "input",
          name: "name",
          message: "What is the name of the module?",
        },
      ])
      .then((answers) => {
        return {
          ...answers,
          nameCamelCase: camelCase(answers.name),
          namePascalCase: pascalCase(answers.name),
        };
      });
  },
};
