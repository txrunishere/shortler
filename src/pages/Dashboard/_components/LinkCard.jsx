import { deleteUrl } from "@/api/url.api"
import { useUser } from "@/app/providers/user-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { useFetch } from "@/hooks/use-fetch"
import config from "@/lib/config"
import { Copy, Link, Trash } from "lucide-react"
import QRCode from "react-qrcode-logo"
import { BarLoader, BeatLoader } from "react-spinners"

export const LinkCard = ({ url, fetchUrls }) => {
  const { user } = useUser()

  const { fn: fnDeleteUrl, loading: deleteLoading } = useFetch(deleteUrl)

  const handleDeleteUrl = async () => {
    await fnDeleteUrl({ url_id: url.id })
    await fetchUrls({ user_id: user?.id })
  }

  return (
    <>
      <div>
        {deleteLoading && <BarLoader color="white" width={'98%'} className="mx-auto rounded-full" />}
        <Card className="flex flex-col sm:flex-row justify-between gap-4 p-4">
          <div className="flex flex-col sm:flex-row gap-4 w-full">

            <div className="shrink-0">
              <QRCode value={url.original_url} />
            </div>

            <CardContent className="p-0 flex flex-col gap-2 w-full">
              <span className="font-bold text-2xl sm:text-3xl leading-snug">
                {url.title}
              </span>
              <span className="font-semibold text-xl sm:text-2xl text-blue-500 break-all">
                {config.FRONTEND_URL}/{url.short_url ? url.short_url : url.custom_url}
              </span>
              <span className="flex gap-2 items-center text-sm sm:text-lg break-all text-muted-foreground">
                <Link size={18} />
                {url.original_url}
              </span>

              <span className="text-xs sm:text-sm text-muted-foreground">
                {new Date(url?.created_at).toLocaleString()}
              </span>
            </CardContent>
          </div>

          <CardFooter className="flex gap-2 items-start justify-start sm:justify-end p-0">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigator.clipboard.writeText(`
            ${config.FRONTEND_URL}/${url.short_url ? url.short_url : url.custom_url}
          `)}
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
  )
}