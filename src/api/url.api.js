import supabase from "@/lib/supabase";

const getUrlsByUserId = async ({ user_id }) => {
  const { data, error } = await supabase
    .from("urls")
    .select("*")
    .eq("user_id", user_id);

  if (error) throw new Error(error.message);

  return data;
};

const deleteUrl = async ({ url_id }) => {
  const { data, error } = await supabase.from("urls").delete().eq("id", url_id);

  if (error) throw new Error(error.message);

  return data;
};

async function createUrl({ title, longUrl, customUrl, user_id }) {
  const short_url = Math.random().toString(36).substring(2, 8);

  const { data, error } = await supabase
    .from("urls")
    .insert([
      {
        title,
        user_id,
        original_url: longUrl,
        custom_url: customUrl || null,
        short_url,
      },
    ])
    .select("*");

  if (error) {
    console.error(error);
    throw new Error("Error creating short URL");
  }

  return data;
}

export { getUrlsByUserId, deleteUrl, createUrl };
