import type { Meta, StoryObj } from "@storybook/react";
import About, { IAboutProps } from "./About";

export default {
  title: "Components/Profile/About",
  component: About,
  decorators: [
    (Story, { args }) => (
      <div className="w-full p-4 flex justify-center bg-secondaryGrey">
        <Story args={args} />
      </div>
    ),
  ],
} as Meta<typeof About>;

type Story = StoryObj<IAboutProps>;

export const regular: Story = {
  args: {
    title: "Bienvenue dans l'univers créatif de Léna",
    description:
      "Salut ! Je suis M. Weber, une designer graphique passionnée par la fusion entre l'art et la technologie. Mes pinceaux virtuels dansent sur les pixels, créant ainsi des visuels uniques qui racontent des histoires vibrantes. Diplômée de l'École d'Art Émergence, perchée au cœur des montagnes, j'ai puisé mon inspiration dans la nature environnante.\nJ'ai eu le privilège de collaborer avec des marques innovantes, telles que Lumière Éclatante (cosmétiques bio) et TechnoFusion (startup tech audacieuse). Mon style est une symphonie de couleurs audacieuses et de formes minimalistes, capturant l'essence même de chaque projet. Ici, je partage mon voyage artistique, et j'ai hâte de vous aider à donner vie à vos idées. Explorez, appréciez et n'hésitez pas à me contacter pour des projets sur mesure ! 🌟 #ArtEtDesign #CréativitéSansLimites",
  },
};
