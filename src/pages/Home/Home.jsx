import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router";

export const Home = () => {
  const [url, setUrl] = useState('')

  const navigate = useNavigate()

  const handleShortenerUrl = (e) => {
    e.preventDefault()

    if (!url) return
    navigate(`/auth?createNew=${url}`)
  }

  const handleUrlChange = e => setUrl(e.target.value)

  return (
    <div>
      <section>
        <h2 className="font-lato text-center text-3xl font-extrabold sm:text-6xl sm:leading-20 lg:text-7xl">
          The only URL Shortener <br /> you&rsquo;ll ever need!!
        </h2>
      </section>
      <form onSubmit={handleShortenerUrl} className="md:w-2/4 w-4/5 mx-auto flex gap-2 my-8">
        <Input
          value={url}
          onChange={handleUrlChange}
          type="url"
          placeholder="Enter your loooong URL"
        />
        <Button type="submit" className="" variant="destructive">
          Shorten!
        </Button>
      </form>
    </div>
  );
};
