import React, { useState } from "react";
import Select from "react-select";
import { CodeSnippet, CodeSummary } from "./sections";
import { useStateHook, useEffectHook } from "./hooks";

import "./styles/App.css";

export const App = () => {
  const [currentCodeSummary, setCurrentCodeSummary] = useState<React.ReactNode>(
    useStateHook.summary
  );
  const [currentCodeSnippet, setCurrentCodeSnippet] = useState(useStateHook.snippets[0]);
  const [listOfCodeSnippets] = useState(useStateHook.snippets);

  const snippetDropdownOptions = listOfCodeSnippets.map((codeSnippet, idx) => {
    return { value: codeSnippet.id, label: codeSnippet.title };
  });

  const hookDropdownOptions = [
    { value: "use-state", label: "useState" },
    { value: "use-effect", label: "useEffect" }
  ];

  const [currentSnippetDropdownOption, setCurrentSnippetDropdownOption] = useState(
    snippetDropdownOptions[0]
  );
  const [currentHookDropdownOption, setCurrentHookDropdownOption] = useState(
    hookDropdownOptions[0]
  );

  const snippetSelectDropdown = (
    <Select
      value={currentSnippetDropdownOption}
      options={snippetDropdownOptions}
      onChange={(selectedOption: any) => {
        const selectedCodeSnippet = listOfCodeSnippets.find(
          codeSnippet => codeSnippet.id === selectedOption.value
        );

        if (selectedCodeSnippet) {
          setCurrentCodeSnippet(selectedCodeSnippet);
          setCurrentSnippetDropdownOption(selectedOption);
        }
      }}
    />
  );

  const hookSelectDropdown = (
    <Select
      value={currentHookDropdownOption}
      options={hookDropdownOptions}
      menuPlacement="top"
      onChange={(selectedOption: any) => {
        setCurrentHookDropdownOption(selectedOption);
      }}
    />
  );

  return (
    <div id="app">
      <div className="app__code-summary">
        <CodeSummary
          currentCodeSummary={currentCodeSummary}
          dropdownElement={snippetSelectDropdown}
        />
        <div className="app__code-summary-footer">
          <div className="app__code-summary-footer-dropdown">{hookSelectDropdown}</div>
        </div>
      </div>
      <div className="app__code-snippet">
        <CodeSnippet codeSnippet={currentCodeSnippet} />
      </div>
    </div>
  );
};
