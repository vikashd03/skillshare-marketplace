import { Category, CategoryLabelMap } from "@/utils/constants";
import { SkillDataWithProvider } from "@/utils/types";
import React from "react";

export enum SKILLS_FROM {
  MY_SKILLS = "MySkills",
  ALL_SKILLS = "AllSkills",
}

const Skills = ({
  skills,
  actionComp,
  from,
}: {
  skills: SkillDataWithProvider[];
  actionComp: (skill: any) => React.JSX.Element;
  from: SKILLS_FROM;
}) => {
  return (
    <div className="flex flex-wrap px-[40px] py-[50px] gap-[50px]">
      {skills.map((skill) => (
        <div
          className="w-[200px] h-[250px] bg-white shadow-md rounded-xl p-4 flex flex-col justify-between border border-gray-200 text-sm"
          key={skill.id}
        >
          {actionComp(skill)}
          <div className="space-y-1">
            <div>
              <span className="font-semibold">Category:</span>&nbsp;&nbsp;
              {CategoryLabelMap[skill.category as Category] ?? skill.category}
            </div>
            <div>
              <span className="font-semibold">Experience:</span>&nbsp;&nbsp;
              {skill.experience} yrs
            </div>
            <div>
              <span className="font-semibold">Nature:</span>&nbsp;&nbsp;
              {skill.nature}
            </div>
            <div>
              <span className="font-semibold">Rate:</span>&nbsp;&nbsp;
              {skill.rate}
              &nbsp;
              {skill.currency}
            </div>
          </div>
          {from === SKILLS_FROM.ALL_SKILLS ? (
            <div className="text-xs break-words">
              <span className="font-semibold text-gray-500">Provider:</span>
              &nbsp;&nbsp;
              <span className="font-bold">
                {skill.provider.name || skill.provider.company_name}
              </span>
            </div>
          ) : (
            <div />
          )}
        </div>
      ))}
    </div>
  );
};

export default Skills;
