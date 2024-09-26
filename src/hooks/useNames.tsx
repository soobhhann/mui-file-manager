import { useMediaContext } from "../MuiFileManager";
import { KeywordsTypes } from "../interfaces/MediaTypes";

const useNames = () => {
  const { keywords } = useMediaContext();

  const t = (name: keyof KeywordsTypes) => {
    if (keywords && keywords[name]) return keywords[name];
    else return name;
  };
  return { t };
};

export default useNames;
