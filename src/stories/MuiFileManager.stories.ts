import type { Meta, StoryObj } from "@storybook/react";

import MuiFileManager from "../index";

const meta = {
  title: "Example/MuiFileManager",
  component: MuiFileManager,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
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
