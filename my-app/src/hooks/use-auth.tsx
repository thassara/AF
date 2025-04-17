import { FeatureEnum } from "@/enums/feature";
import { useToken } from "./use-token";

export function useAuth() {
  const token = useToken();
  const hasPermission = (feature: FeatureEnum) => {
    const tokenDetails = token.tokenInfo;
    if (tokenDetails) {
      return tokenDetails.enrolledUiFeatures?.includes(feature);
    }

    return false;
  };

  return { hasPermission };
}
