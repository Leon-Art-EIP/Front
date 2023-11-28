import type { Meta, StoryObj } from "@storybook/react";
import IconLabel, { IIconLabelProps } from "./IconLabel";
import tabs from "../../app/tabs";
import { AccountCircle } from "@mui/icons-material";

export default {
  title: "Components/IconLabel",
  component: IconLabel,
} as Meta<typeof IconLabel>;

type Story = StoryObj<IIconLabelProps>;

export const Regular: Story = {
  args: {
    icon: AccountCircle,
    text: "Informations personnelles",
  },
};
