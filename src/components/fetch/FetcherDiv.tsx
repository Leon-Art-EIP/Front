import { TMethod } from "../../interfaces/fetch/methods";
import Fetcher from "./Fetcher";

export interface IFetcherDivProps {
  children?: React.ReactNode;
  nbFetchs: number;
  handleOk?: (json?: any) => void;
  method: TMethod;
  route: string;
  successStr: string;
  body?: string | FormData;
  setIsLoading?: (isLoading: boolean) => void;
}

export default function FetcherDiv(props: IFetcherDivProps): JSX.Element {
  return (
    <>
      {props.nbFetchs > 0 && (
        <Fetcher
          nbFetchs={props.nbFetchs}
          handleOk={props.handleOk}
          method={props.method}
          route={props.route}
          successStr={props.successStr}
          body={props.body}
          setIsLoading={props.setIsLoading}
        ></Fetcher>
      )}
      {props.children}
    </>
  );
}
