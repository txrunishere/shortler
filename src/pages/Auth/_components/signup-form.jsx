import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export const SignUpForm = () => {
  return <Card className="w-full">
    <CardHeader>
      <CardTitle>Create a new account</CardTitle>
      <CardDescription>
        Enter your credentials below to create a account
      </CardDescription>
    </CardHeader>
    <CardContent>
      <form>
        <div className="flex flex-col gap-6">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
            </div>
            <Input id="password" type="password" required />
          </div>
        </div>
      </form>
    </CardContent>
    <CardFooter className="flex-col gap-2">
      <Button type="submit" className="w-full">
        Login
      </Button>
    </CardFooter>
  </Card>
}