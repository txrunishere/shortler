import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useNavigate, useSearchParams } from "react-router"
import { LoginForm, SignUpForm } from "./_components"
import { useUser } from "@/app/providers/user-provider"
import { useEffect } from "react"

export const Auth = () => {
  const [search] = useSearchParams()
  const url = search?.get('createNew')
  const { isAuthenticated, userLoading } = useUser()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated && !userLoading) {
      navigate(`/dashboard${url ? `?createNew=${url}` : ''}`)
    }
  }, [isAuthenticated, userLoading])

  return <div className="flex flex-col items-center justify-center gap-6 md:gap-10">
    <section>
      <h2 className="font-lato text-center text-2xl font-extrabold sm:text-4xl sm:leading-20 lg:text-5xl">
        {
          url ? "Hold up! Let's login first..." : "Login / Signup"
        }
      </h2>
    </section>
    <div className="">
      <Tabs defaultValue="login" className="w-[300px] sm:w-[400px]">
        <TabsList className={'grid grid-cols-2 w-full'}>
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">SignUp</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <LoginForm />
        </TabsContent>
        <TabsContent value="signup">
          <SignUpForm />
        </TabsContent>
      </Tabs>
    </div>
  </div>
}
