import supabase from "@/lib/supabase";

const getCurrentUser = async () => {
  const { data: session, error } = await supabase.auth.getSession()
  if (!session.session) return null
  
  if (error) throw new Error(error.message)

  return session.session?.user
}

export {
  getCurrentUser
}
