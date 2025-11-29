import config from "@/lib/config"
import supabase from "@/lib/supabase"

const getUrlsByUserId = async ({ user_id }) => {
  const { data, error } = await supabase.from('urls').select("*").eq("user_id", user_id)

  if (error) throw new Error(error.message)

  return data
}

const deleteUrl = async ({ url_id }) => {
  const { data, error } = await supabase.from("urls").delete().eq("id", url_id)

  if (error) throw new Error(error.message)

  return data
}

async function createUrl({title, longUrl, customUrl, user_id}, qrcode) {
  const short_url = Math.random().toString(36).substring(2, 8);
  const fileName = `qr-${short_url}`;

  const {error: storageError} = await supabase.storage
    .from("qrs")
    .upload(fileName, qrcode);

  if (storageError) throw new Error(storageError.message);

  const qr = `${config.SUPABASE_URL}/storage/v1/object/public/qrs/${fileName}`;

  const {data, error} = await supabase
    .from("urls")
    .insert([
      {
        title,
        user_id,
        original_url: longUrl,
        custom_url: customUrl || null,
        short_url,
        qr,
      },
    ])
    .select('*');

  if (error) {
    console.error(error);
    throw new Error("Error creating short URL");
  }

  return data;
}

export {
  getUrlsByUserId, deleteUrl, createUrl
}
