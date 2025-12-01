import { deleteUrl } from "@/api/url.api";
import { useUser } from "@/app/providers/user-provider";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useFetch } from "@/hooks/use-fetch";
import config from "@/lib/config";
import { Copy, Link, Trash } from "lucide-react";
import QRCode from "react-qrcode-logo";
import { BarLoader } from "react-spinners";

export const LinkCard = ({ url, fetchUrls }) => {
  const { user } = useUser();

  const { fn: fnDeleteUrl, loading: deleteLoading } = useFetch(deleteUrl);

  const handleDeleteUrl = async () => {
    await fnDeleteUrl({ url_id: url.id });
    await fetchUrls({ user_id: user?.id });
  };

  return (
    <>
      <div>
        {deleteLoading && (
          <BarLoader
            color="white"
            width={"98%"}
            className="mx-auto rounded-full"
          />
        )}
        <Card className="flex flex-col justify-between gap-4 p-4 sm:flex-row">
          <div className="flex w-full flex-col gap-4 sm:flex-row">
            <div className="shrink-0">
              <QRCode value={url.original_url} />
            </div>

            <CardContent className="flex w-full flex-col gap-2 p-0">
              <span className="text-2xl leading-snug font-bold sm:text-3xl">
                {url.title}
              </span>
              <span className="text-xl font-semibold break-all text-blue-500 hover:underline sm:text-2xl">
                <a
                  target="_blank"
                  href={url.custom_url ? url.custom_url : url.short_url}
                >
                  {config.FRONTEND_URL}/
                  {url.custom_url ? url.custom_url : url.short_url}
                </a>
              </span>
              <span className="text-muted-foreground flex items-center gap-2 text-sm break-all sm:text-lg">
                <Link size={18} />
                {url.original_url}
              </span>

              <span className="text-muted-foreground text-xs sm:text-sm">
                {new Date(url?.created_at).toLocaleString()}
              </span>
            </CardContent>
          </div>

          <CardFooter className="flex items-start justify-start gap-2 p-0 sm:justify-end">
            <Button
              variant="ghost"
              size="icon"
              onClick={() =>
                navigator.clipboard.writeText(`
            ${config.FRONTEND_URL}/${url.custom_url ? url.custom_url : url.short_url}
          `)
              }
            >
              <Copy />
            </Button>
            <Button
              onClick={handleDeleteUrl}
              variant="ghost"
              size="icon"
              disabled={deleteLoading}
            >
              <Trash />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};
