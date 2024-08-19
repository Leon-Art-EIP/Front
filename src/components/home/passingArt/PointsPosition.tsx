import { Circle, CircleTwoTone } from "@mui/icons-material";

export interface IPointPositionsProps {
  nbrPoints: number;
  position: number;
}

export default function PointsPosition(props: IPointPositionsProps): JSX.Element {
  if (props.position > props.nbrPoints) {
    return <></>;
  }
  return (
    <div className="flex gap-1">
      {Array.from(Array(props.nbrPoints).keys()).map((_, index) => {
        if (index + 1 === props.position) {
          return <CircleTwoTone key={`point-${index}`} className="text-primary" style={{ fontSize: 12 }} />;
        }
        return <Circle key={`point-${index}`} className="text-secondary-disabled" style={{ fontSize: 12 }} />;
      })}
    </div>
  );
}
