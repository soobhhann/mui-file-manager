import type { Meta, StoryObj } from "@storybook/react";

import MuiFileManager from "../index";

const meta = {
  title: "Example/MuiFileManager",
  component: MuiFileManager,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    currentPath: { type: "string" },
  },
  args: {
    currentPath: "/",
    data: {
      folders: [{ name: "test", full_path: "/test", path: "/test" }],
      files: [
        {
          id: 1,
          full_path: "string",
          name_without_prefix: "img",
          mime_type: "img/png",
        },
      ],
    },
  },
} satisfies Meta<typeof MuiFileManager>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    setCurrentPath: (arg: string) => console.log(arg),
    currentPath: "/",
    permissions: {
      file: ["rename", "cut", "copy", "remove", "upload", "create", "list"],
      folder: ["rename", "cut", "copy", "remove", "upload", "create", "list"],
    },
    data: {
      folders: [{ name: "test", full_path: "/test", path: "/test" }],
      files: [
        {
          id: 1,
          full_path: "string",
          name_without_prefix: "img",
          mime_type: "img/png",
        },
      ],
    },
  },
};
