import supabase from "@/lib/supabase"

const loginUser = async ({ email, password }) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    console.log("Supabase Error :: While login user :: Error", error);
    throw new Error(error.message)
  }

  return data
}

export {
  loginUser
}
