import fs from "node:fs";
import Mustache from "mustache";
import path from "path";

export const getTemplateString = ({
  template,
  vars,
}: {
  template: string;
  vars: Record<string, any>;
}): string => {
  const templatePath = path.join(
    process.cwd(),
    `/src/modules/email/templates/${template}.html`
  );
  const data = fs.readFileSync(templatePath, { encoding: "utf8", flag: "r" });
  return Mustache.render(data, vars);
};
