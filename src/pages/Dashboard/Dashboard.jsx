import { getClicksForUrls } from "@/api/click.api";
import { getUrlsByUserId } from "@/api/url.api"
import { useUser } from "@/app/providers/user-provider";
import { Error, Loader } from "@/components/common";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useFetch } from "@/hooks/use-fetch"
import { Filter } from "lucide-react";
import { useEffect } from "react";
import { LinkCard } from "./_components/LinkCard";

export const Dashboard = () => {
  const { fn: fnGetUrls, data: urls, loading: urlLoading, error: urlsError } = useFetch(getUrlsByUserId)
  const { fn: fnGetClicks, data: clicks, loading: urlClicksLoading } = useFetch(getClicksForUrls)

  const { user } = useUser()

  useEffect(() => {
    if (!user) return
    fnGetUrls({ user_id: user?.id })
  }, [])

  const urlIds = urls?.map(url => url.id)

  useEffect(() => {
    if (urlIds?.length) {
      fnGetClicks(urlIds)
    }
  }, [urlIds?.length])

  if (urlClicksLoading || urlLoading) {
    return <Loader />
  }

  return (
    <div>
      <div className="sm:space-y-10 space-y-6">
        <div className="grid gap-2 grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Total Links</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-bold text-2xl">{urls?.length || 0}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Total Clicks</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-bold text-2xl">{clicks?.length || 0}</p>
            </CardContent>
          </Card>
        </div>

        <div className="flex items-center justify-between">
          <h1 className="font-semibold sm:text-3xl text-xl font-lato">My Links</h1>
          <Button size={'sm'}>Create Link</Button>
        </div>

        <div>
          <div className="relative">
            <Input type={'text'} placeholder={'Filter Links...'} />
            <Filter className="absolute right-3 top-2" size={20} />
          </div>
        </div>
        {urlsError && <Error message={urlsError.message} />}

        <div className="space-y-2">
          {
            (urls || [])?.map(url => (
              <LinkCard key={url.id} fetchUrls={fnGetUrls} url={url} />
            ))
          }
        </div>
      </div>
    </div>
  )
}
