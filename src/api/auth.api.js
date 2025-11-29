import supabase from "@/lib/supabase"
import config from "@/lib/config";

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

const signupUser = async ({ name, email, password, file }) => {
  await uploadProfilePicture({ filePath: file.filePath, file: file.file })

  const { data: user, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        profilePicture: `${config.SUPABASE_URL}/storage/v1/object/public/profile_picture/${file.filePath}`
      }
    }
  })

  if (error) {
    throw new Error(error.message)
  }

  console.log(user);

  return user
}

const uploadProfilePicture = async ({ filePath, file }) => {
  const { data, error } = await supabase.storage.from("profile_picture").upload(filePath, file)

  if (error) {
    throw new Error(error.message)
  }

  return data
}

const logoutUser = async () => {
  const { error } = await supabase.auth.signOut({
    scope: 'local'
  })

  if (error) {
    throw new Error(error.message)
  }
  return true
}

export {
  loginUser,
  signupUser,
  logoutUser
}
