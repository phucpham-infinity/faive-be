module.exports = {
  prompt: async ({ inquirer }) => {
    const { pathCase, pascalCase } = await import("change-case");

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
          namePathCase: pathCase(answers.name),
          namePascalCase: pascalCase(answers.name),
        };
      });
  },
};
