import { LocalStorageEnum } from "@/enums/local-storage";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { TTokenInfo } from "@/models/security/token-info";

export function useToken() {
  const getTokenInfo = () => {
    let token = useSelector((state: RootState) => state.auth.token);

    if (token === null) {
      const accToken = localStorage.getItem(
        LocalStorageEnum[LocalStorageEnum.AccessToken]
      );

      token = {
        accessToken: accToken ? accToken : undefined,
        refreshToken: undefined,
      };
    }

    if (token?.accessToken) {
      const decodedInfo = jwtDecode<any>(token?.accessToken);
      const tokenInfo: TTokenInfo = {
        enrolledUiFeatures: JSON.parse(decodedInfo.enrolleduifeatures),
        userName: decodedInfo.email,
      };
      //console.log(tokenInfo);
      return tokenInfo;
    }

    return undefined;
  };

  const tokenInfo = getTokenInfo();

  return { tokenInfo };
}
