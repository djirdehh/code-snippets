export interface CodeSnippet {
  id: string;
  title: string;
  code: string;
  notes: {
    [index: string]: string;
  };
}
