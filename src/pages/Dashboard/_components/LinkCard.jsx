import { deleteUrl } from "@/api/url.api"
import { useUser } from "@/app/providers/user-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { useFetch } from "@/hooks/use-fetch"
import config from "@/lib/config"
import { Copy, Download, Link, Trash } from "lucide-react"
import { BeatLoader } from "react-spinners"

export const LinkCard = ({ url, fetchUrls }) => {
  const {user} = useUser()

  const handleDownload = () => {
    const link = document.createElement('a');
    link.setAttribute('href', url?.qr)
    link.setAttribute('download', url?.title)

    link.click()
  }

  const { fn: fnDeleteUrl, loading: deleteLoading } = useFetch(deleteUrl)

  const handleDeleteUrl = async () => {
    await fnDeleteUrl({url_id: url.id})
    await fetchUrls({ user_id: user?.id })
  }

  return (
    <Card className="flex flex-col sm:flex-row justify-between gap-4 p-4">
      <div className="flex flex-col sm:flex-row gap-4 w-full">

        <div className="shrink-0">
          <img
            src={url.qr}
            alt="qr-code"
            className="h-28 w-28 sm:h-40 sm:w-40 rounded-md object-contain"
          />
        </div>

        <CardContent className="p-0 flex flex-col justify-between w-full">
          <div className="flex flex-col gap-1">
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
          </div>

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
        <Button onClick={handleDownload} variant="ghost" size="icon">
          <Download />
        </Button>
        <Button
          onClick={handleDeleteUrl}
          variant="ghost"
          size="icon"
          disabled={deleteLoading}
        >
          {
            deleteLoading ? (<BeatLoader />) : (<Trash />)
          }
        </Button>
      </CardFooter>
    </Card>
  )
}