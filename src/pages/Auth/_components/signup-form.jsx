import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'
import { signupSchema } from "../_schemas"
import { Error } from "@/components/common"
import { BeatLoader } from "react-spinners"
import { useFetch } from "@/hooks/use-fetch"
import { signupUser } from "@/api/auth.api"
import { useEffect } from "react"
import { toast } from "sonner"

export const SignUpForm = () => {
  const { register, formState: { errors, isSubmitting }, handleSubmit, setValue } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      profilePicture: null
    },
    mode: 'onChange',
    reValidateMode: "onChange",
  })

  const { fn: fnSignupUser, error } = useFetch(signupUser)

  useEffect(() => {
    if (error) {
      toast.error(error.message)
    }
  }, [error])

  const handleProfilePictureChange = (e) => {
    if (!e.target.files[0]) return
    setValue(
      'profilePicture',
      e.target.files[0],
      { shouldValidate: true }
    )
  }

  const handleSignupUser = async (data) => {
    const filePath = `pp-${data.name.split(" ").join('-')}-${Date.now()}-${data.profilePicture.name}`

    await fnSignupUser({
      name: data.name,
      email: data.email,
      password: data.password,
      file: {
        file: data.profilePicture,
        filePath
      }
    })
  }

  return <Card className="w-full">
    <CardHeader>
      <CardTitle>Create a new account</CardTitle>
      <CardDescription>
        Enter your credentials below to create a account
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div className="flex flex-col gap-6">
        <div className="grid gap-2">
          <Label htmlFor="name">Username</Label>
          <Input
            {...register('name')}
            id="name"
            type="text"
            placeholder="alex.here"
            required
          />
          {errors.name && <Error message={errors.name.message} />}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            {...register('email')}
            id="email"
            type="email"
            placeholder="m@example.com"
            required
          />
          {errors.email && <Error message={errors.email.message} />}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input {...register("password")} id="password" type="password" required />
          {errors.password && <Error message={errors.password.message} />}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="profile_picture">Upload your Profile Picture</Label>
          <Input
            onChange={handleProfilePictureChange}
            id="profile_picture"
            accept={'image/*'}
            type="file"
            required
          />
          {errors.profilePicture && <Error message={errors.profilePicture.message} />}
        </div>
      </div>
    </CardContent>
    <CardFooter className="flex-col gap-2">
      <Button
        onClick={handleSubmit(handleSignupUser)}
        disabled={isSubmitting}
        type="submit"
        className="w-full"
      >
        {isSubmitting ? (<BeatLoader />) : "Register"}
      </Button>
    </CardFooter>
  </Card>
}
