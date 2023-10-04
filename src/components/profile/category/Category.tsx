import Button from "../Button";
import { TCategory } from "./category";

export interface ICategoryProps {
  category: TCategory;
}

export default function Category(props: ICategoryProps): JSX.Element {
  return <Button onClick={() => {}} text={props.category} className="text-[#4A4A4A] font-semibold bg-white" />;
}
