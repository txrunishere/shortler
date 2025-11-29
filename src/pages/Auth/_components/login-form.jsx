import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { loginSchema } from "../_schemas"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { BeatLoader } from "react-spinners"
import { Error } from "@/components/common"
import { useFetch } from "@/hooks/use-fetch"
import { loginUser } from "@/api/auth.api"
import { useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router"
import { toast } from "sonner"

export const LoginForm = () => {
  const {
    register, formState: { isSubmitting, errors }, handleSubmit
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      email: "", password: ""
    },
    reValidateMode: "onChange",
  })

  const [search] = useSearchParams()
  const searchUrl = search.get("createNew")

  const navigate = useNavigate()

  const { fn: fnLoginUser, error, data } = useFetch(loginUser)

  useEffect(() => {
    if (error !== null) {
      toast.error(error.message)
    }

    if (error === null && data) {
      navigate(`/dashboard${searchUrl ? `?${searchUrl}` : ''}`)
    }
  }, [error, data])

  const handleUserLogin = async (data) => {
    await fnLoginUser(data)
  }

  return <Card className="w-full">
    <CardHeader>
      <CardTitle>Login to your account</CardTitle>
      <CardDescription>
        Enter your email below to login to your account
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div className="flex flex-col gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            {...register("email")}
            id="email"
            type="email"
            placeholder="m@example.com"
            required
          />
          {errors.email && <Error message={errors.email.message} />}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input {...register('password')} id="password" type="password" required />
          {errors.password && <Error message={errors.password.message} />}
        </div>
      </div>
    </CardContent>
    <CardFooter className="flex-col gap-2">
      <Button onClick={handleSubmit(handleUserLogin)} type="submit" className="w-full" disabled={isSubmitting}>
        {
          isSubmitting ? (<BeatLoader />) : "Login"
        }
      </Button>
    </CardFooter>
  </Card>
}
