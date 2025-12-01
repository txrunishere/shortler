import { redirectToWebsite } from "@/api/url.api";
import { Loader } from "@/components/common";
import { useFetch } from "@/hooks/use-fetch";
import { useEffect } from "react";
import { useParams } from "react-router";

export const RedirectLink = () => {
  const { link } = useParams();
  const {
    fn: fnRedirect,
    loading: redirectLoading,
    data: redirectData,
  } = useFetch(redirectToWebsite);

  useEffect(() => {
    fnRedirect({ short_url: link }).then(() => {
      if (redirectData) {
        const link = document.createElement("a");
        link.setAttribute("href", redirectData.original_url);
        link.click();
      }
    });
  }, [redirectLoading]);

  return (
    <div className="space-y-10">
      {redirectLoading && <Loader />}
      <p>Redirecting...</p>
    </div>
  );
};
